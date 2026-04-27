import express from 'express'
const app = express()

const port = 4000

export const products = [
  {
    id: 1,
    title: 'iPhone 14 Pro',
    description: 'Latest Apple smartphone with A16 chip',
    price: 1200,
    discountPercentage: 10,
    rating: 4.8,
    stock: 12,
    brand: 'Apple',
    thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
    tags: ['smartphone', 'apple', 'ios']
  },
  {
    id: 30,
    title: 'Samsung Galaxy S23',
    description: 'Flagship Android phone with powerful performance',
    price: 950,
    discountPercentage: 8,
    rating: 4.5,
    stock: 20,
    brand: 'Samsung',
    thumbnail: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
    tags: ['smartphone', 'android']
  },
  {
    id: 3,
    title: 'MacBook Pro M2',
    description: 'High-performance laptop for developers',
    price: 2100,
    discountPercentage: 5,
    rating: 4.9,
    stock: 5,
    brand: 'Apple',
    thumbnail: 'https://dummyjson.com/image/i/products/6/thumbnail.png',
    tags: ['laptop', 'apple', 'developer']
  },
  {
    id: 4,
    title: 'Nike Air Max',
    description: 'Comfortable and stylish sneakers',
    price: 180,
    discountPercentage: 15,
    rating: 4.3,
    stock: 30,
    brand: 'Nike',
    thumbnail: 'https://dummyjson.com/image/i/products/10/thumbnail.jpeg',
    tags: ['shoes', 'fashion']
  },
  {
    id: 5,
    title: 'Sony WH-1000XM5',
    description: 'Noise-cancelling wireless headphones',
    price: 400,
    discountPercentage: 12,
    rating: 4.7,
    stock: 18,
    brand: 'Sony',
    thumbnail: 'https://dummyjson.com/image/i/products/8/thumbnail.jpg',
    tags: ['audio', 'headphones']
  }
]
app.get('/', (req, res) => {
  console.log('Received a request at /', req.body)
  res.send({
    message: '  producrts retrieved  successfull',
    success: true,
    products: products
  })
})
app.delete('/deleteproduct/:productId', (req, res) => {
  const productId = Number(req.params.productId)
  const productIndex = products.findIndex(p => p.id === productId)

  if (productIndex === -1) {
    return res.status(404).send({
      message: 'Product not found',
      success: false
    })
  }

  products.splice(productIndex, 1)

  res.send({
    message: 'Product deleted successfully',
    success: true,
    products: products
  })
})

app.post('/addproduct', (req, res) => {
  const newProduct = req.body

  newProduct.id =
    products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
  products.push(newProduct)
  res.status(201).send({
    message: 'Product added successfully',
    success: true,
    product: newProduct
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
