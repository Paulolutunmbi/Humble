import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CursorFollower() {
  const followerRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const follower = followerRef.current
    const dot = dotRef.current
    if (!follower || !dot) return

    // Check if touch device
    if ('ontouchstart' in window) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows immediately
      gsap.set(dot, { x: mouseX, y: mouseY })

      // Follower follows with slight delay
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out'
      })
    }

    const handleMouseEnter = () => {
      gsap.to([follower, dot], { opacity: 1, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to([follower, dot], { opacity: 0, duration: 0.3 })
    }

    // Scale up on interactive elements
    const addHover = () => follower.classList.add('hovering')
    const removeHover = () => follower.classList.remove('hovering')

    const attachListeners = () => {
      const elements = document.querySelectorAll('a, button, input, textarea, .glass-card')
      elements.forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Attach interactive listeners with delay to catch dynamically rendered elements
    attachListeners()
    const timer = setTimeout(attachListeners, 1000)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
      
      const elements = document.querySelectorAll('a, button, input, textarea, .glass-card')
      elements.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      <div ref={followerRef} className="cursor-follower" style={{ opacity: 0 }} />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
    </>
  )
}
