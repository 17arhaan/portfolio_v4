"use client"

import { useState, useEffect, useRef } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailContainerRef = useRef<HTMLDivElement>(null)
  const trailPointsRef = useRef<HTMLDivElement[]>([])
  const lastPositionRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef<number>()

  // Initialize trail points
  useEffect(() => {
    // Create trail points
    const maxTrailPoints = 5
    const trailContainer = trailContainerRef.current

    if (trailContainer) {
      // Clear any existing trail points
      trailContainer.innerHTML = ""
      trailPointsRef.current = []

      // Create new trail points
      for (let i = 0; i < maxTrailPoints; i++) {
        const point = document.createElement("div")
        point.className = "absolute rounded-full bg-white pointer-events-none"
        point.style.width = "3px"
        point.style.height = "3px"
        point.style.opacity = "0"
        point.style.transform = "translate(-50%, -50%)"
        trailContainer.appendChild(point)
        trailPointsRef.current.push(point)
      }
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Show cursor after a short delay to prevent initial animation from wrong position
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    const updateMousePosition = (e: MouseEvent) => {
      // Direct DOM manipulation for better performance
      if (cursorRef.current) {
        const size = isPointer ? 10 : 8
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${isClicking ? 0.8 : 1})`
        cursorRef.current.style.width = `${size}px`
        cursorRef.current.style.height = `${size}px`
      }

      // Update trail
      const distance = Math.hypot(e.clientX - lastPositionRef.current.x, e.clientY - lastPositionRef.current.y)

      // Only add new trail point if moved enough
      if (distance > 8) {
        // Shift all positions
        for (let i = trailPointsRef.current.length - 1; i > 0; i--) {
          const prevPoint = trailPointsRef.current[i - 1]
          const currentPoint = trailPointsRef.current[i]

          if (prevPoint && currentPoint) {
            currentPoint.style.left = prevPoint.style.left
            currentPoint.style.top = prevPoint.style.top
            currentPoint.style.opacity = (Number.parseFloat(prevPoint.style.opacity) * 0.7).toString()
          }
        }

        // Add new position at the beginning
        if (trailPointsRef.current[0]) {
          trailPointsRef.current[0].style.left = `${e.clientX}px`
          trailPointsRef.current[0].style.top = `${e.clientY}px`
          trailPointsRef.current[0].style.opacity = "0.4"
        }

        lastPositionRef.current = { x: e.clientX, y: e.clientY }
      }

      // Only update state when needed for other components
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement
      if (target) {
        // Check if the element or its parents are interactive
        const isInteractive =
          target.matches(
            'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), .cursor-pointer',
          ) || !!target.closest('a, button, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer')

        setIsPointer(isInteractive)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Throttle mousemove for cursor type check (less frequent)
    let lastMoveTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e)

      const now = performance.now()
      if (now - lastMoveTime > 100) {
        // Only check cursor type every 100ms
        updateCursorType(e)
        lastMoveTime = now
      }
    }

    // Animation loop for smooth trail fading
    const animate = () => {
      // Gradually fade out trail points
      trailPointsRef.current.forEach((point) => {
        if (point) {
          const currentOpacity = Number.parseFloat(point.style.opacity || "0")
          point.style.opacity = (currentOpacity * 0.98).toString()
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      clearTimeout(timer)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isPointer, isClicking])

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = "none"

    // Add cursor styles to all interactive elements
    const addCursorStyles = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"]), .cursor-pointer',
      )
      interactiveElements.forEach((el) => {
        ;(el as HTMLElement).style.cursor = "none"
      })

      // Add to all elements to ensure consistency
      document.querySelectorAll("*").forEach((el) => {
        ;(el as HTMLElement).style.cursor = "none"
      })

      // Special handling for input fields
      document.querySelectorAll("input, textarea").forEach((el) => {
        ;(el as HTMLElement).style.cursor = "text"
      })
    }

    // Run once and then observe DOM changes
    addCursorStyles()

    const observer = new MutationObserver(addCursorStyles)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = ""
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9999] transition-[width,height] duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isPointer ? "10px" : "8px",
          height: isPointer ? "10px" : "8px",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${isClicking ? 0.8 : 1})`,
        }}
      />

      {/* Trail container */}
      <div ref={trailContainerRef} className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden" />
    </>
  )
}
