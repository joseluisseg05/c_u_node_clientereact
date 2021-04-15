import axios from 'axios';

const clienteAxios = axios.create({ //para evitar poner la url en cada peticion 
    baseURL: 'http://localhost:8080'
});

export default clienteAxios;