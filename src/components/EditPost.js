import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const EditPost = (props) => {
    const {posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle} = props;

    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

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