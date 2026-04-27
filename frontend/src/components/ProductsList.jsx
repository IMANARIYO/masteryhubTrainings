import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import '../styles/productslist.css'

function ProductsList () {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://dummyjson.com/products')
      setProducts(response.data.products)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Products</h2>
      <div className='productslist'>
        {products.map(productItem =>
          <ProductCard
            key={productItem.id}
            product={productItem}
            // onViewDetails={(p) => navigate(`/products/${p.id}`)}
          />
        )}
      </div>
    </div>
  )
}

export { ProductsList }
