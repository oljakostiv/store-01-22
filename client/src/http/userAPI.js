import jwtDecode from "jwt-decode"; //щоб розпарсити токен(вивести інфу про користувача);
import {$host, $authHost} from './index';

export const register = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);  //1-умова, 2-що використовуєм
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const {data} = await $authHost.post('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};
