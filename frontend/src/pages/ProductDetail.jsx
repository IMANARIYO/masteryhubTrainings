import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const palette = {
  bg: '#FAFAF8',
  white: '#FFFFFF',
  dark: '#1C1C1E',
  gold: '#C8A96E',
  goldLight: '#F0E6D0',
  muted: '#8A8580',
  green: '#3A8C5C',
  greenBg: '#EBF5F0',
  red: '#D4453A',
  redBg: '#FDECEA',
  border: '#F0EBE3',
  shadow: 'rgba(28,28,30,0.08)',
}

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <span style={{ color: '#F4C430', fontSize: '1.1rem', letterSpacing: 2 }}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

function ReviewCard({ review }) {
  const date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
  return (
    <div style={{
      background: palette.white,
      border: `1px solid ${palette.border}`,
      borderRadius: 14,
      padding: '18px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontWeight: 700, color: palette.dark, fontSize: '0.9rem' }}>
            {review.reviewerName}
          </span>
          <span style={{ color: palette.muted, fontSize: '0.75rem', marginLeft: 10 }}>
            {review.reviewerEmail}
          </span>
        </div>
        <span style={{ color: palette.muted, fontSize: '0.75rem' }}>{date}</span>
      </div>
      <StarRating rating={review.rating} />
      <p style={{ color: palette.dark, fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
        {review.comment}
      </p>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: `1px solid ${palette.border}`,
      fontSize: '0.88rem',
    }}>
      <span style={{ color: palette.muted, fontWeight: 500 }}>{label}</span>
      <span style={{ color: palette.dark, fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>
        {value}
      </span>
    </div>
  )
}

export function ProductDetail() {
  const { idd } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('specs')
  const [qty, setQty] = useState(1)
  if (!idd) {
    return<>we nee id  please</>
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios
          .get(`https://dummyjson.com/products/${idd}`)
        setProduct(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [idd])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 0', color: palette.muted, fontSize: '1.1rem' }}>
      Loading product...
    </div>
  )

  if (error || !product) return (
    <div style={{ textAlign: 'center', padding: '80px 0', color: palette.red }}>
      {error || 'Product not found.'}
    </div>
  )

  const finalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const allImages = [product.thumbnail, ...(product.images || [])].filter(Boolean)

  const isLowStock = product.stock <= 5
  const stockColor = isLowStock ? palette.red : palette.green
  const stockBg = isLowStock ? palette.redBg : palette.greenBg

  const tabs = ['specs', 'reviews']

  return (
    <div style={{ background: palette.bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Back Button */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            padding: '8px 18px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            color: palette.dark,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Back to Products
        </button>
      </div>

      {/* Main Section */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '32px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
      }}>
        {/* ── Left: Image Gallery ── */}
        <div>
          <div style={{
            background: palette.goldLight,
            borderRadius: 20,
            overflow: 'hidden',
            aspectRatio: '1 / 1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            position: 'relative',
          }}>
            {/* Discount badge */}
            <span style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: palette.red,
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 20,
              zIndex: 2,
            }}>
              -{Math.round(product.discountPercentage)}% OFF
            </span>
            <img
              src={allImages[activeImage]}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.src = 'https://placehold.co/600x600?text=No+Image' }}
            />
          </div>
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {allImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 10,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: `2px solid ${i === activeImage ? palette.gold : palette.border}`,
                    background: palette.goldLight,
                  }}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.src = 'https://placehold.co/68x68?text=?' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Info ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Brand + Category */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: palette.gold,
            }}>
              {product.brand}
            </span>
            <span style={{ color: palette.border }}>•</span>
            <span style={{
              fontSize: '0.72rem',
              textTransform: 'capitalize',
              color: palette.muted,
              letterSpacing: '0.06em',
            }}>
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: palette.dark,
            margin: 0,
            lineHeight: 1.25,
          }}>
            {product.title}
          </h1>

          {/* Rating Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StarRating rating={product.rating} />
            <span style={{ color: palette.dark, fontWeight: 700, fontSize: '0.9rem' }}>
              {product.rating.toFixed(2)}
            </span>
            <span style={{ color: palette.muted, fontSize: '0.82rem' }}>
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Description */}
          <p style={{ color: palette.muted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
            {product.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {product.tags?.map(tag => (
              <span key={tag} style={{
                background: palette.goldLight,
                color: '#8B6F42',
                fontSize: '0.72rem',
                padding: '4px 12px',
                borderRadius: 20,
                textTransform: 'capitalize',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div style={{
            background: palette.white,
            border: `1px solid ${palette.border}`,
            borderRadius: 14,
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: palette.muted, textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: palette.dark,
                letterSpacing: '-0.02em',
              }}>
                ${finalPrice}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{
                background: stockBg,
                color: stockColor,
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '5px 12px',
                borderRadius: 20,
                marginBottom: 4,
              }}>
                {product.availabilityStatus}
              </div>
              <div style={{ color: palette.muted, fontSize: '0.75rem' }}>
                {product.stock} units left
              </div>
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${palette.border}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setQty(q => Math.max(product.minimumOrderQuantity || 1, q - 1))}
                style={{
                  width: 40, height: 42, border: 'none',
                  background: palette.white, cursor: 'pointer',
                  fontSize: '1.1rem', color: palette.dark,
                }}
              >−</button>
              <span style={{
                width: 44, textAlign: 'center',
                fontSize: '0.9rem', fontWeight: 600, color: palette.dark,
              }}>
                {qty}
              </span>
              <button
                onClick={() => setQty(q => q + 1)}
                style={{
                  width: 40, height: 42, border: 'none',
                  background: palette.white, cursor: 'pointer',
                  fontSize: '1.1rem', color: palette.dark,
                }}
              >+</button>
            </div>
            <button
              style={{
                flex: 1,
                background: palette.dark,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '12px 24px',
                fontSize: '0.9rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.target.style.background = palette.gold)}
              onMouseLeave={e => (e.target.style.background = palette.dark)}
            >
              Add to Cart
            </button>
          </div>

          {/* Shipping + Return */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}>
            {[
              { icon: '🚚', label: 'Shipping', value: product.shippingInformation },
              { icon: '↩️', label: 'Returns', value: product.returnPolicy },
              { icon: '🛡️', label: 'Warranty', value: product.warrantyInformation },
              { icon: '📦', label: 'Min. Order', value: `${product.minimumOrderQuantity} units` },
            ].map(item => (
              <div key={item.label} style={{
                background: palette.white,
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
                padding: '12px 14px',
              }}>
                <div style={{ fontSize: '1rem', marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: '0.7rem', color: palette.muted, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: palette.dark }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Specs + Reviews */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>

        {/* Tab Headers */}
        <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${palette.border}`, marginBottom: 32 }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 28px',
                fontSize: '0.9rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === tab ? palette.dark : palette.muted,
                borderBottom: `2px solid ${activeTab === tab ? palette.gold : 'transparent'}`,
                marginBottom: -2,
                textTransform: 'capitalize',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
            >
              {tab === 'specs' ? 'Specifications' : `Reviews (${product.reviews?.length || 0})`}
            </button>
          ))}
        </div>

        {/* Specs Tab */}
        {activeTab === 'specs' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
          }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: palette.dark, marginBottom: 16, fontSize: '1.1rem' }}>
                Product Details
              </h3>
              <InfoRow label="SKU" value={product.sku} />
              <InfoRow label="Brand" value={product.brand} />
              <InfoRow label="Category" value={product.category} />
              <InfoRow label="Weight" value={`${product.weight} kg`} />
              <InfoRow label="Barcode" value={product.meta?.barcode} />
              <InfoRow label="Created" value={new Date(product.meta?.createdAt).toLocaleDateString()} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: palette.dark, marginBottom: 16, fontSize: '1.1rem' }}>
                Dimensions
              </h3>
              <InfoRow label="Width" value={`${product.dimensions?.width} cm`} />
              <InfoRow label="Height" value={`${product.dimensions?.height} cm`} />
              <InfoRow label="Depth" value={`${product.dimensions?.depth} cm`} />
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            {/* Average Score */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              background: palette.white,
              border: `1px solid ${palette.border}`,
              borderRadius: 16,
              padding: '24px 30px',
              marginBottom: 28,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: palette.dark,
                  lineHeight: 1,
                }}>
                  {product.rating.toFixed(1)}
                </div>
                <StarRating rating={product.rating} />
                <div style={{ color: palette.muted, fontSize: '0.78rem', marginTop: 4 }}>
                  {product.reviews?.length} reviews
                </div>
              </div>
              <div style={{ flex: 1, borderLeft: `1px solid ${palette.border}`, paddingLeft: 24 }}>
                {[5, 4, 3, 2, 1].map(star => {
                  const count = product.reviews?.filter(r => r.rating === star).length || 0
                  const pct = product.reviews?.length ? (count / product.reviews.length) * 100 : 0
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: '0.78rem', color: palette.muted, width: 14 }}>{star}</span>
                      <span style={{ color: '#F4C430', fontSize: '0.85rem' }}>★</span>
                      <div style={{ flex: 1, height: 7, background: palette.border, borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: palette.gold, borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: palette.muted, width: 20 }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {product.reviews?.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
