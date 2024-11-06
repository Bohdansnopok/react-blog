import './AddPostForm.css'
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

    render() {
        return (
            <>
                <form action="" className="AddPostForm">
                    <button className="hideBtn" onClick={this.props.handleAddFormHide}><CancelIcon/></button>
                    <h2>Создание поста</h2>
                    <div>
                        <input
                            className="addFormInput"
                            type="text" name='postTitle'
                            placeholder="Заголовок поста"
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                        />
                    </div>
                    <div>
                        <textarea
                            className="addFormInput"
                            name="postDescription"
                            placeholder="Описание поста"
                            value={this.state.postDescription}
                            onChange={this.handlePostDescChange}
                        />
                    </div>
                    <div>
                        <button onClick={this.props.handleAddFormHide} className="blackBtn" type="button">Добавить пост
                        </button>
                    </div>
                </form>
                <div onClick={this.props.handleAddFormHide} className="overlay">
                </div>
            </>
        )
    }
}