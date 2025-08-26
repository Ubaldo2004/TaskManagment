import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
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
        return '#f97316';
      case 'in-progress':
        return '#3b82f6';
      case 'done':
        return '#10b981';
      default:
        return '#6b7280';
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
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="calendar-container">
          <style jsx global>{`
            .fc {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            }
            .fc-toolbar {
              margin-bottom: 1.5rem;
            }
            .fc-toolbar-title {
              font-size: 1.5rem;
              font-weight: 600;
              color: #1f2937;
            }
            .fc-button {
              background-color: #3b82f6;
              border-color: #3b82f6;
              font-weight: 500;
              border-radius: 0.375rem;
              padding: 0.5rem 1rem;
            }
            .fc-button:hover {
              background-color: #2563eb;
              border-color: #2563eb;
            }
            .fc-button:focus {
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            .fc-day-today {
              background-color: rgba(59, 130, 246, 0.1) !important;
            }
            .fc-event {
              cursor: pointer;
              border-radius: 0.25rem;
              font-size: 0.875rem;
              font-weight: 500;
              padding: 0.125rem 0.25rem;
            }
            .fc-event:hover {
              filter: brightness(1.1);
            }
            .fc-daygrid-day {
              cursor: pointer;
            }
            .fc-daygrid-day:hover {
              background-color: rgba(59, 130, 246, 0.05);
            }
            .fc-daygrid-day-number {
              color: #374151;
              font-weight: 500;
            }
            .fc-col-header-cell {
              background-color: #f9fafb;
              font-weight: 600;
              color: #374151;
            }
          `}</style>
          
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
            dayMaxEvents={3}
            moreLinkText="más"
          />
        </div>
      </div>
    </div>
  );
};