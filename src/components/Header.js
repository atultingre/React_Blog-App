import React from 'react'
import { FaTabletAlt, FaLaptop, FaMobileAlt} from 'react-icons/fa'
import useWindowSize from '../hooks/useWindowSize';

const Header = ({title}) => {
  const {width} = useWindowSize();
  return (
    <header className='Header' width={width}>
      <h1>{title}</h1>
      {width< 768 ? <FaMobileAlt/>
      : width < 992 ? <FaTabletAlt/> : <FaLaptop/>}
    </header>
  )
}

export default Header