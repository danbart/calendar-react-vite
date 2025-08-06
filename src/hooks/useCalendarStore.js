import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSaveEvent = async (calendarEvent) => {
        // TODO: Save event to backend
        if (calendarEvent._id) {
            // Update existing event
            dispatch(onUpdateEvent(calendarEvent));
        } else {
            // New event
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const onDeleteEvent = () => {
        if (activeEvent) {
            // TODO: Delete event from backend
            dispatch(onDeleteEvent(activeEvent));
        }
    }

    return {
        events,
        hasEventSelected: !!activeEvent,
        activeEvent,
        setActiveEvent,
        startSaveEvent,
        onDeleteEvent,
    };
}
