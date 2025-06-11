'use client'

import { IArrowsOutSimple, IconX } from '@/components/Icons/Icons'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from 'keep-react'

import { Upload, ChevronDown } from 'lucide-react'
// import Image from 'next/Image'
import Link from 'next/link'
import React, { FC, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Add this import

interface CreateTaskProps {
  onOpenChange: (open: boolean) => void
}

const CreateTask: FC<CreateTaskProps> = ({ onOpenChange }) => {
  const router = useRouter() // Add this line
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [assignee, setAssignee] = useState<string | null>(null)
  const [priority, setPriority] = useState<string | null>(null)

  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const availableAssignees = [
    { id: '1', name: 'John Doe', avatar: '/images/avatar/avatar-1.png' },
    { id: '2', name: 'Jane Smith', avatar: '/images/avatar/avatar-2.png' },
    { id: '3', name: 'Mike Johnson', avatar: '/images/avatar/avatar-3.png' },
  ]

  const priorityOptions = [
    { id: 'low', name: 'Low', icon: <span className="text-green-500">⬤</span> },
    { id: 'medium', name: 'Medium', icon: <span className="text-yellow-500">⬤</span> },
    { id: 'high', name: 'High', icon: <span className="text-red-500">⬤</span> },
  ]

  // Auto-resize textarea function
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    autoResize()
  }, [description])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    autoResize()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments([...attachments, ...files])
  }

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    console.log('Task saved:', { title, description, attachments, assignee, priority })
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const handleExpandToFullscreen = () => {
    onOpenChange(false)

    router.push('/tasks/create')
  }

  const selectedAssignee = availableAssignees.find((a) => a.id === assignee)

  return (
    <div className="relative">
      {/* Header Actions */}
      <div className="absolute right-3 top-3 flex items-center gap-x-2 lg:right-5 lg:top-5">
        <button className="p-2" onClick={handleExpandToFullscreen}>
          <IArrowsOutSimple className="size-4 text-metal-600 lg:size-5 dark:text-metal-300" />
        </button>
        <button className="p-2" onClick={() => onOpenChange(false)}>
          <IconX className="size-4 text-metal-600 lg:size-5 dark:text-metal-300" />
        </button>
      </div>

      {/* Task Header */}
      <div className="!mb-8 space-y-3">
        <div className="flex items-start justify-start gap-x-3">
          <div className="space-y-1.5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-none bg-transparent text-body-2 font-medium text-metal-900 placeholder-metal-400 outline-none lg:text-heading-6 dark:text-white"
              placeholder="Enter task title..."
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center text-metal-400 dark:text-metal-300">
                    <div className="flex size-5 items-center justify-center rounded-full bg-[#F5F8FF] dark:bg-[#460683]">
                      {/*<Image src="/images/logo/figma.svg" alt="figma" height={13} width={13} />*/}
                    </div>
                    Figma Design System
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbDivider />
                <BreadcrumbPage className="text-metal-400 dark:text-metal-300">New Task</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Task Details */}
      <div className="space-y-4">
        {/* Assignees and Priority Section - Side by Side */}
        <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:gap-x-24 sm:gap-y-0 lg:items-center">
          {/* Assignee Section */}
          <div className="flex items-center gap-x-4">
            <p className="text-body-3 font-medium text-metal-900 dark:text-white">Assignee</p>
            <div className="relative w-48">
              <button
                onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                className="flex w-full items-center justify-between gap-x-2 rounded-md border border-metal-300 px-3 py-2 text-left hover:bg-metal-100 dark:border-metal-700 dark:text-white dark:hover:bg-metal-700">
                <div className="flex items-center gap-x-2">
                  {selectedAssignee ? (
                    <>
                      <Avatar className="size-6">
                        <AvatarImage src={selectedAssignee.avatar} alt={selectedAssignee.name} />
                        <AvatarFallback>{selectedAssignee.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{selectedAssignee.name}</span>
                    </>
                  ) : (
                    <>
                      <Avatar className="size-6 border-2 border-dashed border-metal-300 dark:border-metal-600">
                        <AvatarFallback className="bg-transparent text-metal-400 dark:text-metal-500">?</AvatarFallback>
                      </Avatar>
                      <span className="text-metal-500 dark:text-metal-400">Unassigned</span>
                    </>
                  )}
                </div>
                <ChevronDown className="size-4 text-metal-500" />
              </button>
              {showAssigneeDropdown && (
                <div className="absolute z-10 mt-2 w-full rounded-md border bg-white p-1 shadow-lg dark:border-metal-700 dark:bg-metal-800">
                  <div
                    className="flex cursor-pointer items-center gap-x-2 rounded p-2 text-metal-500 hover:bg-metal-50 dark:text-metal-400 dark:hover:bg-metal-700"
                    onClick={() => {
                      setAssignee(null)
                      setShowAssigneeDropdown(false)
                    }}>
                    <Avatar className="size-6 border-2 border-dashed border-metal-300 dark:border-metal-600">
                      <AvatarFallback className="bg-transparent text-metal-400 dark:text-metal-500">?</AvatarFallback>
                    </Avatar>
                    <span>Unassigned</span>
                  </div>
                  {availableAssignees.map(({ id, name, avatar }) => (
                    <div
                      key={id}
                      className={`flex cursor-pointer items-center gap-x-2 rounded p-2 hover:bg-metal-50 dark:hover:bg-metal-700 ${
                        assignee === id ? 'bg-metal-100 dark:bg-metal-600' : ''
                      }`}
                      onClick={() => {
                        setAssignee(id)
                        setShowAssigneeDropdown(false)
                      }}>
                      <Avatar className="size-6">
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Priority Section */}
          <div className="flex items-center gap-x-4">
            <p className="text-body-3 font-medium text-metal-900 dark:text-white">Priority</p>
            <div className="relative">
              <div
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                className="w-32 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 shadow dark:border-metal-700 dark:bg-metal-800">
                <span className={priority ? 'text-metal-900 dark:text-white' : 'text-metal-500 dark:text-metal-400'}>
                  {priority ? priority : 'None'}
                </span>
              </div>
              {showPriorityDropdown && (
                <div className="absolute z-10 mt-2 w-32 rounded-lg border border-gray-300 bg-white shadow dark:border-metal-700 dark:bg-metal-800">
                  {priorityOptions.map(({ id, name, icon }) => (
                    <div
                      key={id}
                      onClick={() => {
                        setPriority(name)
                        setShowPriorityDropdown(false)
                      }}
                      className="flex cursor-pointer items-center whitespace-nowrap p-2 hover:bg-gray-200 dark:hover:bg-metal-700">
                      {icon}
                      <span className="ml-3 text-metal-900 dark:text-white">{name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="mb-2 text-body-3 font-medium text-metal-900 dark:text-white">Description</p>
          <textarea
            ref={textareaRef}
            value={description}
            onChange={handleDescriptionChange}
            className="min-h-[40px] w-full resize-none overflow-hidden border-none bg-transparent text-metal-900 placeholder-metal-400 outline-none dark:text-white"
            placeholder="Add a description..."
            rows={1}
          />
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="rounded-md bg-gray-200 px-6 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          onClick={handleCancel}>
          Cancel
        </button>
        <button className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateTask
