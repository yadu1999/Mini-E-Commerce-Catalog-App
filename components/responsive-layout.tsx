"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  mobileBreakpoint?: number
  tabletBreakpoint?: number
}

export default function ResponsiveLayout({
  children,
  mobileBreakpoint = 768,
  tabletBreakpoint = 1024,
}: ResponsiveLayoutProps) {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < mobileBreakpoint) {
        setScreenSize("mobile")
      } else if (width < tabletBreakpoint) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileBreakpoint, tabletBreakpoint])

  return <div className={`responsive-layout ${screenSize}`}>{children}</div>
}
