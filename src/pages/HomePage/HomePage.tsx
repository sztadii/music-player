import { Typography, Divider, Container, Box } from '@mui/material'
import TopAlbums from './components/TopAlbums'
import AlbumsSearchField from './components/AlbumsSearchField'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <Container className={styles.wrapper}>
      <Typography variant="h3" mb={3}>
        Top albums
      </Typography>

      <Box mb={3}>
        <AlbumsSearchField />
      </Box>

      <Divider sx={{ my: 3 }} />

      <TopAlbums />
    </Container>
  )
}
