'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { ITaskStatus } from '@/interfaces'

const statusOptions: ITaskStatus[] = ['TO DO', 'IN PROGRESS', 'DONE']

interface TaskStatusSelectProps {
  status: ITaskStatus
  onChange: (newStatus: ITaskStatus) => void
}

const TaskStatusSelect = ({ status, onChange }: TaskStatusSelectProps) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'TO DO':
        return 'bg-gray-100 text-gray-700 border border-gray-300'
      case 'IN PROGRESS':
        return 'bg-blue-100 text-blue-700 border border-blue-300'
      case 'DONE':
        return 'bg-green-100 text-green-700 border border-green-300'
      default:
        return 'bg-metal-100 text-metal-600 border border-metal-300'
    }
  }

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="z-100 relative laptop:min-w-[70px] laptop:max-w-[120px]">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'flex items-center justify-between rounded-full border px-2 py-0.5 text-body-5 font-medium',
          getStatusStyle(status),
        )}>
        {status}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {open && (
        <ul
          className="fixed z-50 mt-1 w-[120px] rounded-lg border bg-white shadow-lg dark:bg-metal-800"
          style={{
            top: dropdownRef.current?.getBoundingClientRect().bottom,
            left: dropdownRef.current?.getBoundingClientRect().left,
          }}>
          {statusOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              className={clsx(
                'mx-1 my-1 cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-xs transition-colors duration-150',
                getStatusStyle(option),
                {
                  'hover:bg-gray-200': option === 'TO DO',
                  'hover:bg-blue-200': option === 'IN PROGRESS',
                  'hover:bg-green-200': option === 'DONE',
                },
              )}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskStatusSelect
