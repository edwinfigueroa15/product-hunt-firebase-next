import React, { useEffect, useState } from 'react'

const useValidacion = (initialState, validar, fn) => {
    const [valores, guardarValores] = useState(initialState)
    const [errores, guardarErrores] = useState({})
    const [submitform, guardarSubmitForm] = useState(false)

    useEffect( () => {
        if(submitform) {
            const noErrores = Object.keys(errores).length === 0

            if(noErrores) {
                fn() // Funcion que se ejecuta en el componente
            }

            guardarSubmitForm(false)
        }
    }, [submitform])

    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    const handleBlur = () => {
        const erroresValidacion = validar(valores)
        guardarErrores(erroresValidacion)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const erroresValidacion = validar(valores)
        guardarErrores(erroresValidacion)
        guardarSubmitForm(true)
    }

    return { valores, errores, submitform, handleChange, handleBlur, handleSubmit }
}

export default useValidacion