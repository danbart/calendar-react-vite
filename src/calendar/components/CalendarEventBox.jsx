
export const CalendarEventBox = ({ event }) => {
    const { title, notes, start, end, allDay } = event;
    return (
        <>
            <strong>{title}</strong>
            <p>{notes}</p>
            <time>{start.toLocaleString()} - {end.toLocaleString()}</time>
        </>
    )
}
