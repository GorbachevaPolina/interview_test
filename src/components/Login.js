import React, {useState} from "react";
import {Link} from 'react-router-dom'
import './css/auth.css'



const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState(
        {
            username: '',
            password: ''
        }
    )
    const [isLoged, setLoged] = useState('')

    const {username, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://79.143.31.216/login`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: `username=${username}&password=${password}`
                }
            )
            const parseResponse = await response.json();

            if (parseResponse.access_token) {
                setAuth(true);
                document.cookie = `token=${parseResponse.access_token}`
            } else {
                setAuth(false);
                setLoged('fail');
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
                <div className='container'>
                <h1>Вход</h1>
                <form onSubmit={onSubmitForm}>
                    <input 
                        type='text' 
                        maxLength='50'
                        name='username' 
                        placeholder='name' 
                        value={username}
                        onChange={e => onChange(e)}
                    />
                    <br />
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='password' 
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    <br />
                    <button className='log-btn'>Войти</button>
                </form>
                <span>Нет аккаунта? </span><Link to='/register' className='text-muted w-100'>Зарегистрироваться</Link>
                {
                    isLoged === 'fail' ? 
                    <div className="log-fail">Такого аккаунта не существует</div> :
                    null
                }
                </div>
    )
}

export default Login;