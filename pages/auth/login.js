import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import { Formulario, Campo, InputSubmit, Error } from '../../components/ui/Formulario';
import firebase from '../../firebase'

// validaciones
import useValidacion from '../../hooks/useValidacion';
import validarIniciarSesion from '../../validacion/validarIniciarSesion';

const initialState = {
    email: '',
    password: ''
}

const Login = () => {
    const [error, guardarError] = useState(false);
    const { valores, errores, handleChange, handleBlur, handleSubmit } = useValidacion(initialState, validarIniciarSesion, iniciarSesion);
    const { email, password } = valores;

    async function iniciarSesion() {
        try {
            await firebase.login(email, password);
            Router.push('/producto/nuevo-producto')

        } catch (error) {
            console.error('Hubo un error al iniciar sesión ', error.message);
            guardarError(error.message)
        }
    }

    return (
        <div>
            <h1 css={css`text-align: center; margin-top: 5rem; `}>Iniciar Sesión</h1>
            <Formulario onSubmit={handleSubmit} noValidate>
                <Campo>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.email && <Error>{errores.email}</Error>}

                <Campo>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Tu Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Campo>
                {errores.password && <Error>{errores.password}</Error>}

                {error && <Error>{error} </Error>}
                <InputSubmit type="submit" value="Iniciar Sesión" />

            </Formulario>
        </div>
    )
}

export default Login