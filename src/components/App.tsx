import styles from './app.module.css'
import Header from './header/Header'

import { Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Register from 'components/register/Register'
import Login from 'components/login/Login'
import Privacy from 'components/privacy/Privacy'

const App = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<p>page not found</p>} />
            </Routes>
        </div>
    )
}
export default App
