import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Post, PostRequest } from "../Types/Types";

export const CreatePost = (params: { postPost: any }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [flair, setFlair] = useState<string>("")
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
        // e.preventDefault();
        params.postPost(postRequest);
    }

    if (!editMode) {
        return (
            <div className="create-post">
                <button className="create-post--button" onClick={Edit}>Create New Post</button>
            </div>
        )
    } else {
        return (
            <div className="create-post-form">
                <p className="create-post-form--title">Create New Post</p>
                <form className="create-post-form--form" onSubmit={OnFormSubmit}>
                    <span>Flair</span>
                    <input onChange={e => setFlair(e.target.value)} placeholder="Flair" type="text" required></input>
                    <span>Title</span>
                    <input onChange={e => setTitle(e.target.value)} placeholder="Title" type="text" required></input>
                    <span>Content</span>
                    <input onChange={e => setContent(e.target.value)} placeholder="Content" type="text" required></input>
                    <button className="create-post--button">Submit</button>
                </form>
                <button className="create-post--button" onClick={Edit}>Cancel</button>
            </div>
        )
    }
}