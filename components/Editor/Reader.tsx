import { generateHTML } from '@tiptap/core'
import { extensions } from './config'
import { FC, useMemo } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

const renderTipTapHTML = (json: any) => {
  try {
    return generateHTML(json, extensions)
  } catch (ex) {
    console.log(ex)
    return ''
  }
}

const isTipTapJson = (input: string | undefined): [boolean, any] => {
  if (!input) return [false, undefined] as const

  try {
    const parsed = JSON.parse(input)
    if (!parsed) return [false, undefined] as const

    const isValid = parsed?.type === 'doc' && Array.isArray(parsed?.content)

    return [isValid, parsed] as const
  } catch (ex) {
    return [false, undefined] as const
  }
}

const isHTML = (str?: string) => {
  if (!str) return false
  const doc = new DOMParser().parseFromString(str, 'text/html')
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1)
}

interface ReaderProps extends Omit<BoxProps, 'dangerouslySetInnerHTML'> {
  content?: string
}

const Reader: FC<ReaderProps> = ({ content, ...props }) => {
  const html = useMemo(() => {
    const [isValidJson, parsed] = isTipTapJson(content)

    if (isValidJson) {
      return renderTipTapHTML(parsed)
    } else if (isHTML(content)) {
      return content!
    } else {
      // Fallback to escape plain text.This handles the comments created before the editor was applied.
      const safeText = content?.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
      return `<p>${safeText}</p>`
    }
  }, [content])

  return <Box dangerouslySetInnerHTML={{ __html: html }} mt={2} {...props} />
}

export default Reader
