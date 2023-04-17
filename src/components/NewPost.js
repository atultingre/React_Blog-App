import React, { useState } from 'react'
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom'
import api from "../api/posts"
import { format } from 'date-fns'

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const {posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 :1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try{
      const response = await api.post('/posts', newPost);
      const allposts = [...posts, response.data];
      setPosts(allposts);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title:</label>
          <input type="text" id='postTile' value={postTitle} onChange={(e)=> setPostTitle(e.target.value)} required/>
          <label htmlFor="postBody">Post:</label>
          <textarea required id="postBody" value={postBody} onChange={(e)=> setPostBody(e.target.value)}/>
          <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost