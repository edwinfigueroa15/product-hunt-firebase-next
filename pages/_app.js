import App from 'next/app'
import firebase, { FirebaseContext } from '../firebase'
import '../styles/globals.css'
import Layout from '../components/layouts/Layout'
import useAutenticacion from '../hooks/useAutenticacion'

function MyApp({ Component, pageProps }) {
    const usuario = useAutenticacion()

    return (
        <FirebaseContext.Provider value={{ firebase, usuario }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </FirebaseContext.Provider>
    )
}

export default MyApp
