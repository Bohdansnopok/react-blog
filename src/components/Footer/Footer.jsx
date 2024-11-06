import './Footer.css'

export const Footer = (props) => {
    return (
        <footer>
            <span>© React Blog - {props.year}</span>
        </footer>
    )
}