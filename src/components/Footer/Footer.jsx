import style from './Footer.module.css'

export const Footer = (props) => {
    return (
        <footer>
            <span>© React Blog - {props.year}</span>
        </footer>
    )
}