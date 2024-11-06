import './AddPostForm.css'
import CancelIcon from '@mui/icons-material/Cancel';

export const AddPostForm = (props) => {
    return (
        <>
            <form action="" className="AddPostForm">
                <button className="hideBtn" onClick={props.handleAddFormHide}><CancelIcon/></button>
                <h2>Создание поста</h2>
                <div>
                    <input className="addFormInput" type="text" name='postTitle' placeholder="Заголовок поста"/>
                </div>
                <div>
                    <textarea className="addFormInput" name="postDescription" placeholder="Описание поста"/>
                </div>
                <div>
                    <button onClick={props.handleAddFormHide} className="blackBtn" type="button">Добавить пост</button>
                </div>
            </form>
            <div onClick={props.handleAddFormHide} className="overlay">
            </div>
        </>
    )
}