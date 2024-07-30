import React, { useState } from 'react'
import { users } from '../../data/usersData'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const initialState = { username: '', password: '' }
    const initialStateErrors = {
        username: [],
        password: [],
        global: [],
    }
    const [loginForm, setLoginForm] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const handleChangeValue = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const validateUsernameLength = (value) => {
        return value > 3
    }

    const ERRORS = {
        USERNAME_LENGTH: {
            text: 'tu nombre de usuario debe tener mas de 3 caracteres',
            id: 1,
            validate: validateUsernameLength
        },
        USER_NOT_FOUND: {
            text: 'Credenciales invalidas',
            id: 2,
        }
    }

    const findError = (from, id_error) => {
        return errors[from].find(error => error.id == id_error)
    }

    const validateError = (from, errorToValidate) => {
        /* Si ya existe en el estado de errores */
        if (findError(from, errorToValidate.id)) {
            /* Si se dejo de cumplir el error */
            if (errorToValidate.validate(loginForm[from])) {
                /* Elimino el error porque se dejo de cumplir */
                const newUsernameErrors = errors[from].filter(error => error.id != errorToValidate.id)
                setErrors({ ...errors, [from]: newUsernameErrors })
            }
        }
        /* Si no existe en el estado de errores */
        else {
            /* Verifico que no se cumpla la validacion */
            if (!errorToValidate.validate(loginForm[from])) {
                setErrors({ ...errors, [from]: [...errors[from], errorToValidate] })
            }
        }
    }

    const handleBlurInput = () => {
        validateError('username', ERRORS.USERNAME_LENGTH)
    }

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        for (const user of users) {
            if (user.password === loginForm.password && user.username === loginForm.username) {
                localStorage.setItem('user', JSON.stringify(user))
                return navigate('/')
            }
        }
        setErrors({ ...errors, global: [ERRORS.USER_NOT_FOUND]})
    }


    return (
        <main>
            <h1>Iniciar sesion</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='username'>Nombre de usuario:</label>
                    <input
                        type="text"
                        placeholder='joedoe'
                        id='username'
                        name='username'
                        onChange={handleChangeValue}
                        value={loginForm.username}
                        onBlur={handleBlurInput}
                    />
                    {
                        errors.username.length > 0 &&
                        errors.username.map((error) => (<span key={error.id}>{error.text}</span>))
                    }
                </div>
                <div>
                    <label htmlFor='password'>Contraseña:</label>
                    <input
                        type="password"
                        placeholder='joedoe123'
                        id='password'
                        name='password'
                        onChange={handleChangeValue}
                        value={loginForm.password}
                    />
                </div>
                {
                    errors.global.map((error) => (<span key={error.id}>{error.text}</span>))
                }
                <button type='submit'>Enviar</button>
            </form>
        </main>
    )
}

export default Login
