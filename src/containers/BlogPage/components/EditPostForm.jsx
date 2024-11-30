import style from './EditPostForm.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import {Component} from "react";

export class EditPostForm extends Component {
    state = {
        postTitle: this.props.selectedPost.title,
        postDesc: this.props.selectedPost.description
    }

    handlePostTitleChange = e => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostDescChange = e => {
        this.setState({
            postDesc: e.target.value
        })
    }

    savePost = (e) => {
        e.preventDefault()
        const post = {
            id: this.props.selectedPost.id,
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: this.props.selectedPost.liked
        }

        console.log(post)

        this.props.editBlogPost(post)
        this.props.handleEditFormHide()
    }

    handleEscape = (e) => {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.props.handleEditFormHide()
            }
        })
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }

    render() {
        return (
            <>
                <form className={style.editPostForm} onSubmit={this.savePost}>
                    <button className={style.hideBtn} onClick={this.props.handleEditFormHide}><CancelIcon/></button>
                    <h2>Редактирование поста</h2>
                    <div>
                        <input
                            className={style.editFormInput}
                            type="text" name='postTitle'
                            placeholder="Заголовок поста"
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            className={style.editFormInput}
                            name="postDescription"
                            placeholder="Описание поста"
                            value={this.state.postDesc}
                            onChange={this.handlePostDescChange}
                            rows={8}
                            required
                        />
                    </div>
                    <div>
                        <button className="blackBtn" type="submit">Сохранить пост
                        </button>
                    </div>
                </form>
                <div onClick={this.props.handleEditFormHide} className={style.overlay}>
                </div>
            </>
        )
    }
}