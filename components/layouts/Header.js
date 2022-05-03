import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Buscar from '../ui/Buscar'
import Navegacion from './Navegacion'
import Boton from '../ui/Boton';
import { FirebaseContext } from '../../firebase'
import { useRouter } from 'next/router';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    cursor: pointer;
`;

const Header = () => {
    const {firebase, usuario} = useContext(FirebaseContext)
    const router = useRouter()

    const cerrarSesion = () => {
        firebase.cerrarSesion()
        router.push("/auth/login")
    }

    return (
        <header css={css`
            border-bottom: 2px solid var(--gris3);
            padding: 1rem 0;
        `}>
            <ContenedorHeader>
                <div css={css`
                    display:flex;
                    align-items: center;
                `}>
                    <Link href="/">
                        <Logo>Logo</Logo>
                    </Link>
                    <Buscar></Buscar>
                    <Navegacion></Navegacion>
                </div>

                <div css={css`
                    display: flex;
                    align-items: center;
                `}>
                    { usuario ? (
                        <>
                            <p css={css` margin-right: 2rem;`}>Hola: {usuario.displayName}</p>
                            <Boton type="button" bgColor="true" onClick={() => cerrarSesion()}>Cerrar Sesión</Boton>
                        </>
                    ) : (
                        <>
                            <Link href={'/auth/login'}>
                                <Boton bgColor="true">Login</Boton>
                            </Link>
                            <Link href={'/auth/crear-cuenta'}>
                                <Boton>Crear Cuenta</Boton>
                            </Link>
                        </>
                    )}
                    
                </div>

            </ContenedorHeader>
        </header>
    )
}

export default Header