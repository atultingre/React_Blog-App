import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import format from "date-fns/format";
// import DataContext from '../context/DataContext';
// import api from "../api/posts"

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const {posts, setPosts} = useContext(DataContext);
  // const [editTitle, setEditTitle] = useState('');
  // const [editBody, setEditBody] = useState('');
  // const post = posts.find(post => (post.id).toString() === id);

  // try {
  //   const response = await api.put(`/posts/${id}`, updatedPost);
  //   setPosts(posts.map((post)=> post.id === id ? {...response.data}: post));
  //   setEditTitle('');
  //   setEditBody('');
  // } catch(err){
    //   console.log(`Error: ${err.message}`)
    // }
    
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    
    useEffect(() => {
      if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
      }
    }, [post, setEditTitle, setEditBody]);
    
    const handleEdit = (id) => {
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      editPost(updatedPost);
      navigate(`/post/${id}`); 
        navigate('/');
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTile"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              required
              id="postBody"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, thats disappointing.</p>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
