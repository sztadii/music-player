import { TextField, TextFieldProps } from '@mui/material'

import styles from './TextField.module.scss'

export default function AlbumsSearchField(props: TextFieldProps) {
  return (
    <TextField {...props} className={`${styles.wrapper} ${props.className}`} />
  )
}
