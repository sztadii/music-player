import { Breakpoint, useMediaQuery, useTheme } from '@mui/material'

export const useMinBreakpoint = (size: Breakpoint) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up(size))
  return matches
}
