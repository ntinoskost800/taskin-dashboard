import EmojiPicker from '@/components/EmojiPicker'
import Popper, { PopperProps } from '@mui/material/Popper'
import { FC, useMemo } from 'react'
import { EmojiPickerProps } from './types'
import { ClickAwayListener } from '@mui/material'
import { CategoriesConfig } from 'emoji-picker-react/dist/config/categoryConfig'

// TODO: these cause error with webpack so we define them here
enum Categories {
  SUGGESTED = 'suggested',
  CUSTOM = 'custom',
  SMILEYS_PEOPLE = 'smileys_people',
  ANIMALS_NATURE = 'animals_nature',
  FOOD_DRINK = 'food_drink',
  TRAVEL_PLACES = 'travel_places',
  ACTIVITIES = 'activities',
  OBJECTS = 'objects',
  SYMBOLS = 'symbols',
  FLAGS = 'flags',
}

// INFO: everything *but* suggested
const getCATEGORIES = (): CategoriesConfig => [
  {
    category: Categories.ACTIVITIES,
    name: 'Activities',
  },
  {
    category: Categories.ANIMALS_NATURE,
    name: 'Animals & Nature',
  },
  {
    category: Categories.FLAGS,
    name: 'Flags',
  },
  {
    category: Categories.FOOD_DRINK,
    name: 'Foods & Drinks',
  },
  {
    category: Categories.OBJECTS,
    name: 'Objects',
  },

  {
    category: Categories.SMILEYS_PEOPLE,
    name: 'People',
  },
  {
    category: Categories.SYMBOLS,
    name: 'Symbols',
  },
  {
    category: Categories.TRAVEL_PLACES,
    name: 'Travel Places',
  },
]

interface Props {
  anchorEl: HTMLElement
  PickerProps?: EmojiPickerProps
  PopperProps?: Omit<PopperProps, 'open'>
  onClose: VoidFunction
}

const EmojiPickerPopper: FC<Props> = ({ anchorEl, PickerProps, PopperProps, onClose }) => {
  const CATEGORIES = useMemo(() => getCATEGORIES(), [])
  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper open anchorEl={anchorEl} placement="top" {...PopperProps}>
        <EmojiPicker
          open
          lazyLoadEmojis
          searchDisabled
          previewConfig={{ showPreview: false }}
          categories={CATEGORIES}
          {...PickerProps}
        />
      </Popper>
    </ClickAwayListener>
  )
}

export default EmojiPickerPopper
