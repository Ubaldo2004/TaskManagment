import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Task } from '../types/Task';

interface TaskModalProps {
  open: boolean;
  task?: Task;
  selectedDate?: Date;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  task,
  selectedDate,
  onClose,
  onSave
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    dueDate: null as Date | null
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate || null
      });
    } else if (selectedDate) {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        dueDate: selectedDate
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        dueDate: null
      });
    }
  }, [task, selectedDate, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const now = new Date();
    const taskData: Omit<Task, 'id'> = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      dueDate: formData.dueDate,
      createdAt: task ? task.createdAt : now,
      updatedAt: now
    };

    onSave(taskData);
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {task ? 'Editar Tarea' : 'Nueva Tarea'}
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Título"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              fullWidth
              required
              variant="outlined"
            />

            <TextField
              label="Descripción"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                label="Estado"
              >
                <MenuItem value="todo">Pendiente</MenuItem>
                <MenuItem value="in-progress">En Progreso</MenuItem>
                <MenuItem value="done">Completado</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Fecha de vencimiento"
                value={formData.dueDate}
                onChange={(date) => handleChange('dueDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!formData.title.trim()}
          >
            {task ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};