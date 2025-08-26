import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { theme } from './theme/theme';
import { Navbar } from './components/Navbar';
import { TaskBoard } from './components/TaskBoard';
import { CalendarView } from './components/CalendarView';
import { TaskModal } from './components/TaskModal';
import { useTasks } from './hooks/useTasks';
import { Task } from './types/Task';
import { v4 as uuidv4 } from 'uuid';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Cargando tareas...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Navbar
          currentView={currentView}
          onViewChange={setCurrentView}
          onAddTask={handleAddTask}
        />

        <Box sx={{ flexGrow: 1 }}>
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
        </Box>

        <TaskModal
          open={modalOpen}
          task={editingTask}
          selectedDate={selectedDate}
          onClose={handleCloseModal}
          onSave={handleTaskSave}
        />

        <Snackbar
          open={snackbarOpen && !!error}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;