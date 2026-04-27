import React, { useState } from 'react'
import '../styles/blogCard.css'

const BlogCard = (props) => {
  const [blogDetailsOpen, SetBlogDetailOpen] = useState(false)
  const handleReadMore = props => {
    console.log('am  given ', props)
    SetBlogDetailOpen(true)
  }
  const handleClose = () => {
    SetBlogDetailOpen(false)
  }
  return (
    <>
    <div className='blog-card'>
      <div className='blog-card-image'>
        <img src={props.image} alt={props.title} />
        </div>
        <h1>{ props.title}</h1>

      <div className='blog-card-content'>
  

        <p className='blog-description'>
          {props.description}
        </p>

        <div className='blog-meta'>
          <span>
            By {props.author}
          </span>
          <span>
            {props.date}
          </span>
          </div>
          {/* <span>{ props.mycontent}</span> */}

        <div className='blog-stats'>
          <span>
            👍 {props.likes}
          </span>
          <span>
            💬 {props.comments}
          </span>
          <span>
            👁 {props.views}
          </span>
        </div>
        <button onClick={() => handleReadMore(props)}>readmore</button>
      </div>

      </div>
      
      {blogDetailsOpen && <BlogDetails />}
    </>
  )

  function BlogDetails () {
    return (
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          background: 'blue',
          index: 1000,
          top:0
        }}
      >
        <h1>Blog Details Page </h1>
        <button onClick={() => handleClose()}>close</button>
      </div>
    )
  }
}
export default BlogCard
