import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Edit, Trash2, Clock } from 'lucide-react';
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
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'done':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
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
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-grab transition-all duration-200 hover:shadow-md ${
            snapshot.isDragging ? 'rotate-2 shadow-lg opacity-90' : ''
          }`}
          style={{
            ...provided.draggableProps.style,
            cursor: snapshot.isDragging ? 'grabbing' : 'grab'
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-semibold text-gray-900 flex-1 mr-2">
              {task.title}
            </h4>
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>

            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};