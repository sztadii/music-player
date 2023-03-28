import { Tooltip as MUITooltip } from '@mui/material'
import { ReactNode } from 'react'

interface TooltipProps {
  title: string
  /**
   * In some cases, we may want to disable the tooltip,
   * but MUITooltip doesn't provide an explicit way to do so.
   */
  disabled?: boolean
  /**
   * In some cases using the PortalAPI may cause overlapping with sticky elements,
   * and in these instances, it's best to avoid using it.
   * However, in most cases, the PortalAPI is very useful,
   * which is why we enable portal API by default and disabled only in specific situations.
   */
  disablePortal?: boolean
  /**
   * This wrapper was created because
   * MUITooltip requires its children to be wrapped in a 'span' or
   * 'div' element for the tooltip to display correctly.
   */
  children: ReactNode
}

export default function Tooltip(props: TooltipProps) {
  const { children, disabled, title, disablePortal } = props

  return (
    <MUITooltip
      title={!disabled ? title : undefined}
      arrow
      PopperProps={{
        disablePortal
      }}
    >
      <span>{children}</span>
    </MUITooltip>
  )
}
