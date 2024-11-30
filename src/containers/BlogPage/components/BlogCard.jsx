import style from './BlogCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';

export const BlogCard = ({title, description, liked, likePost, deletePost, handleEditFormShow, handleSelectedPost}) => {

    const showEditForm = () => {
        handleSelectedPost()
        handleEditFormShow()
    }

    const heartFill = liked ? 'crimson' : 'darkgray'

    return (
        <div className={style.post}>
            <div className={style.postContent}>
                <h2>{title}</h2>
                <p>
                    {description}
                </p>
                <div>
                    <button onClick={likePost}>
                        <FavoriteIcon style={{fill: heartFill}}/>
                    </button>
                </div>
            </div>
            <div className={style.postControl}>
                <button className={style.editBtn} onClick={showEditForm}>
                    <EditIcon/>
                </button>
                <button className={style.deleteBtn} onClick={deletePost}>
                    <DeleteForeverIcon/>
                </button>
            </div>
        </div>
    )
}