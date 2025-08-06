import { useCalendarStore } from '../../hooks';
export const FabDelete = () => {


    const { onDeleteEvent, hasEventSelected } = useCalendarStore()

    const handleDelete = () => {
        onDeleteEvent();
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete} style={{ display: hasEventSelected ? '' : 'none' }}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
