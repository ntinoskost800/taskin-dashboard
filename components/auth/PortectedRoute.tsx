'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import React from 'react'
import SplashScreen from '../SplashScreen'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        router.replace('/login')
      }, 300) // delay for now

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, loading, router])

  if (loading) return <SplashScreen />
  if (!isAuthenticated) return null

  return <>{children}</>
}

export default ProtectedRoute
