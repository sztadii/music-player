import { Tooltip as MUITooltip } from '@mui/material'
import { ReactNode } from 'react'

interface TooltipProps {
  title: string
  disabled?: boolean
  children: ReactNode
}

// This wrapper was created because
// MUITooltip requires its children to be wrapped in a 'span' or
// 'div' element for the tooltip to display correctly.
// In some cases, we may want to disable the tooltip,
// but MUITooltip doesn't provide an explicit way to do so.
export default function Tooltip(props: TooltipProps) {
  const { children, disabled, title } = props

  return (
    <MUITooltip title={!disabled ? title : undefined} arrow>
      <span>{children}</span>
    </MUITooltip>
  )
}
