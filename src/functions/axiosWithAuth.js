import axios from 'axios';

export default function axiosWithAuth(){
    const token = localStorage.getItem('token')
    return axios.create({
        baseURL: 'https://social-1.herokuapp.com/api',
        headers: {
            token: token,
        }
    });
};