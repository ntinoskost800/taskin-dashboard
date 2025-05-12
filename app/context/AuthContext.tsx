'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (isValidToken(storedToken)) {
      setToken(storedToken)
    } else {
      setToken(null)
    }
    setLoading(false)
  }, [])
  const isValidToken = (token: string | null) => token === 'yourFakeToken'

  //AuthContext always reflects the latest token, even across internal navigation
  useEffect(() => {
    const syncAuth = () => {
      const storedToken = localStorage.getItem('accessToken')
      if (isValidToken(storedToken)) {
        setToken(storedToken)
      } else {
        setToken(null)
      }
    }

    // Run initially
    syncAuth()

    // Listen for storage changes (other tabs or devtools)
    window.addEventListener('storage', syncAuth)

    return () => {
      window.removeEventListener('storage', syncAuth)
    }
  }, [])

  const login = (newToken: string) => {
    if (isValidToken(newToken)) {
      localStorage.setItem('accessToken', newToken)
      setToken(newToken)
    } else {
      setToken(null)
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isValidToken(token),
        token,
        login,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
