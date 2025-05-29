'use client'

import React, { useEffect, useState } from 'react'
import CustomPagination from '@/components/fakepagecomp/CustomPagination'
import UserList from '@/components/fakepagecomp/UserList'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState<{ [key: number]: boolean }>({})
  const [detailedUserIds, setDetailedUserIds] = useState<number[]>([])
  const USERS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/users?offset=${(currentPage - 1) * USERS_PER_PAGE}&limit=${USERS_PER_PAGE}`,
        )
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage])

  const fetchUserDetails = async (id: number) => {
    if (detailedUserIds.includes(id)) {
      setDetailedUserIds(detailedUserIds.filter((userId) => userId !== id))
      return
    }

    setLoadingDetails((prev) => ({ ...prev, [id]: true }))
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
      const data = await response.json()
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...data } : user)))
      setDetailedUserIds([...detailedUserIds, id])
    } catch (error) {
      console.error('Error fetching user details:', error)
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Users</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <>
          <UserList
            users={users}
            fetchUserDetails={fetchUserDetails}
            detailedUserIds={detailedUserIds}
            loadingDetails={loadingDetails}
          />
          <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
