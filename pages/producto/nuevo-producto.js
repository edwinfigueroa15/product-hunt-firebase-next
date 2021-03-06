import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { Formulario, Campo, InputSubmit, Error } from '../../components/ui/Formulario';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layouts/404';

// validaciones
import useValidacion from '../../hooks/useValidacion';
import validarCrearProducto from '../../validacion/validarCrearProducto';

const initialState = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    // state de las imagenes
    // const [nombreimagen, guardarNombre] = useState('');
    // const [subiendo, guardarSubiendo] = useState(false);
    // const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlImagen] = useState('');
    const [error, guardarError] = useState(false);

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(initialState, validarCrearProducto, crearProducto);
    const { nombre, empresa, imagen, url, descripcion } = valores;

    const router = useRouter();
    const { usuario, firebase } = useContext(FirebaseContext);

    async function crearProducto() {
        // si el usuario no esta autenticado llevar al login
        if (!usuario) { return router.push('/login') }

        // crear el objeto de nuevo producto 
        const producto = {
            nombre,
            empresa,
            url,
            urlimagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            haVotado: []
        }

        // insertarlo en la base de datos
        firebase.db.collection('productos').add(producto);
        return router.push('/');
    }


    // const handleUploadStart = () => {
    //     guardarProgreso(0);
    //     guardarSubiendo(true);
    // }

    // const handleProgress = progreso => guardarProgreso({ progreso });

    // const handleUploadError = error => {
    //     guardarSubiendo(error);
    //     console.error(error);
    // };

    // const handleUploadSuccess = nombre => {
    //     guardarProgreso(100);
    //     guardarSubiendo(false);
    //     guardarNombre(nombre)
    //     firebase
    //         .storage
    //         .ref("productos")
    //         .child(nombre)
    //         .getDownloadURL()
    //         .then(url => {
    //             console.log(url);
    //             guardarUrlImagen(url);
    //         });
    // };

    return (
        <div>
            {!usuario ? <Error404 /> : (
                <>
                    <h1 css={css`text-align: center; margin-top: 5rem;`}>Nuevo Producto</h1>
                    <Formulario onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <legend>Informaci??n General </legend>

                            <Campo>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    placeholder="Nombre del Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.nombre && <Error>{errores.nombre}</Error>}

                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input
                                    type="text"
                                    id="empresa"
                                    placeholder="Nombre Empresa o Compa??ia"
                                    name="empresa"
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.empresa && <Error>{errores.empresa}</Error>}

                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <FileUploader
                                    accept="image/*"
                                    id="imagen"
                                    name="imagen"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </Campo>
                            <Campo>
                                <label htmlFor="url">URL</label>
                                <input
                                    type="url"
                                    id="url"
                                    name="url"
                                    placeholder="URL de tu producto"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.url && <Error>{errores.url}</Error>}
                        </fieldset>

                        <fieldset>
                            <legend>Sobre tu Producto</legend>
                            <Campo>
                                <label htmlFor="descripcion">Descripcion</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.descripcion && <Error>{errores.descripcion}</Error>}
                        </fieldset>

                        {error && <Error>{error} </Error>}

                        <InputSubmit
                            type="submit"
                            value="Crear Producto"
                        />
                    </Formulario>
                </>
            )}
        </div>
    )
}

export default NuevoProducto