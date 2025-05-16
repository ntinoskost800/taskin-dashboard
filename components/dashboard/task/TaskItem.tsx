import { IFlag } from '@/components/Icons/Icons'
import { ITask, ITaskStatus } from '@/interfaces'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Checkbox, Label } from 'keep-react'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const statusOptions = ['TO DO', 'IN PROGRESS', 'DONE']

const TaskItem = ({ task, isLast }: { task: ITask; isLast?: boolean }) => {
  const [status, setStatus] = useState(task.status)
  const [open, setOpen] = useState(false)

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

  return (
    <div
      className={clsx(
        'grid grid-cols-[minmax(0,3.5fr)_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-5 px-5 py-4',
        !isLast && 'border-b border-metal-100 dark:border-metal-700',
      )}>
      {' '}
      <div className="flex items-center gap-2.5 overflow-hidden">
        <Checkbox className="shrink-0 border-metal-200 dark:border-metal-500" id={task.id.toString()} />
        <Label
          htmlFor={task.id.toString()}
          className="flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-body-4 font-medium text-metal-900 dark:text-white">
          <Image src={task.icon} alt="briefcase" height={14} width={14} className="shrink-0" />
          <span className="truncate">{task.title}</span>
        </Label>
      </div>
      <div className="laptop:w-[215px]">
        <button className="flex items-center rounded-full border border-metal-200 px-2.5 py-0.5 text-body-5 font-medium text-metal-600 dark:border-metal-700 dark:bg-[#d9e9ff12] dark:text-metal-300">
          <Image src="/images/logo/figma.svg" height={14} width={14} alt="figma" />
          <span className="line-clamp-1">{task.project}</span>
        </button>
      </div>
      <div className="laptop:w-[115px]">
        <Badge variant="border" className="gap-1">
          <IFlag height={16} width={16} weight="fill" />
          {task.priority}
        </Badge>
      </div>
      {/* Status dropdown*/}
      <div className="relative laptop:min-w-[70px] laptop:max-w-[120px]">
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            'flex items-center justify-between rounded-full border px-2 py-0.5 text-body-5 font-medium laptop:min-w-[70px] laptop:max-w-[120px]',
            getStatusStyle(status),
          )}>
          {status}
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        {open && (
          <ul className="absolute z-20 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-metal-800">
            {statusOptions.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setStatus(option as ITaskStatus)
                  setOpen(false)
                }}
                className={clsx('cursor-pointer px-3 py-1 text-sm', getStatusStyle(option))}>
                {' '}
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="relative z-10 laptop:w-[120px]">
        <AvatarGroup className="*:ring-white dark:*:ring-metal-800">
          {task.team.map((member: { id: number; img: string; name: string }) => (
            <Avatar key={member.id} className="size-6">
              <AvatarImage src={member.img} />
              <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  )
}

export default TaskItem
