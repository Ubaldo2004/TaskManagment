import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';
import { Task } from '../types/Task';

interface TaskBoardProps {
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

interface Column {
  id: string;
  title: string;
  status: Task['status'];
}

const columns: Column[] = [
  { id: 'todo', title: 'Pendientes', status: 'todo' },
  { id: 'in-progress', title: 'En Progreso', status: 'in-progress' },
  { id: 'done', title: 'Completadas', status: 'done' }
];

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onTaskEdit,
  onTaskDelete,
  onTaskUpdate
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as Task['status'];
    onTaskUpdate(draggableId, { status: newStatus });
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case 'todo':
        return '#fff3e0';
      case 'in-progress':
        return '#e3f2fd';
      case 'done':
        return '#e8f5e8';
      default:
        return '#f5f5f5';
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            
            return (
              <Grid item xs={12} md={4} key={column.id}>
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: getColumnColor(column.id),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    p: 2,
                    minHeight: '70vh'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      textAlign: 'center'
                    }}
                  >
                    {column.title}
                    <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                      ({columnTasks.length})
                    </Typography>
                  </Typography>

                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          minHeight: 200,
                          backgroundColor: snapshot.isDraggingOver 
                            ? 'rgba(25, 118, 210, 0.1)' 
                            : 'transparent',
                          borderRadius: 1,
                          transition: 'background-color 0.2s ease',
                          p: 1
                        }}
                      >
                        {columnTasks.map((task, index) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            index={index}
                            onEdit={onTaskEdit}
                            onDelete={onTaskDelete}
                          />
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </DragDropContext>
  );
};