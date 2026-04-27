import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import '../styles/blogsList.css'
import Timer from './Timer'
export const BlogsList = () => {
  const longContent = `
Building scalable applications requires a solid understanding of architecture, performance optimization, and maintainability. 
In modern development, combining technologies like React for the frontend and FastAPI for the backend allows developers to 
create high-performance, type-safe, and asynchronous systems. A well-structured project should follow clean architecture 
principles, separating concerns into layers such as controllers, services, and data access. This makes the code easier to test, 
extend, and maintain over time.

When designing your application, always consider real-world constraints such as network latency, security, and scalability. 
Use proper validation on both the client and server sides, implement authentication using secure methods like JWT, and ensure 
your APIs are optimized with pagination and caching strategies. Additionally, adopting tools like Docker for containerization 
helps maintain consistent environments across development and production.

Frontend performance is equally important. Techniques like lazy loading, memoization, and code splitting can significantly 
improve user experience. Managing state properly using Context API or external libraries ensures your application remains 
predictable and easy to debug. Testing should not be ignored; unit tests and integration tests help catch issues early and 
improve confidence when deploying updates.

Finally, always write clean and readable code, follow naming conventions, and document important logic where necessary. 
A professional developer not only builds features but ensures that the system is reliable, scalable, and easy for others to 
understand and contribute to.
`

  const blogs = [
    {
      title: 'How to Build a Blog App',
      description:
        'Learn how to build a scalable blog application using React and FastAPI with best practices.',
      content: longContent,
      author: 'Baptiste',
      date: 'April 21, 2026',
      likes: 120,
      comments: 45,
      views: 980,
      image: 'https://via.placeholder.com/300'
    },
    {
      title: 'Understanding React Hooks in Depth',
      description:
        'Master React hooks like useState, useEffect, and useMemo with practical examples and patterns.',
      content: longContent,
      author: 'Baptiste',
      date: 'April 20, 2026',
      likes: 95,
      comments: 30,
      views: 870,
      image: 'https://via.placeholder.com/300'
    },
    {
      title: 'FastAPI for Beginners',
      description:
        'A complete guide to building modern APIs with FastAPI, including routing, validation, and async support.',
      content: longContent,
      author: 'Baptiste',
      date: 'April 19, 2026',
      likes: 140,
      comments: 50,
      views: 1100,
      image: 'https://via.placeholder.com/300'
    }
  ]

  const [recount, SetRecount] = useState(0)

  return (
    <div style={{ marginTop: '30px' }} className='blogsList'>
      {blogs.map((blog, index) =>
        <BlogCard
          key={index}
          title={blog.title}
          description={blog.description}
          author={blog.author}
          date={blog.date}
          likes={blog.likes}
          comments={blog.comments}
          views={blog.views}
          image={'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
          mycontent={longContent}
        />
      )}
      <button onClick={() => SetRecount(recount + 1)}>
        click me to re render the hole component {recount}
      </button>
      <Timer order={recount} />
    </div>
  )
}
