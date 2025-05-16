import { IFlag } from '@/components/Icons/Icons'
import { ITask, ITaskStatus } from '@/interfaces'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Checkbox, Label } from 'keep-react'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import TaskStatusSelect from './components/TaskStatusSelect'

const TaskItem = ({ task, isLast }: { task: ITask; isLast?: boolean }) => {
  const [status, setStatus] = useState(task.status)

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
      <TaskStatusSelect status={status} onChange={(newStatus) => setStatus(newStatus)} />
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
