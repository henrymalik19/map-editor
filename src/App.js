import React, { useState } from 'react'

// components
import Palette from './components/Palette'
// import Map from './components/Map'

// styles
import styles from './App.module.scss'

import tileset from './assets/tileset_32.png'

const TILESET_SIZE = 32



function App() {
  const [activeTile, setActiveTile] = useState(null)

  const handleSetActiveTile = (tile) => {
    setActiveTile(tile)
  }

  const handleOpenTileset = () => {

  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <button onClick={handleOpenTileset}>Open Tileset</button>
        <Palette tilesetSrc={tileset} tilesetSize={TILESET_SIZE} boundary={`.${styles.content}`} />
      </main>
      <footer className={styles.footer}>
        <span>&copy; Map Editor </span>
      </footer>
    </div>
  );
}

export default App;
