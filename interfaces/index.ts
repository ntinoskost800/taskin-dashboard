import { IconProps } from 'phosphor-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface USER_CATEGORY {
  id: number
  title: string
  description: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  active?: boolean
}

export interface ICONS {
  id: number
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}
export interface EMOJIS {
  id: number
  img: string
}

export interface TabActiveProps {
  activeTab: number | string
}

export interface TaskTabs {
  id: number
  title: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  href: string
}

export type ITaskStatus = 'To Do' | 'IN PROGRESS' | 'DONE'
export interface ITask {
  id: string
  icon: string
  title: string
  project: string
  priority: string
  status: ITaskStatus
  team: {
    id: number
    img: string
    name: string
  }[]
}
