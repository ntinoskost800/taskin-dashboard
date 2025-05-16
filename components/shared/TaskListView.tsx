'use client'
import { v4 as uuidv4 } from 'uuid'

import { ICaretUp } from '@/components/Icons/Icons'
import { ITask } from '@/interfaces'
import { Accordion, AccordionAction, AccordionContent, AccordionIcon, AccordionItem, Badge } from 'keep-react'
import Image from 'next/image'
import TaskItem from '../dashboard/task/TaskItem'
import { useState } from 'react'
import { CreateSprintModal } from '../dashboard/task/Modals/CreateSprintModal'
import React from 'react'
import StartSprintButton from '../dashboard/task/components/StartSprintButton'
import CompleteSprintButton from '../dashboard/task/components/CompleteSprintButton'
import { useRouter } from 'next/router'

const taskList: ITask[] = [
  {
    id: uuidv4(),
    icon: '/images/emoji/briefcase.svg',
    title: 'Create Wireframes - User Profile Page',
    project: 'Figma Design System',
    status: 'TO DO',
    priority: 'High',
    team: [
      { id: 1, img: '/images/avatar/avatar-1.png', name: 'ABC' },
      { id: 2, img: '/images/avatar/avatar-2.png', name: 'DFA 2' },
      { id: 3, img: '/images/avatar/avatar-3.png', name: 'EFG 3' },
      { id: 4, img: '/images/avatar/avatar-4.png', name: 'MGJ 3' },
      { id: 5, img: '/images/avatar/avatar-5.png', name: 'MGJ 3' },
    ],
  },
  {
    id: uuidv4(),
    icon: '/images/emoji/artist-palette.svg',
    title: 'Update Color Palette - Brand Refresh',
    project: 'Figma Design System',
    status: 'IN PROGRESS',
    priority: 'Medium',
    team: [
      { id: 1, img: '/images/avatar/avatar-1.png', name: 'ABC' },
      { id: 2, img: '/images/avatar/avatar-2.png', name: 'DFA 2' },
      { id: 3, img: '/images/avatar/avatar-3.png', name: 'EFG 3' },
      { id: 4, img: '/images/avatar/avatar-4.png', name: 'MGJ 3' },
      { id: 5, img: '/images/avatar/avatar-5.png', name: 'MGJ 3' },
    ],
  },
  {
    id: uuidv4(),
    icon: '/images/emoji/waning-crescent-moon.svg',
    title: 'Implement Dark Mode - Mobile Application',
    project: 'Figma Design',
    status: 'DONE',

    priority: 'Medium',
    team: [
      { id: 1, img: '/images/avatar/avatar-1.png', name: 'ABC' },
      { id: 2, img: '/images/avatar/avatar-2.png', name: 'DFA 2' },
      { id: 3, img: '/images/avatar/avatar-3.png', name: 'EFG 3' },
      { id: 4, img: '/images/avatar/avatar-4.png', name: 'MGJ 3' },
      { id: 5, img: '/images/avatar/avatar-5.png', name: 'MGJ 3' },
    ],
  },
]
const TaskListView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(true)
  const [isCompleteButtonClicked, setIsCompleteButtonClicked] = useState(false)

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleClickStartButton = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsStartButtonClicked(false)
    setIsCompleteButtonClicked(true)
  }
  const handleClickCompleteButton = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCompleteButtonClicked(false)
    setIsStartButtonClicked(true)
  }
  return (
    <>
      <div className="grid hidden grid-cols-[minmax(0,3.5fr)_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-start px-6 py-2.5 text-left text-body-5 font-medium text-metal-600 md:grid dark:text-metal-300">
        <p>Task</p>
        <p>Project</p>
        <p>Priority</p>
        <p>Status</p>
        <p>Team</p>
      </div>
      <div id="scroll-bar" className="mx-4 h-screen space-y-5 overflow-auto py-5 md:py-0 xl:h-[calc(100vh-220px)]">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="rounded-xl bg-white dark:border dark:border-metal-800 dark:bg-metal-900">
          <AccordionItem
            value="item-1"
            className="border-metal-50 hover:bg-white data-[state=open]:bg-white dark:border-metal-800/50">
            <AccordionAction className="transition-transform duration-200 [&[data-state=open]>div>button>svg]:rotate-180">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Image src="/images/emoji/exploding-head.svg" alt="exploding-head" width={24} height={24} />
                  <p className="whitespace-nowrap">Sprint 1</p>
                  <Badge color="secondary" variant="base">
                    3
                  </Badge>
                </div>

                <div className="flex items-center justify-end gap-3">
                  {/* HIDE BUTTONS IN Tasks page */}
                  {isStartButtonClicked ? <StartSprintButton onClick={handleClickStartButton} /> : null}
                  {isCompleteButtonClicked ? <CompleteSprintButton onClick={handleClickCompleteButton} /> : null}
                  {/* HIDE BUTTONS IN Tasks page */}

                  <button
                    onClick={handleOpenModal}
                    className="flex items-center justify-center rounded-full p-2 text-metal-600 hover:bg-gray-100 dark:hover:bg-metal-800"
                    aria-label="Open sprint menu">
                    <span className="text-xl leading-none">⋯</span>
                  </button>
                  <AccordionIcon>
                    <ICaretUp className="size-4 transition-transform duration-200" />
                  </AccordionIcon>
                </div>
              </div>
            </AccordionAction>

            <AccordionContent>
              {[...taskList].map((task: ITask, index) => (
                <TaskItem key={task.id} task={task} isLast={index === taskList.length - 1} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <CreateSprintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  )
}

export default TaskListView
