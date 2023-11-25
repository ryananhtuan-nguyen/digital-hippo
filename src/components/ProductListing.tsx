'use client'
import React, { useState } from 'react'

import { Product } from '@/payload-types'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl"></div>
    </div>
  )
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  if (!product || !isVisible) return <ProductPlaceholder />

  return <div>ProductListing</div>
}

export default ProductListing
