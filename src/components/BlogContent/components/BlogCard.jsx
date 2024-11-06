import './BlogCard.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const BlogCard = ({title, description, liked, likePost, deletePost}) => {

    const heartFill = liked ? 'crimson' : 'darkgray'


    const heartStyles = {}

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

            <button className="deleteBtn" onClick={deletePost}>
                <DeleteForeverIcon/>
            </button>
        </div>
    )
}