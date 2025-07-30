
import { addHours } from 'date-fns';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEventBox, CalendarModal, NavBar } from "../";
import { getMessagesEs, localizer } from '../../helpers';






const myEventsList = [
    {
        title: 'Big Meeting',
        notes: 'Important meeting with the client.',
        start: new Date(),
        end: addHours(new Date(), 2),
        allDay: false,
    },
    {
        title: 'Vacation',
        notes: 'Time off for vacation.',
        start: new Date(),
        end: addHours(new Date(), 2),
        allDay: true,
    },
]

const onDoubleClickEvent = (event) => {
    console.log("🚀 ~ onDoubleClickEvent ~ event:", event)
}
const onSelectEvent = (event) => {
    console.log("🚀 ~ onSelectEvent ~ event:", event)
}
const onEventChange = (event) => {
    localStorage.setItem('lastView', event);
}
export const CalendarPage = () => {

    const [view, setView] = useState(localStorage.getItem('lastView') || 'month');

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
                events={myEventsList}
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
        </>
    )
}
