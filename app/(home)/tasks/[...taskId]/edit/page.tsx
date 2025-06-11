'use client'

import {IDownloadSimple } from '@/components/Icons/Icons'
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

import { Upload, ChevronDown, ArrowLeft, Trash2 } from 'lucide-react'
import React, { FC, useState, useRef, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface ExistingFile {
  id: string
  name: string
  size: number
  url: string
}

const EditTaskPage: FC = () => {
  const router = useRouter()
  const params = useParams()
  const taskId = params?.taskId as string

  // Pre-populated with existing task data (in real app, this would come from API/database)
  const [title, setTitle] = useState('Create Wireframes - User Profile Page')
  const [description, setDescription] = useState(
    `This foundational phase focuses on outlining the key components and functionalities that the profile page will encompass, such as the user's personal information, profile picture, activity feed, settings, and interactive elements like buttons and navigation links. The wireframes serve as a blueprint, providing a clear visual guide for the design and development teams to understand the spatial arrangement and user flow. It ensures that all essential elements are included and optimally positioned before advancing to the more detailed design stages, thereby facilitating a user-centric and functional profile page. The wireframes will be iteratively reviewed and refined based on feedback to align with user needs and project goals.`,
  )

  const [newAttachments, setNewAttachments] = useState<File[]>([])
  const [existingAttachments, setExistingAttachments] = useState<ExistingFile[]>([
    { id: '1', name: 'Connecting your tech.pdf', size: 4.3 * 1024 * 1024, url: '/files/tech.pdf' },
    { id: '2', name: 'Wireframe_draft_v1.pdf', size: 2.1 * 1024 * 1024, url: '/files/wireframe.pdf' },
    { id: '3', name: 'User_research_data.pdf', size: 3.7 * 1024 * 1024, url: '/files/research.pdf' },
    { id: '4', name: 'Design_specifications.pdf', size: 1.8 * 1024 * 1024, url: '/files/specs.pdf' },
  ])

  const [assignee, setAssignee] = useState<string>('1') // Pre-selected assignee
  const [priority, setPriority] = useState<string>('High') // Pre-selected priority

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setNewAttachments([...newAttachments, ...files])
  }

  const removeNewFile = (index: number) => {
    setNewAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingFile = (fileId: string) => {
    setExistingAttachments((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleSave = () => {
    console.log('Task updated:', {
      taskId,
      title,
      description,
      newAttachments,
      existingAttachments,
      assignee,
      priority,
    })
    router.push(`/tasks/${taskId}`) // Navigate back to task detail page
  }

  const handleCancel = () => {
    router.back() // Go back to previous page
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      console.log('Task deleted:', taskId)
      router.push('/tasks') // Navigate to tasks list
    }
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
            <h1 className="text-heading-5 font-semibold text-metal-900 dark:text-white">Edit Task</h1>
          </div>
          <div className="flex items-center gap-x-3">
            <button
              className="rounded-lg border border-error-300 bg-white px-6 py-2.5 text-body-3 font-medium text-error-600 hover:bg-error-50 dark:border-error-600 dark:bg-metal-800 dark:text-error-400 dark:hover:bg-error-400/10"
              onClick={handleDelete}>
              <Trash2 className="mr-2 size-4" />
              Delete
            </button>
            <button
              className="rounded-lg border border-metal-300 bg-white px-6 py-2.5 text-body-3 font-medium text-metal-700 hover:bg-metal-50 dark:border-metal-600 dark:bg-metal-800 dark:text-metal-200 dark:hover:bg-metal-700"
              onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="rounded-lg bg-primary-500 px-6 py-2.5 text-body-3 font-medium text-white hover:bg-primary-600"
              onClick={handleSave}>
              Save Changes
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
                    <BreadcrumbPage className="text-metal-400 dark:text-metal-300">Edit Task</BreadcrumbPage>
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
                          setAssignee('')
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
                    <div className="flex items-center gap-x-3">
                      {priority && (
                        <>
                          {priorityOptions.find((p) => p.name === priority)?.icon}
                          <span className="text-body-3 font-medium text-metal-900 dark:text-white">{priority}</span>
                        </>
                      )}
                      {!priority && (
                        <span className="text-body-3 text-metal-500 dark:text-metal-400">Select priority</span>
                      )}
                    </div>
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
                          className={`flex cursor-pointer items-center gap-x-3 rounded-md p-3 hover:bg-metal-50 dark:hover:bg-metal-700 ${
                            priority === name ? 'bg-metal-100 dark:bg-metal-600' : ''
                          }`}>
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
              <div className="rounded-lg border border-metal-300 bg-white px-4 py-3 dark:border-metal-600 dark:bg-metal-800">
                <textarea
                  ref={textareaRef}
                  value={description}
                  onChange={handleDescriptionChange}
                  className="min-h-[120px] w-full resize-none border-none bg-transparent text-metal-900 placeholder-metal-400 outline-none dark:text-white"
                  placeholder="Describe the task in detail..."
                  rows={1}
                />
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-6 rounded-xl border border-metal-100 bg-white p-6 lg:p-8 dark:border-metal-800 dark:bg-metal-900">
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Attachments</h2>

            <div className="space-y-4">
              {/* Existing Files */}
              {existingAttachments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-body-3 font-medium text-metal-900 dark:text-white">Current Files</h3>
                  <div className="space-y-2">
                    {existingAttachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg border border-metal-200 px-4 py-3 dark:border-metal-700">
                        <div className="flex items-center gap-x-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                            <IDownloadSimple className="size-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-body-3 font-medium text-metal-900 dark:text-white">{file.name}</p>
                            <p className="text-body-5 text-metal-500 dark:text-metal-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md px-3 py-1 text-body-4 font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-400/10">
                            Download
                          </a>
                          <button
                            className="rounded-md px-3 py-1 text-body-4 font-medium text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-400/10"
                            onClick={() => removeExistingFile(file.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Files */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-metal-300 p-8 hover:bg-metal-50 dark:border-metal-600 dark:hover:bg-metal-800">
                  <Upload className="size-12 text-metal-400 dark:text-metal-500" />
                  <div className="mt-4 text-center">
                    <p className="text-body-2 font-medium text-metal-900 dark:text-white">Click to upload files</p>
                    <p className="text-body-4 text-metal-500 dark:text-metal-400">or drag and drop</p>
                    <p className="mt-1 text-body-5 text-metal-400 dark:text-metal-500">PDF, DOC, PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* New Files to Upload */}
              {newAttachments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-body-3 font-medium text-metal-900 dark:text-white">New Files to Upload</h3>
                  <div className="space-y-2">
                    {newAttachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-900/20">
                        <div className="flex items-center gap-x-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                            <Upload className="size-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-body-3 font-medium text-metal-900 dark:text-white">{file.name}</p>
                            <p className="text-body-5 text-metal-500 dark:text-metal-400">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • New
                            </p>
                          </div>
                        </div>
                        <button
                          className="rounded-md px-3 py-1 text-body-4 font-medium text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-400/10"
                          onClick={() => removeNewFile(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTaskPage
