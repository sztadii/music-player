import React from 'react'
import logo from '../../assets/images/logo.svg'
import styles from './Home.module.scss'

function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="atom logo" />

        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default Home
