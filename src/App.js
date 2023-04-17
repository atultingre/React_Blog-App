import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import About from "./components/About";
import Missing from "./components/Missing";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route exact path="/post">
              <Route index element={<NewPost />} />
              <Route exact path="/post:id" element={<PostPage />} />
            </Route>
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
};

export default App;
