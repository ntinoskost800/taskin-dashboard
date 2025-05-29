import React from 'react'
import UserCard from './UserCard' // Import updated component

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
}

interface UserListProps {
  users: User[]
  fetchUserDetails: (id: number) => void
  detailedUserIds: number[]
  loadingDetails: { [key: number]: boolean }
}

const UserList: React.FC<UserListProps> = ({ users, fetchUserDetails, detailedUserIds, loadingDetails }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          fetchUserDetails={fetchUserDetails}
          loadingDetails={loadingDetails[user.id] || false}
          showDetails={detailedUserIds.includes(user.id)}
        />
      ))}
    </div>
  )
}

export default UserList
