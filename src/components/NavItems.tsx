'use client'
import { PRODUCT_CATEGORIES } from '@/config'
import React, { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
  //state for active nav item
  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  const isAnyOpen = activeIndex !== null

  //useeffect to close navbar on Escape key press
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }
    document.addEventListener('keydown', handler)

    //CLEANUP
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  //custom ref to close nav when clicking outside
  const navRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null)
          } else {
            setActiveIndex(i)
          }
        }
        const isOpen = i === activeIndex

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems
