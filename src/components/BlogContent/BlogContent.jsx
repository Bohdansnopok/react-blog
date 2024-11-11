import './BlogContent.css'
import {BlogCard} from "./components/BlogCard";
import {Component} from "react";
import {AddPostForm} from "./components/AddPostForm";
import axios from "axios";

export class BlogContent extends Component {
    state = {
        /*showBlog: true,*/
        showAddForm: false,
        blockArr: [],
        isPending: false
    }

    fetchPosts = () => {
        this.setState({
            isPending: true
        })
        axios.get('https://5fb3db44b6601200168f7fba.mockapi.io/api/posts')
            .then((response) => {
                this.setState({
                    blockArr: response.data,
                    isPending: false
                })
            })

            .catch((err) => {
                console.log(err)
            })
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

    deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {

            axios.delete(`https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/${blogPost.id}`)
                .then((obj) => {
                    console.log('delete post =>', obj)
                    this.fetchPosts()
                })
                .catch((err) => {
                    console.log(err)
                })
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

    handleEscape = (e) => {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && this.state.showAddForm) {
                this.handleAddFormHide()
            }
        })
    }

    addNewBlogPost = (blogPost) => {
        this.setState((state) => {
            const posts = [...state.blockArr]
            posts.push(blogPost)
            localStorage.setItem('blogPosts', JSON.stringify(posts))
            return {
                blockArr: posts
            }
        })
    }

    componentDidMount() {
        this.fetchPosts()
        window.addEventListener('keyup', this.handleEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleEscape)
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
                    deletePost={() => this.deletePost(item)}
                />
            )
        })

        if (this.state.blockArr.length === 0)
            return <h1>Загружаем данные...</h1>

        return (
            <div className="blogPage">
                {this.state.showAddForm && (
                    <AddPostForm
                        blockArr={this.state.blockArr}
                        addNewBlogPost={this.addNewBlogPost}
                        handleAddFormHide={this.handleAddFormHide}/>
                )}

                {/*<button onClick={this.toggleBlog}>
                    {
                        this.state.showBlog ? 'Скрыть блог' : 'Показать Блог'
                    }
                </button>*/}
                {/*{
                    this.state.showBlog ?*/}
                <>
                    <h1>Блог</h1>
                    <div className="addNewPost">
                        <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
                    </div>
                    {
                        this.state.isPending && <h2>Подождите...</h2>
                    }
                    <div className="posts">
                        {blogPosts}
                    </div>
                </>
                {/*: null}*/}
            </div>
        )
    }
}