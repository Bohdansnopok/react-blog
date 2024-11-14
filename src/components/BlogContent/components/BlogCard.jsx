import './BlogCard.css'
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
        <div className="post">
            <div className="postContent">
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
            <div className="postControl">
                <button className="editBtn" onClick={showEditForm}>
                    <EditIcon/>
                </button>
                <button className="deleteBtn" onClick={deletePost}>
                    <DeleteForeverIcon/>
                </button>
            </div>
        </div>
    )
}