import style from './Header.module.css'

export const Header = () => {
    return (
        <header className={style.header}>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
    )
}