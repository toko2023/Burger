import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-e2364-default-rtdb.firebaseio.com/',
});

export default instance;