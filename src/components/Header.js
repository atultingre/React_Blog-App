import React from 'react'
import { FaTabletAlt, FaLaptop, FaMobileAlt} from 'react-icons/fa'

const Header = ({title, width}) => {
  return (
    <header className='Header' width={width}>
      <h1>{title}</h1>
      {width< 768 ? <FaMobileAlt/>
      : width < 992 ? <FaTabletAlt/> : <FaLaptop/>}
    </header>
  )
}

export default Header