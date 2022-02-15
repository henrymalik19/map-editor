import React, { useState } from 'react'

// components
import Palette from './components/Palette'
import Map from './components/Map'

// styles
import styles from './App.module.scss'

import tileset from './assets/tileset_32.png'

const TILESET_SIZE = 32


function App() {
  const [activeTile, setActiveTile] = useState({ x: null, y: null })

  const handleSetActiveTile = ({ target }) => {
    const [x, y] = target.dataset.coordinates.split(',')

    setActiveTile({ x: Number(x), y: Number(y) })
  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Palette 
          boundary={`.${styles.content}`} 
          tilesetSrc={tileset} tilesetSize={TILESET_SIZE} 
          activeTile={activeTile} handleSetActiveTile={handleSetActiveTile}
        />
        <Map activeTileCoordinates={activeTile} tilesetSrc={tileset} tilesetSize={TILESET_SIZE} />
      </main>
      <footer className={styles.footer}>
        <span>&copy; Map Editor </span>
      </footer>
    </div>
  );
}

export default App;
