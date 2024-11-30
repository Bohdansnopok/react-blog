import style from './Header.module.css'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <header className={style.header}>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
        </header>
    )
}