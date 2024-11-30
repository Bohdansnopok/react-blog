import style from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom';

export const LoginPage = (props) => {
    console.log(props)
    const navigate = useNavigate();

    const handleLogIn = (e) => {
        e.preventDefault();
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
                    required/>
            </div>
            <div>
                <input
                    className={style.loginFormInput}
                    type="password"
                    placeholder="Пароль"
                    required/>
            </div>
            <div>
                <button className="blackBtn" type="submit">
                    войти
                </button>
            </div>
        </form>
    )
}