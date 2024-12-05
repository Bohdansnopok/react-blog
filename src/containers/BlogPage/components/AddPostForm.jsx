import style from './AddPostForm.module.css'
import CancelIcon from '@mui/icons-material/Cancel';
import {Component, useEffect, useState} from "react";

export const AddPostForm = (props) => {
    const [postTitle, setPostTitle] = useState('')
    const [postDesc, setPostDesc] = useState('')

    const handlePostTitleChange = e => {
        setPostTitle(e.target.value)
    }

    const handlePostDescChange = e => {
        setPostDesc(e.target.value)
    }

    const createPost = (e) => {
        e.preventDefault()
        const post = {
            title: postTitle,
            description: postDesc,
            liked: false
        }

        console.log(post)

        props.addNewBlogPost(post)
        props.handleAddFormHide()
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                props.handleAddFormHide()
            }
        }
        window.addEventListener('keyup', handleEscape)

        return () => window.removeEventListener('keyup', handleEscape)
    }, [props])

    return (
        <>
            <form className={style.AddPostForm} onSubmit={createPost}>
                <button className={style.hideBtn} onClick={props.handleAddFormHide}><CancelIcon/></button>
                <h2>Создание поста</h2>
                <div>
                    <input
                        className={style.addFormInput}
                        type="text" name='postTitle'
                        placeholder="Заголовок поста"
                        value={postTitle}
                        onChange={handlePostTitleChange}
                        required
                    />
                </div>
                <div>
                        <textarea
                            className={style.addFormInput}
                            name="postDescription"
                            placeholder="Описание поста"
                            value={postDesc}
                            onChange={handlePostDescChange}
                            rows={8}
                            required
                        />
                </div>
                <div>
                    <button className="blackBtn" type="submit">Добавить пост
                    </button>
                </div>
            </form>
            <div onClick={props.handleAddFormHide} className={style.overlay}>
            </div>
        </>
    )
}