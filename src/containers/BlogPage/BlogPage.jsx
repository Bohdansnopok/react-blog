import style from './BlogPage.module.css';
import {BlogCard} from "./components/BlogCard";
import {Component, useEffect, useState} from "react";
import {AddPostForm} from "./components/AddPostForm";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {EditPostForm} from "./components/EditPostForm";
import {postsApi} from "../../shared/projectData";

let source;

export const BlogPage = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [blockArr, setBlockArr] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [selectedPost, setSelectedPost] = useState({})

    const fetchPosts = () => {
        source = axios.CancelToken.source();
        axios.get(postsApi, {cancelToken: source.token})
            .then((response) => {
                blockArr(response.data)
                isPending(false)
            })

            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchPosts()

        return () => source.cancel('Axios get canceled')
    }, [])

    const likePost = (blogPost) => {
        const temp = {...blogPost}
        temp.liked = !temp.liked

        axios.put(`${postsApi}/${blogPost.id}`, temp)
            .then((response) => {
                console.log('changed post =>', response.data)
                fetchPosts()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    /*toggleBlog = () => {
        setState(({showBlog}) => {
            return {
                showBlog: !showBlog
            }
        })
    }*/

    const deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {
            isPending(true)

            axios.delete(`${postsApi}/${blogPost.id}`)
                .then((obj) => {
                    console.log('delete post =>', obj)
                    fetchPosts()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const addNewBlogPost = (blogPost) => {
        isPending(true)

        axios.post(postsApi, blogPost)
            .then((response) => {
                console.log('post add=>', response.data)
                fetchPosts()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleAddFormShow = () => {
        showAddForm(true)
    }

    const handleEditFormShow = () => {
        showEditForm(true)
    }

    const editBlogPost = (updatedBlogPost) => {
        isPending(true)

        axios.put(`${postsApi}/${updatedBlogPost.id}`,
            updatedBlogPost)
            .then((response) => {
                console.log('пост отредактирован=>', response.data)
                fetchPosts()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleEditFormHide = () => {
        showEditForm(false)
    }

    const handleAddFormHide = () => {
        showAddForm(false)
    }

    const handleSelectedPost = (blogPost) => {
        selectedPost(blogPost)
    }

    console.log(selectedPost)
    const blogPosts = blockArr.map((item, pos) => {
        return (
            <BlogCard
                key={item.id}
                title={item.title}
                description={item.description}
                liked={item.liked}
                likePost={() => likePost(item)}
                deletePost={() => deletePost(item)}
                handleEditFormShow={handleEditFormShow}
                handleSelectedPost={() => handleSelectedPost(item)}
            />
        )
    })

    if (blockArr.length === 0)
        return <h1>Загружаем данные...</h1>

    const postsOpacity = isPending ? 0.5 : 1

    return (
        <div className={style.blogPage}>
            {showAddForm && (
                <AddPostForm
                    blockArr={blockArr}
                    addNewBlogPost={addNewBlogPost}
                    handleAddFormHide={handleAddFormHide}/>
            )}

            {
                showEditForm && (
                    <EditPostForm
                        handleEditFormHide={handleEditFormHide}
                        selectedPost={selectedPost}
                        editBlogPost={editBlogPost}
                    />
                )
            }

            {/*<button onClick={toggleBlog}>
                    {
                        showBlog ? 'Скрыть блог' : 'Показать Блог'
                    }
                </button>*/}
            {/*{
                    showBlog ?*/}
            <>
                <h1>Блог</h1>
                <div className={style.addNewPost}>
                    <button className="blackBtn" onClick={handleAddFormShow}>Создать новый пост</button>
                </div>

                <div className={style.posts} style={{opacity: postsOpacity}}>
                    {blogPosts}
                </div>
                {
                    isPending && <h2><CircularProgress className={style.preloader}/></h2>
                }
            </>
            {/*: null}*/}
        </div>
    )
}