'use client'

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

import { ChevronDown, ArrowLeft } from 'lucide-react'
// import Image from 'next/Image'
import React, { FC, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@/components/Editor'

const CreateTaskPage: FC = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
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

  // Auto-resize on mount and when description changes
  useEffect(() => {
    autoResize()
  }, [description])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    autoResize()
  }

  const handleSave = () => {
    console.log('Task saved:', { title, description, assignee, priority })
    router.push('/tasks') // Navigate back to tasks list or dashboard
  }

  const handleCancel = () => {
    router.back() // Go back to previous page
  }

  // Get selected assignee object
  const selectedAssignee = availableAssignees.find((a) => a.id === assignee)

  return (
    <div className="min-h-screen bg-metal-25 dark:bg-metal-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-metal-100 bg-white px-6 py-4 lg:px-8 dark:border-metal-800 dark:bg-metal-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <button
              onClick={handleCancel}
              className="flex items-center gap-x-2 rounded-lg px-3 py-2 text-metal-600 hover:bg-metal-100 dark:text-metal-300 dark:hover:bg-metal-800">
              <ArrowLeft className="size-5" />
              <span className="text-body-3 font-medium">Back</span>
            </button>
            <div className="h-6 w-px bg-metal-200 dark:bg-metal-700" />
            <h1 className="text-heading-5 font-semibold text-metal-900 dark:text-white">Create New Task</h1>
          </div>
          <div className="flex items-center gap-x-3">
            <button
              className="rounded-lg border border-metal-300 bg-white px-6 py-2.5 text-body-3 font-medium text-metal-700 hover:bg-metal-50 dark:border-metal-600 dark:bg-metal-800 dark:text-metal-200 dark:hover:bg-metal-700"
              onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="rounded-lg bg-primary-500 px-6 py-2.5 text-body-3 font-medium text-white hover:bg-primary-600"
              onClick={handleSave}>
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <div className="space-y-8">
          {/* Task Header Section */}
          <div className="space-y-6 rounded-xl border border-metal-100 bg-white p-6 lg:p-8 dark:border-metal-800 dark:bg-metal-900">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-body-3 font-medium text-metal-900 dark:text-white">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-metal-300 bg-white px-4 py-3 text-heading-6 font-medium text-metal-900 placeholder-metal-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-metal-600 dark:bg-metal-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400/20"
                  placeholder="Enter task title..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-body-3 font-medium text-metal-900 dark:text-white">Project</label>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/public" className="flex items-center text-metal-400 dark:text-metal-300">
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

          {/* Task Details Section */}
          <div className="space-y-6 rounded-xl border border-metal-100 bg-white p-6 lg:p-8 dark:border-metal-800 dark:bg-metal-900">
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Task Details</h2>

            {/* Assignee and Priority Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Assignee Section */}
              <div className="space-y-2">
                <label className="text-body-3 font-medium text-metal-900 dark:text-white">Assignee</label>
                <div className="relative">
                  <button
                    onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                    className="flex w-full items-center justify-between gap-x-2 rounded-lg border border-metal-300 px-4 py-3 text-left hover:bg-metal-50 dark:border-metal-600 dark:bg-metal-800 dark:text-white dark:hover:bg-metal-700">
                    <div className="flex items-center gap-x-3">
                      {selectedAssignee ? (
                        <>
                          <Avatar className="size-8">
                            <AvatarImage src={selectedAssignee.avatar} alt={selectedAssignee.name} />
                            <AvatarFallback>{selectedAssignee.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="truncate text-body-3 font-medium">{selectedAssignee.name}</span>
                        </>
                      ) : (
                        <>
                          <Avatar className="size-8 border-2 border-dashed border-metal-300 dark:border-metal-600">
                            <AvatarFallback className="bg-transparent text-metal-400 dark:text-metal-500">
                              ?
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-body-3 text-metal-500 dark:text-metal-400">Select assignee</span>
                        </>
                      )}
                    </div>
                    <ChevronDown className="size-5 text-metal-500" />
                  </button>
                  {showAssigneeDropdown && (
                    <div className="absolute z-20 mt-2 w-full rounded-lg border border-metal-200 bg-white p-2 shadow-lg dark:border-metal-700 dark:bg-metal-800">
                      <div
                        className="flex cursor-pointer items-center gap-x-3 rounded-md p-3 text-metal-500 hover:bg-metal-50 dark:text-metal-400 dark:hover:bg-metal-700"
                        onClick={() => {
                          setAssignee(null)
                          setShowAssigneeDropdown(false)
                        }}>
                        <Avatar className="size-8 border-2 border-dashed border-metal-300 dark:border-metal-600">
                          <AvatarFallback className="bg-transparent text-metal-400 dark:text-metal-500">
                            ?
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-body-3">Unassigned</span>
                      </div>
                      {availableAssignees.map(({ id, name, avatar }) => (
                        <div
                          key={id}
                          className={`flex cursor-pointer items-center gap-x-3 rounded-md p-3 hover:bg-metal-50 dark:hover:bg-metal-700 ${
                            assignee === id ? 'bg-metal-100 dark:bg-metal-600' : ''
                          }`}
                          onClick={() => {
                            setAssignee(id)
                            setShowAssigneeDropdown(false)
                          }}>
                          <Avatar className="size-8">
                            <AvatarImage src={avatar} alt={name} />
                            <AvatarFallback>{name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="truncate text-body-3">{name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Priority Section */}
              <div className="space-y-2">
                <label className="text-body-3 font-medium text-metal-900 dark:text-white">Priority</label>
                <div className="relative">
                  <button
                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                    className="flex w-full items-center justify-between rounded-lg border border-metal-300 bg-white px-4 py-3 hover:bg-metal-50 dark:border-metal-600 dark:bg-metal-800 dark:hover:bg-metal-700">
                    <span
                      className={`text-body-3 font-medium ${priority ? 'text-metal-900 dark:text-white' : 'text-metal-500 dark:text-metal-400'}`}>
                      {priority ? priority : 'Select priority'}
                    </span>
                    <ChevronDown className="size-5 text-metal-500" />
                  </button>
                  {showPriorityDropdown && (
                    <div className="absolute z-20 mt-2 w-full rounded-lg border border-metal-200 bg-white p-2 shadow-lg dark:border-metal-700 dark:bg-metal-800">
                      {priorityOptions.map(({ id, name, icon }) => (
                        <div
                          key={id}
                          onClick={() => {
                            setPriority(name)
                            setShowPriorityDropdown(false)
                          }}
                          className="flex cursor-pointer items-center gap-x-3 rounded-md p-3 hover:bg-metal-50 dark:hover:bg-metal-700">
                          {icon}
                          <span className="text-body-3 font-medium text-metal-900 dark:text-white">{name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-body-3 font-medium text-metal-900 dark:text-white">Description</label>

              <Editor />

              {/* <textarea
                  ref={textareaRef}
                  value={description}
                  onChange={handleDescriptionChange}
                  className="min-h-[120px] w-full resize-none border-none bg-transparent text-metal-900 placeholder-metal-400 outline-none dark:text-white"
                  placeholder="Describe the task in detail..."
                  rows={1}
                /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskPage
