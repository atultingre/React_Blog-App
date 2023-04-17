import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({search, setSeaarch}) => {
  return (
    <nav className='Nav'>
      <form onSubmit={(e)=> e.preventDefault()} className='searchForm'>
        <label htmlFor="search"Search></label>
        <input type="text" id='search' placeholder='Search Post' value={search} onChange={(e)=> setSeaarch(e.target.value)}/>
        
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">Post</Link></li>
        <li><Link to="about">About</Link></li>
        
      </ul>
    </nav>
  )
}

export default Navbar