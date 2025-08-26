import React from 'react';
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
  color: string;
}

const columns: Column[] = [
  { id: 'todo', title: 'Pendientes', status: 'todo', color: 'bg-orange-50 border-orange-200' },
  { id: 'in-progress', title: 'En Progreso', status: 'in-progress', color: 'bg-blue-50 border-blue-200' },
  { id: 'done', title: 'Completadas', status: 'done', color: 'bg-green-50 border-green-200' }
];

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onTaskEdit,
  onTaskDelete,
  onTaskUpdate
}) => {
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            
            return (
              <div key={column.id} className={`rounded-lg border-2 ${column.color} p-4 min-h-[600px]`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {column.title}
                  </h3>
                  <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[500px] rounded-lg p-2 transition-colors ${
                        snapshot.isDraggingOver 
                          ? 'bg-blue-100 bg-opacity-50' 
                          : 'transparent'
                      }`}
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
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};