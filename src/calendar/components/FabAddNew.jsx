import { useCalendarStore, useUiStore } from '../../hooks/';
export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent, hasEventSelected } = useCalendarStore()

    const handleClick = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: new Date(),
            color: '#fafafa',
            user: {
                _id: '123',
                name: 'John Doe'
            }
        });
        openDateModal();
    }
    return (
        <button className="btn btn-primary fab" onClick={handleClick} style={{ display: hasEventSelected ? 'none' : '' }}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
