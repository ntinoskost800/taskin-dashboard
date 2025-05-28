'use client'

import React, { useEffect, useState } from 'react'

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Users</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="cursor-pointer rounded border bg-white p-4 shadow">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                  onClick={() => fetchUserDetails(user.id)}
                />
                <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                {detailedUserIds.includes(user.id) && (
                  <div className="mt-4 border-t pt-4">
                    {loadingDetails[user.id] ? (
                      <p className="text-sm text-gray-500">Loading details...</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">
                          <strong>Role: </strong> {user.role || 'N/A'}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`rounded bg-gray-200 px-4 py-2 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
              }`}>
              Previous
            </button>
            <p className="px-4 py-2 text-center">
              Page {currentPage} of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`rounded bg-gray-200 px-4 py-2 ${
                currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
              }`}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
