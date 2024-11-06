import './BlogContent.css'
import {posts} from "../../shared/projectData";
import {BlogCard} from "./components/BlogCard";
import {Component} from "react";
import {AddPostForm} from "./components/AddPostForm";

export class BlogContent extends Component {
    state = {
        /*showBlog: true,*/
        showAddForm: false,
        blockArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
    }

    likePost = pos => {
        const temp = [...this.state.blockArr];
        temp[pos].liked = !temp[pos].liked

        this.setState({
            blockArr: temp
        })

        localStorage.setItem('blogPosts', JSON.stringify(temp))
    }

    /*toggleBlog = () => {
        this.setState(({showBlog}) => {
            return {
                showBlog: !showBlog
            }
        })
    }*/

    deletePost = pos => {
        if (window.confirm(`Удалить ${this.state.blockArr[pos].title}?`)) {
            const temp = [...this.state.blockArr]
            temp.splice(pos, 1)
            this.setState({
                blockArr: temp
            })

            localStorage.setItem('blogPosts', JSON.stringify(temp))
        }
    }

    handleAddFormShow = () => {
        this.setState({
            showAddForm: true,
        })
    }

    handleAddFormHide = () => {
        this.setState({
            showAddForm: false,
        })
    }

    render() {
        const blogPosts = this.state.blockArr.map((item, pos) => {
            return (
                <BlogCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    liked={item.liked}
                    likePost={() => this.likePost(pos)}
                    deletePost={() => this.deletePost(pos)}
                />
            )
        })

        return (
            <>
                {this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide}/> : null}

                {/*<button onClick={this.toggleBlog}>
                    {
                        this.state.showBlog ? 'Скрыть блог' : 'Показать Блог'
                    }
                </button>*/}
                {/*{
                    this.state.showBlog ?*/}
                <>
                    <h1>Simple Blog</h1>
                    <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
                    <div className="posts">
                        {blogPosts}
                    </div>
                </>
                {/*: null}*/}
            </>
        )
    }
}