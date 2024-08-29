import { Alert, Container, Divider, Typography } from '@mui/material'
import styled from 'styled-components'

import AlbumsSearchField from 'src/components-connected/albums-search-field'
import {
  TopAlbums,
  TopAlbumsSkeleton
} from 'src/components-connected/top-albums'
import AsyncWrapper from 'src/components/async-wrapper'

export default function HomePage() {
  return (
    <ContainerStyled>
      <Typography variant="h3" mb={2}>
        Top albums
      </Typography>

      <SearchBox>
        <AlbumsSearchField />
      </SearchBox>

      <Divider sx={{ my: 3 }} />

      <AlbumsBox>
        <AsyncWrapper
          loading={<TopAlbumsSkeleton />}
          error={
            <Alert severity="error">
              Something went wrong with top albums service :(
            </Alert>
          }
        >
          <TopAlbums />
        </AsyncWrapper>
      </AlbumsBox>
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)`
  margin-top: 2rem;
`

const SearchBox = styled.div`
  margin-bottom: 2rem;
  position: sticky;
  top: 1rem;
  background: white;
  z-index: 2;
`

const AlbumsBox = styled.div`
  position: relative;
  z-index: 1;
`
