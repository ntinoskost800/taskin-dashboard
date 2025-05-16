'use client'
import React from 'react'
import { Accordion, AccordionAction, AccordionContent, AccordionIcon, AccordionItem, Badge } from 'keep-react'
import { ICaretUp } from '@/components/Icons/Icons'
import { ITask } from '@/interfaces'
import TaskItem from '../../task/TaskItem'
import { Fragment, useState } from 'react'
import { CreateSprintModal } from '../../task/Modals/CreateSprintModal'
// ITASK WILL BE CHANGED TO ISprints
const BacklogTaskItem = ({ sprints }: { sprints: ITask[] }) => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)

  const handleOpenCreationModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCreationModalOpen(true)
  }
  return (
    <Fragment>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-backlog"
        className="rounded-xl bg-white dark:border dark:border-metal-800 dark:bg-metal-900">
        <AccordionItem
          value="item-backlog"
          className="border-metal-50 hover:bg-white data-[state=open]:bg-white dark:border-metal-800/50">
          <AccordionAction className="transition-transform duration-200 [&[data-state=open]>div>button>svg]:rotate-180">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex items-center gap-2.5">
                <p className="whitespace-nowrap">Backlog</p>
                <Badge color="secondary" variant="base">
                  {sprints.length}
                </Badge>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleOpenCreationModal}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-5 py-0.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200">
                  <span className="mb-1 text-xl">＋</span>
                  Create Sprint
                </button>
                <ICaretUp />
              </div>
            </div>
          </AccordionAction>

          <AccordionContent>
            {[...sprints].map((sprint, index) => (
              // HERE MUST BE THE SprintItem INSTEAD OF TaskItem ?
              <TaskItem key={sprint.id} task={sprint} isLast={index === sprints.length - 1} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <CreateSprintModal isOpen={isCreationModalOpen} onClose={() => setIsCreationModalOpen(false)} />
    </Fragment>
  )
}

export default BacklogTaskItem
