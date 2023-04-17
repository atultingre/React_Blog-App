import React, { useEffect, useState } from 'react'
import Home from "./components/Home"
import NewPost from "./components/NewPost"
import PostPage from "./components/PostPage"
import EditPost from './components/EditPost'
import About from "./components/About"
import Missing from "./components/Missing"
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import { format } from 'date-fns'
import api from "./api/posts"
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from './hooks/useAxiosFetch'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const {width} = useWindowSize();


  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const response = await api.get('/posts');
        setPosts(response.data);

      } catch (err) {
        if (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);

        }else{
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const filtredResults = posts.filter(post =>
      ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
    || ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
    )
    setSearchResult(filtredResults.reverse());
  },[posts, search])

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



  const handleDelete = async (id) =>{
    try{
      await api.delete(`/posts/${id}`)
      const postList = posts.filter((post)=> post.id !== id);
      setPosts(postList);
      navigate("/")
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  return (
        <Routes>
            <Route path='/' element={<Layout search={search} setSearch={setSearch} width={width}/>}>
              <Route index path='/' element={<Home posts={searchResult}/>}/>
              <Route exact path='/post'>
                <Route index element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}/>}/>
                  <Route exact path='/post:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
              </Route>
                <Route path='/edit/:id'>
                  <Route index element={<EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody}/>}/>
                </Route>
              <Route path='about' element={<About/>}/>
              <Route path='*' element={<Missing/>}/>
            </Route>
        </Routes>   
  )
}

export default App 