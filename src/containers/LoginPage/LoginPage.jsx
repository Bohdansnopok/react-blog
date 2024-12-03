import style from './LoginPage.module.css'
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

export const LoginPage = ({setIsLoggedIn, history, setUserName}) => { // Деструктуризация пропсов
    const navigate = useNavigate();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const
        handleLogIn = (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('userName', login)
            setUserName(login)
            setIsLoggedIn(true);
            navigate('/');
        };
    return (
        <form className={style.loginForm} onSubmit={handleLogIn}>
            <h1>Авторизация</h1>
            <div>
                <input
                    className={style.loginFormInput}
                    type="text"
                    placeholder="Логин"
                    onChange={handleLoginChange}
                    required
                />
            </div>
            <div>
                <input
                    className={style.loginFormInput}
                    type="password"
                    placeholder="Пароль"
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div>
                <button className="blackBtn" type="submit">
                    войти
                </button>
            </div>
        </form>
    );
};