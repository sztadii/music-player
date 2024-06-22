import { Breakpoint, useMediaQuery, useTheme } from '@mui/material'

export const useMinBreakpoint = (size: Breakpoint) => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up(size))
}
