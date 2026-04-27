

// import BlogsList from './components/BlogsList'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { BlogsList } from './components/BlogsList.jsx'
import Filter from './components/filter.jsx'
import { Header } from './components/Header.jsx'
import { ProductsList } from './components/ProductsList.jsx'
import Timer from './components/Timer.jsx'
import './styles/App.css'
import { Home } from './pages/Testroute.jsx'
import { ProductDetail } from './pages/ProductDetail.jsx'

function App() {


  return (
    <>
      <nav style={{display:'flex',justifyContent:'space-between'}}>
        
        <Link to="/">home 
        </Link>
              <Link to="/products">products 
        </Link>
        <Link  to="blogs">
        blogs
        </Link>
  </nav>

  
    {/* <Header />
      
      <Filter /> */}
 
        
        
        
        <Routes>
          
        <Route path="/" element={<Home />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="products/:idd" element={<ProductDetail />} />
        <Route path="blogs" element={<BlogsList />} />
        
          
          
        </Routes>
  
      
  

    </>
  )
}

export default App
