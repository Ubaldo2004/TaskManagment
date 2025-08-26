import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'todo':
      return { color: '#ed6c02', backgroundColor: '#fff3e0' };
    case 'in-progress':
      return { color: '#0288d1', backgroundColor: '#e3f2fd' };
    case 'done':
      return { color: '#2e7d32', backgroundColor: '#e8f5e8' };
    default:
      return { color: '#666', backgroundColor: '#f5f5f5' };
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'todo':
      return 'Pendiente';
    case 'in-progress':
      return 'En Progreso';
    case 'done':
      return 'Completado';
    default:
      return status;
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  onEdit,
  onDelete
}) => {
  const theme = useTheme();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            cursor: 'grab',
            transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
            opacity: snapshot.isDragging ? 0.9 : 1,
            '&:active': {
              cursor: 'grabbing'
            }
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 500, flexGrow: 1, mr: 1 }}>
                {task.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                  sx={{ color: theme.palette.error.main }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {task.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.4 }}
              >
                {task.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip
                label={getStatusLabel(task.status)}
                size="small"
                sx={{
                  ...getStatusColor(task.status),
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />

              {task.dueDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TimeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(task.dueDate)}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};