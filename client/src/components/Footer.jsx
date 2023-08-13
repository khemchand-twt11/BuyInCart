import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div>
      <p className='text-center'>BuyInCart &copy; {year} </p>
    </div>
  )
}
