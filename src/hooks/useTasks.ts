import { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { taskService } from '../services/firebase';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = taskService.subscribeToTasks((newTasks) => {
      setTasks(newTasks);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      await taskService.addTask(task);
    } catch (err) {
      setError('Error adding task');
      console.error(err);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await taskService.updateTask(taskId, updates);
    } catch (err) {
      setError('Error updating task');
      console.error(err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
    } catch (err) {
      setError('Error deleting task');
      console.error(err);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask
  };
};