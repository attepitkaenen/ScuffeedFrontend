import React, { useEffect, useState } from 'react';
import './App.css';
import { CreatePost } from './Components/CreatePost';
import FeedPost from './Components/FeedPost';
import { Flair, Post, PostRequest } from './Types/Types';
import Logo from './catLogo.png'
import './Styles/Styles.css'
import './Styles/Layout.css'
import { FilterBar } from './Components/FilterBar';

const PostUpdate = (id: number, postRequest: PostRequest) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postRequest)
  };
  fetch(`https://scuffeedbackend.azurewebsites.net/api/Posts/${id}`, requestOptions)
}

const PostPost = (postRequest: PostRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postRequest)
  };
  fetch(`https://scuffeedbackend.azurewebsites.net/api/Posts/`, requestOptions)
}



function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [flairs, setFlairs] = useState<Flair[]>([])
  const [filter, setFilter] = useState<string>("All")

  const DeletePost = (id: number) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`https://scuffeedbackend.azurewebsites.net/api/Posts/${id}`, requestOptions)
    setPosts(posts.filter(post => {
      return post.id !== id
    }))
  }

  useEffect(() => {
    fetch(`https://scuffeedbackend.azurewebsites.net/api/Posts`)
      .then(data => data.json())
      .then(data => setPosts(data))

    fetch(`https://scuffeedbackend.azurewebsites.net/api/Flairs/`)
      .then(data => data.json())
      .then(data => setFlairs(data))
  }, []);


  return (
    <div className="App">
      <h1 className='App--title'>Welcome to Scuffeed!</h1>
      <img src={Logo} alt="Logo"></img>
      <CreatePost postPost={PostPost} />
      <FilterBar flairs={flairs} setFilter={setFilter} />
      {posts?.map(post => {
        if (post.flair.flairName !== filter && filter !== "All") {
          return null;
        }
        return <FeedPost key={post.id} post={post} postUpdate={PostUpdate} deletePost={DeletePost} />
      })
      }
    </div>
  );
}

export default App;
