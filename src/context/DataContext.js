import { createContext, useEffect, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);


  const {data , fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(()=>{
    setPosts(data);
  },[data])

  useEffect(()=>{
    const filtredResults = posts.filter(post =>
      ((post.body).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
    || ((post.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
    )
    setSearchResult(filtredResults.reverse());
  },[posts, search])

    return(
        <DataContext.Provider value={{
            search, setSearch, 
            searchResult, fetchError, isLoading, 
            posts,setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;