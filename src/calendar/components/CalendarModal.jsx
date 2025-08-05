import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";

import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });


    const [formOnSubmitted, setFormOnSubmitted] = useState(false)
    const classTitle = useMemo(() => {
        if (!formOnSubmitted) return '';
        return formValues.title.trim().length < 2 ? 'is-invalid' : 'is-valid';
    }, [formOnSubmitted, formValues.title]);

    useEffect(() => {
        if (!!activeEvent) {
            setFormOnSubmitted(false);
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChange = (event, field) => {
        setFormValues({
            ...formValues,
            [field]: event
        });
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormOnSubmitted(true);
        if (formValues.title.trim().length < 2) return;

        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 0) {
            return Swal.fire({
                title: 'Error',
                text: 'La fecha de fin debe ser mayor a la fecha de inicio',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }

        console.log('Form submitted', formValues);
        onCloseModal();
    }
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <br />
                    <DatePicker
                        locale={es}
                        timeCaption='Hora'
                        className="form-control"
                        selected={formValues.start}
                        onChange={(date) => onDateChange(date, 'start')}
                        showTimeSelect
                        dateFormat="Pp" />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        locale={es}
                        timeCaption='Hora'
                        minDate={formValues.start}
                        className="form-control"
                        selected={formValues.end}
                        onChange={(date) => onDateChange(date, 'end')}
                        showTimeSelect
                        dateFormat="Pp" />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${classTitle}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                        autoFocus
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
