import style from './AddPostForm.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import {Component} from "react";

export class AddPostForm extends Component {
    state = {
        postTitle: '',
        postDesc: ''
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

    createPost = (e) => {
        e.preventDefault()
        const post = {
            title: this.state.postTitle,
            description: this.state.postDesc,
            liked: false
        }

        console.log(post)

        this.props.addNewBlogPost(post)
        this.props.handleAddFormHide()
    }

    handleEscape = (e) => {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                this.props.handleAddFormHide()
            }
        })
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleEscape)
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('Компонент формы обновился')
    // }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
    }

    render() {
        return (
            <>
                <form className={style.AddPostForm} onSubmit={this.createPost}>
                    <button className={style.hideBtn} onClick={this.props.handleAddFormHide}><CancelIcon/></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input
                            className={style.addFormInput}
                            type="text" name='postTitle'
                            placeholder="Заголовок поста"
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            className={style.addFormInput}
                            name="postDescription"
                            placeholder="Описание поста"
                            value={this.state.postDesc}
                            onChange={this.handlePostDescChange}
                            required
                        />
                    </div>
                    <div>
                        <button className="blackBtn" type="submit">Добавить пост
                        </button>
                    </div>
                </form>
                <div onClick={this.props.handleAddFormHide} className={style.overlay}>
                </div>
            </>
        )
    }
}