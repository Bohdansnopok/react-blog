import './BlogContent.css'
import {BlogCard} from "./components/BlogCard";
import {Component} from "react";
import {AddPostForm} from "./components/AddPostForm";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

export class BlogContent extends Component {
    state = {
        /*showBlog: true,*/
        showAddForm: false,
        blockArr: [],
        isPending: false
    }

    fetchPosts = () => {
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

    likePost = (blogPost) => {
        const temp = {...blogPost}
        temp.liked = !temp.liked

        axios.put(`https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/${blogPost.id}`, temp)
            .then((response) => {
                console.log('changed post =>', response.data)
                this.fetchPosts()
            })
            .catch((err) => {
                console.log(err)
            })
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
            this.setState({
                isPending: true
            })

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

    addNewBlogPost = (blogPost) => {
        this.setState({
            isPending: true
        })
        axios.post('https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/', blogPost)
            .then((response) => {
                console.log('post add=>', response.data)
                this.fetchPosts()
            })
            .catch((err) => {
                console.log(err)
            })
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
                    likePost={() => this.likePost(item)}
                    deletePost={() => this.deletePost(item)}
                />
            )
        })

        if (this.state.blockArr.length === 0)
            return <h1>Загружаем данные...</h1>

        const postsOpacity = this.state.isPending ? 0.5 : 1

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

                    <div className="posts" style={{opacity: postsOpacity}}>
                        {blogPosts}
                    </div>
                    {
                        this.state.isPending && <h2><CircularProgress className="preloader"/></h2>
                    }
                </>
                {/*: null}*/}
            </div>
        )
    }
}