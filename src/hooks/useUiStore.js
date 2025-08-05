import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../store";

export const useUiStore = () => {
    const { isModalOpen } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const openDateModal = () => {
        dispatch(openModal());
    };

    const closeDateModal = () => {
        dispatch(closeModal());
    };

    const toggleDateModal = () => {
        (isModalOpen)
            ? closeDateModal()
            : openDateModal();
    };

    return {
        isModalOpen,
        openDateModal,
        closeDateModal,
        toggleDateModal
    };
}