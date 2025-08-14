import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api/";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            dispatch(onLogin(data.user));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 50);
        }
    };

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            dispatch(onLogin(data.user));
        } catch (error) {
            console.log("🚀 ~ startRegister ~ error:", error.response.data)
            dispatch(onLogout(error.response.data?.message || 'Error en el registro'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 50);
        }
    };

    return {
        startLogin,
        startRegister,
        errorMessage,
        status,
        user
    };
};
