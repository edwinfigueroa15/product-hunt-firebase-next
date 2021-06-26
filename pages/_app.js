import App from 'next/app'
import firebase, { FirebaseContext } from '../firebase'
import '../styles/globals.css'
import Layout from '../components/layouts/Layout'

function MyApp({ Component, pageProps }) {
    return (
        <FirebaseContext.Provider value={{ firebase }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </FirebaseContext.Provider>
    )
}

export default MyApp
