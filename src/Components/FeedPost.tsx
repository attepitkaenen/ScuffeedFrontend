import { SyntheticEvent, useEffect, useState } from "react";
import { Post, PostRequest } from "../Types/Types";



const FeedPost = (params: { post: Post, postUpdate: any, deletePost: any}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(params.post.title)
    const [content, setContent] = useState<string>(params.post.content)
    const [flair, setFlair] = useState<string>(params.post.flair.flairName)
    const [postRequest, setPostRequest] = useState<PostRequest>({
        Title: title,
        Content: content,
        Flair: flair
    })


    const Edit = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        setPostRequest({
            Title: title,
            Content: content,
            Flair: flair
        })
    }, [title, content, flair])

    const OnFormSubmit = (e: SyntheticEvent) => {
        params.postUpdate(params.post.id, postRequest)
    }

    const Delete = () => {
        params.deletePost(params.post.id)
    }

    if (!editMode) {
        return (
            <div className="post-card">
                <span className="post-card--flair">{params.post.flair.flairName}</span>
                <h1 className="post-card--title">{params.post.title}</h1>
                <p className="post-card--content">{params.post.content}</p>
                <button className="post-card--button" onClick={Edit}>Edit</button>
            </div>
        )
    } else {
        return (
        <div className="post-card">
            <p>Edit Post</p>
            <form onSubmit={OnFormSubmit}>
                <span>Flair</span>
                <input onChange={e => setFlair(e.target.value)} placeholder={params.post.flair.flairName} type="text"></input>
                <span>Title</span>
                <input onChange={e => setTitle(e.target.value)} placeholder={params.post.title} type="text"></input>
                <span>Content</span>
                <input onChange={e => setContent(e.target.value)} placeholder={params.post.content} type="text"></input>
                <button className="post-card--button">Submit</button>
            </form>
            <button className="post-card--button" onClick={Delete}>Delete</button>
            <button className="post-card--button" onClick={Edit}>Cancel</button>
        </div>
        )
    }



}

export default FeedPost;