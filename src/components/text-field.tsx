import { TextField as MUITextField, TextFieldProps } from '@mui/material'
import styled from 'styled-components'

export default function TextField(props: TextFieldProps) {
  return <TextFieldStyled {...props} />
}

const TextFieldStyled = styled(MUITextField)`
  label {
    background: white;
    border-radius: 4px;
  }
`
