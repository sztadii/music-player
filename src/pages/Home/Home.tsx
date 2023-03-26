import React, { Suspense } from 'react'
import logo from 'assets/images/logo.svg'
import TopAlbums from './TopAlbums'
import styles from './Home.module.scss'

export default function Home() {
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

        <Suspense fallback={<div>Loading...</div>}>
          <TopAlbums />
        </Suspense>
      </section>
    </div>
  )
}
