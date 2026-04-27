import React from 'react'
import '../styles/headerStyles.css'

export const Header = () => {
  return (
    <header className='myheader'>
      <div className='logo'>MyBlog</div>

      <nav className='home_navigation'>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/authors'>Authors</a>
          </li>
          <li>
            <a href='/login'>Login</a>
          </li>
          <li>
            <a href='/signup'>Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
