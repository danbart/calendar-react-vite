
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { getMessagesEs, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    const [view, setView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClickEvent = () => {
        openDateModal();
    }
    const onSelectEvent = (event) => {
        setActiveEvent(event);
    }
    const onEventChange = (event) => {
        localStorage.setItem('lastView', event);
    }
    const eventPropGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
        };
        return {
            style
        };
    };
    return (
        <>
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                defaultView={view}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                culture='es'
                messages={getMessagesEs()}
                eventPropGetter={eventPropGetter}
                components={{
                    event: CalendarEventBox,
                }}
                onDoubleClickEvent={onDoubleClickEvent}
                onSelectEvent={onSelectEvent}
                onView={onEventChange}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
