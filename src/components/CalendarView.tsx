import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, useTheme } from '@mui/material';
import { Task } from '../types/Task';

interface CalendarViewProps {
  tasks: Task[];
  onDateClick: (date: Date) => void;
  onTaskClick: (task: Task) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  onDateClick,
  onTaskClick
}) => {
  const theme = useTheme();

  const calendarEvents = tasks
    .filter(task => task.dueDate)
    .map(task => ({
      id: task.id,
      title: task.title,
      date: task.dueDate!.toISOString().split('T')[0],
      backgroundColor: getEventColor(task.status),
      borderColor: getEventColor(task.status),
      extendedProps: { task }
    }));

  function getEventColor(status: Task['status']) {
    switch (status) {
      case 'todo':
        return '#ed6c02';
      case 'in-progress':
        return '#0288d1';
      case 'done':
        return '#2e7d32';
      default:
        return '#666';
    }
  }

  const handleDateClick = (info: any) => {
    onDateClick(new Date(info.date));
  };

  const handleEventClick = (info: any) => {
    const task = info.event.extendedProps.task;
    if (task) {
      onTaskClick(task);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          '& .fc': {
            fontFamily: theme.typography.fontFamily
          },
          '& .fc-toolbar': {
            marginBottom: 2
          },
          '& .fc-toolbar-title': {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: theme.palette.primary.main
          },
          '& .fc-button': {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              borderColor: theme.palette.primary.dark
            }
          },
          '& .fc-day-today': {
            backgroundColor: 'rgba(25, 118, 210, 0.1) !important'
          },
          '& .fc-event': {
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: 500,
            '&:hover': {
              filter: 'brightness(1.1)'
            }
          },
          '& .fc-daygrid-day': {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.05)'
            }
          }
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          events={calendarEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          locale="es"
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana'
          }}
          dayHeaderFormat={{ weekday: 'short' }}
          eventDisplay="block"
          displayEventTime={false}
        />
      </Box>
    </Box>
  );
};