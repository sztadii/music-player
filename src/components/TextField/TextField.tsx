import { TextField as MUITextField, TextFieldProps } from '@mui/material'

import styles from './TextField.module.scss'

export default function TextField(props: TextFieldProps) {
  return (
    <MUITextField
      {...props}
      className={`${styles.wrapper} ${props.className}`}
    />
  )
}
