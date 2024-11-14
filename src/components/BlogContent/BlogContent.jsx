import './BlogContent.css'
import {BlogCard} from "./components/BlogCard";
import {Component} from "react";
import {AddPostForm} from "./components/AddPostForm";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {EditPostForm} from "./components/EditPostForm";

export class BlogContent extends Component {
    state = {
        /*showBlog: true,*/
        showAddForm: false,
        showEditForm: false,
        blockArr: [],
        isPending: false,
        selectedPost: {}
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

    handleEditFormShow = () => {
        this.setState({
            showEditForm: true,
        })
    }

    editBlogPost = (updatedBlogPost) => {
        this.setState({
            isPending: true
        })

        axios.put(`https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/${updatedBlogPost.id}`,
            updatedBlogPost)
            .then((response) => {
                console.log('пост отредактирован=>', response.data)
                this.fetchPosts()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleEditFormHide = () => {
        this.setState({
            showEditForm: false,
        })
    }

    handleAddFormHide = () => {
        this.setState({
            showAddForm: false,
        })
    }

    handleSelectedPost = (blogPost) => {
        this.setState({
            selectedPost: blogPost
        })
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        console.log(this.state.selectedPost)
        const blogPosts = this.state.blockArr.map((item, pos) => {
            return (
                <BlogCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    liked={item.liked}
                    likePost={() => this.likePost(item)}
                    deletePost={() => this.deletePost(item)}
                    handleEditFormShow={this.handleEditFormShow}
                    handleSelectedPost={() => this.handleSelectedPost(item)}
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

                {
                    this.state.showEditForm && (
                        <EditPostForm
                            handleEditFormHide={this.handleEditFormHide}
                            selectedPost={this.state.selectedPost}
                            editBlogPost={this.editBlogPost}
                        />
                    )
                }

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