import React, {useState} from "react";
import {Link, Navigate} from 'react-router-dom'
import './css/auth.css'

const Register = () => {
    const [inputs, setInputs] = useState(
        {
            username: '',
            password: ''
        }
    )
    const [isRegistered, setRegistered] = useState('')

    const {username, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://79.143.31.216/register?username=${username}&password=${password}`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                }
            )
            const parseResponse = await response.json();

            if (parseResponse.username) {
                setRegistered('success')
            } else {
                setRegistered('fail')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='container'>
                <h1>Регистрация</h1>
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
                    <button className="log-btn">Зарегистрироваться</button>
                </form>
                <span>Уже есть аккаунт? </span><Link to='/login' className='text-muted w-100'>Войти</Link>
                {isRegistered === 'success' ?
                    <Navigate replace to='/login' /> :
                    isRegistered === 'fail' ?
                    <div className="log-fail">Не удалось зарегистрироваться</div> :
                    null
                }
        </div>
    )
}

export default Register;