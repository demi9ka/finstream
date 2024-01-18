import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext, IUserDataContext } from 'provider/UserProvider'
import HeaderProfile from './header-profile/HeaderProfile'
const Header = () => {
    const { user_data } = useContext(UserDataContext) as IUserDataContext
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Link className={styles.poster} to={'/'}>
                        <img className={styles.logo} src="/logo.svg" alt="" />
                        <h2>Finstream</h2>
                    </Link>
                    <div>
                        {user_data === null && (
                            <>
                                <Link className={`${styles.auth} ${styles.register}`} to={'/register'}>
                                    Регистрация
                                </Link>
                                <Link className={`${styles.auth} ${styles.login}`} to={'/login'}>
                                    Войти
                                </Link>
                            </>
                        )}
                        {user_data && <HeaderProfile data={user_data} />}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header
