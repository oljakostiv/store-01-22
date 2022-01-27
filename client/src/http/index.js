import axios from "axios";

const $host = axios.create({
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: 'http://localhost:5000'
});

const $authHost = axios.create({
    baseURL: 'http://localhost:5000'
});

const authInterceptor = confirm => {
    confirm.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return confirm;
};

$authHost.interceptors.request.use(authInterceptor);

export {$host, $authHost}
