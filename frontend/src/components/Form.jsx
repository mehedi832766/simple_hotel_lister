import React from 'react';
import { useState } from 'react';
import list from '../list';
import { useNavigate, Navigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const name = method === "login" ? "login" : "register";
    const forLin = method === "login" ? "register" : "login";


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await list.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                // console.log("enter");

                navigate('/login');
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return <form onSubmit={handleSubmit} className='bg-yellow-200 flex flex-col shadow-xl space-y-2 items-center justify-center border-amber-500 rounded-xl  w-72 h-72'>

        <h1 className='font-bold'>{name}</h1> <div >not an user yet? <span className='font-bold' onClick={() => name === 'login' ? navigate('/register/') : navigate('/login/')}> {forLin} </span></div>
        <input type=
            "text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
            className='border-2 p-0.5 bg-white'
        />
        <input type=
            "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            className='border-2 p-0.5 bg-white'
        />
        <button type='submit' className='border-2 border-gray-300 p-1 text-yellow-200 bg-gray-800 rounded-xl'> {name} </button>
    </form>;
}

export default Form;