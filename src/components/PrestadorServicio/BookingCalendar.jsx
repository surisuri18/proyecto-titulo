import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


export default function BookingCalendar() {
  const [events, setEvents] = useState([]);

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Título de la reserva:', 'Reserva');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      setEvents([...events, {
        id: String(events.length),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      }]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable
      editable={false}
      events={events}
      select={handleDateSelect}
    />
  );
}