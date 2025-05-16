'use client'
import { FC } from 'react'
import React from 'react'

interface StartSprintButtonProps {
  onClick: (e: React.MouseEvent) => void
}

const StartSprintButton: FC<StartSprintButtonProps> = ({ onClick }) => {
  return (
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l11-7L5 5z" />
      </svg>
      Start Sprint
    </button>
  )
}

export default StartSprintButton
