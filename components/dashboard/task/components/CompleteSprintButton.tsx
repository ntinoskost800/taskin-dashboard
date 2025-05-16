'use client'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import React from 'react'
interface CompleteSprintButtonProps {
  onClick: (e: React.MouseEvent) => void
}

const CompleteSprintButton: FC<CompleteSprintButtonProps> = ({ onClick }) => {
  const pathname = usePathname()
  const isTaskPage = pathname?.includes('/tasks')
  return isTaskPage ? null : (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full bg-gray-100 px-5 py-0.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5z M9 12l2 2 4-4" />
      </svg>
      Complete Sprint
    </button>
  )
}

export default CompleteSprintButton
