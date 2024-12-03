import style from './Header.module.css'
import {NavLink} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = (props) => {

    const handleLogOut = () => {
        localStorage.setItem('isLoggedIn', false)
        props.setIsLoggedIn(false)
    }

    return (
        <header className={style.header}>
            {props.isLoggedOn ?
                <nav>
                    Добро пожаловать, &nbsp;<strong>{props.userName}</strong>
                    <NavLink onClick={handleLogOut} to="/login"><LogoutIcon/> Выход</NavLink>
                </nav> : 'Добро пожаловать незнакомец!!!'
            }
        </header>
    )
}