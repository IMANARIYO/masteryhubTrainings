import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function StarRating(props) {
  const stars = [];
  for (let i = 0; i < Number(props.rating); i++){
    stars.push("★");
  }


  return (

    <>
      
  
      {
        stars.map((mystar, i) => (
          
          <span key={i}>{mystar}</span>
          
        )
        
          
          
        
        )
        
        
        
        
        
      }
    </>
)
    

}
// ── ProductCard ─────────────────────────────────────────────
export const ProductCard = ({ product, onViewDetails }) => {
  const [wished, setWished] = useState(false)
  const finalPrice = (product.price *
    (1 - product.discountPercentage / 100)).toFixed(2)

  const styles = {
    card: {
      background: '#ffffff',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 20px rgba(28,28,30,0.08)',
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
     height:'500px',
      position: 'relative',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      fontFamily: "'DM Sans', sans-serif"
    },
    badgeDiscount: {
      position: 'absolute',
      top: 14,
      left: 14,
      background: '#D4453A',
      color: '#fff',
      fontSize: '0.7rem',
      fontWeight: 500,
      padding: '4px 10px',
      borderRadius: 20,
      letterSpacing: '0.04em',
      zIndex: 2
    },
    btnWish: {
      position: 'absolute',
      top: 12,
      right: 14,
      background: 'rgba(255,255,255,0.85)',
      border: 'none',
      borderRadius: '50%',
      width: 34,
      height: 34,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1rem',
      zIndex: 2,
      color: wished ? '#D4453A' : '#1C1C1E',
      backdropFilter: 'blur(4px)'
    },
    image: {
      width: '100%',
      aspectRatio: '4/3',
      objectFit: 'cover',
      display: 'block',
      background: '#F0E6D0'
    },
    body: {
      padding: '18px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    brand: {
      fontSize: '0.7rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#C8A96E',
      fontWeight: 500,
      marginBottom: 5
    },
    title: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.05rem',
      color: '#1C1C1E',
      lineHeight: 1.35,
      marginBottom: 8,
      fontWeight: 700
    },
    desc: {
      fontSize: '0.78rem',
      color: '#8A8580',
      lineHeight: 1.55,
      flex: 1,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      marginBottom: 14
    },
    starsRow: {
      display: 'flex',
      flexDirection:"column",
      // alignItems: 'center',
      gap: 6,
      marginBottom: 14
    },
    ratingNum: {
      fontSize: '0.75rem',
      color: '#8A8580'
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5,
      marginBottom: 14
    },
    tag: {
      fontSize: '0.65rem',
      background: '#F0E6D0',
      color: '#8B6F42',
      padding: '3px 9px',
      borderRadius: 20,
      letterSpacing: '0.04em',
      textTransform: 'capitalize'
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: '1px solid #F0EBE3',
      paddingTop: 14,
      marginTop: 'auto'
    },
    priceOriginal: {
      fontSize: '0.7rem',
      color: '#8A8580',
      textDecoration: 'line-through',
      display: 'block',
      lineHeight: 1,
      marginBottom: 2
    },
    priceFinal: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1C1C1E',
      letterSpacing: '-0.02em'
    },
    stockDot: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: '#3A8C5C',
      display: 'inline-block',
      marginRight: 5
    },
    stockText: {
      fontSize: '0.7rem',
      color: '#3A8C5C',
      fontWeight: 500
    },
    btnCart: {
      background: '#1C1C1E',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '9px 18px',
      fontSize: '0.78rem',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      cursor: 'pointer',
      letterSpacing: '0.02em',
      transition: 'background 0.2s'
    }
  }

  return (
    <div
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(28,28,30,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 20px rgba(28,28,30,0.08)'
      }}
    >
      {/* Discount Badge */}
      <span style={styles.badgeDiscount}>
        -{Math.round(product.discountPercentage)}%
      </span>

      {/* Wishlist Button */}
      <button
        style={styles.btnWish}
        onClick={() => setWished(w => !w)}
        title='Wishlist'
      >
        {wished ? '♥' : '♡'}
      </button>

      {/* Product Image */}
      <img
        style={styles.image}
        src={product.thumbnail}
        alt={product.title}
        onError={e => {
          e.target.style.display = 'none'
        }}
      />

      {/* Card Body */}
      <div style={styles.body}>
        <div style={styles.brand}>
          {product.brand}
        </div>
        <div style={styles.title}>
          {product.title}
        </div>
        <div style={styles.desc}>
          {product.description}
        </div>

        {/* Rating */}
        <div style={styles.starsRow}>
          <div className="stars">
            
          <StarRating rating={product.rating} />
       </div>
        
        </div>

        {/* Tags */}
        <div style={styles.tags}>
          {product.tags.map(t =>
            <span key={t} style={styles.tag}>
              {t}
            </span>
          )}
        </div>

        {/* Footer: Price + Cart */}
        <div style={styles.footer}>
          <div>
            <span style={styles.priceOriginal}>
              ${product.price.toFixed(2)}
            </span>
            <span style={styles.priceFinal}>
              ${finalPrice}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 6
            }}
          >
            <div>
              <span style={styles.stockDot} />
              <span style={styles.stockText}>
                {product.stock} left
              </span>
            </div>
   <Link to={`/products/${product.id}`}>
              view  details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Toast ───────────────────────────────────────────────────
function Toast ({ message }) {
  if (!message) return null
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#1C1C1E',
        color: '#fff',
        padding: '11px 22px',
        borderRadius: 30,
        fontSize: '0.82rem',
        fontFamily: "'DM Sans', sans-serif",
        zIndex: 999,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}
    >
      {message}
    </div>
  )
}
