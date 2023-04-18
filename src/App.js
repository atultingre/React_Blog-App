import { useEffect } from "react";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import About from "./components/About";
import Missing from "./components/Missing";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";
// import { DataProvider } from "./context/DataContext";


const App = () => {
  const setPosts = useStoreActions((actions)=> actions.setPosts);

  const {data , fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(()=>{
    setPosts(data);
  },[data, setPosts])

  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home isLoading={isLoading} fetchError={fetchError}/>} />
            <Route exact path="post">
              <Route index element={<NewPost />} />
              <Route exact path="post:id" element={<PostPage />} />
            </Route>
            <Route path="edit/:id" element={<EditPost />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      {/* <DataProvider> */}
      {/* </DataProvider> */}
    </div>
  );
};

export default App;
