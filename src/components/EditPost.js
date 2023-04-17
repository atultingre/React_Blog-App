import React, { useEffect, useContext, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import format from 'date-fns/format';
import api from "../api/posts"


const EditPost = () => {

    const {posts, setPosts} = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);


    const handleEdit = async (id) =>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        try {
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(posts.map((post)=> post.id === id ? {...response.data}: post));
          setEditTitle('');
          setEditBody('');
          navigate('/');
        } catch(err){
          console.log(`Error: ${err.message}`)
        }
      }

    useEffect(()=>{
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post, setEditBody, setEditTitle])
  return (
    <main className='NewPost'>
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e)=> e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input type="text" id='postTile' value={editTitle} onChange={(e)=> setEditTitle(e.target.value)} required/>
                    <label htmlFor="postBody">Post:</label>
                    <textarea required id="postBody" value={editBody} onChange={(e)=> setEditBody(e.target.value)}/>
                    <button type='submit' onClick={()=> handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, thats disappointing.</p>
                <p><Link to="/">Visit Our HomePage</Link></p>
            </>

        }
    </main>
  )
}

export default EditPost