import React, { useState } from 'react';
import { Calendar, KanbanSquare, Plus } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { Task } from './types/Task';
import { TaskBoard } from './components/TaskBoard';
import { CalendarView } from './components/CalendarView';
import { TaskModal } from './components/TaskModal';

function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [currentView, setCurrentView] = useState<'board' | 'calendar'>('board');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setSelectedDate(undefined);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setSelectedDate(undefined);
    setModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await deleteTask(taskId);
    }
  };

  const handleTaskSave = async (taskData: Omit<Task, 'id'>) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await addTask(taskData);
      }
      setModalOpen(false);
      setEditingTask(undefined);
      setSelectedDate(undefined);
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    await updateTask(taskId, updates);
  };

  const handleDateClick = (date: Date) => {
    setEditingTask(undefined);
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setSelectedDate(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(undefined);
    setSelectedDate(undefined);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <KanbanSquare className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('board')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'board'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <KanbanSquare className="h-4 w-4 mr-2" />
                Tablero
              </button>
              
              <button
                onClick={() => setCurrentView('calendar')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'calendar'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Calendario
              </button>
              
              <button
                onClick={handleAddTask}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {currentView === 'board' ? (
          <TaskBoard
            tasks={tasks}
            onTaskEdit={handleEditTask}
            onTaskDelete={handleDeleteTask}
            onTaskUpdate={handleTaskUpdate}
          />
        ) : (
          <CalendarView
            tasks={tasks}
            onDateClick={handleDateClick}
            onTaskClick={handleTaskClick}
          />
        )}
      </main>

      {/* Task Modal */}
      <TaskModal
        open={modalOpen}
        task={editingTask}
        selectedDate={selectedDate}
        onClose={handleCloseModal}
        onSave={handleTaskSave}
      />

      {/* Error Snackbar */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setSnackbarOpen(false)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;