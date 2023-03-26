import React, { useEffect, useState } from 'react'
import logo from 'assets/images/logo.svg'
import { findTopAlbums, TopAlbumsResponse } from 'services/musicService'
import styles from './Home.module.scss'

export default function Home() {
  const [albums, setAlbums] = useState<TopAlbumsResponse['feed']['entry']>([])

  useEffect(() => {
    async function fetchAndSaveAlbums() {
      const response = await findTopAlbums(10)
      setAlbums(response.feed.entry)
    }

    fetchAndSaveAlbums()
  }, [])

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <img src={logo} className={styles.logo} alt="atom logo" />

        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {albums.map(album => {
          return <p key={album.id.label}>{album.title.label}</p>
        })}
      </section>
    </div>
  )
}
