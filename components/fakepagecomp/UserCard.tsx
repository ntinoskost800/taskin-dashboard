import React from 'react'

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

interface UserCardProps {
  user: User
  fetchUserDetails: (id: number) => void
  loadingDetails: boolean
  showDetails: boolean
}

const UserCard: React.FC<UserCardProps> = ({ user, fetchUserDetails, loadingDetails, showDetails }) => {
  return (
    <div className="cursor-pointer rounded border bg-white p-4 shadow">
      <img
        src={user.avatar}
        alt={user.name}
        className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
        onClick={() => fetchUserDetails(user.id)}
      />
      <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
      <p className="text-sm text-gray-500">{user.email}</p>
      {showDetails && (
        <div className="mt-4 border-t pt-4">
          {loadingDetails ? (
            <p className="text-sm text-gray-500">Loading details...</p>
          ) : (
            <p className="text-sm text-gray-600">Details Loaded</p>
          )}
        </div>
      )}
    </div>
  )
}

export default UserCard
