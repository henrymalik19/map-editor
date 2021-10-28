import React, { useState } from 'react'
import Draggable from 'react-draggable'

// components
import Palette from './components/Palette'
import Map from './components/Map'

// styles
import styles from './App.module.scss'

import tileset from './assets/tileset_32.png'

const TILESET_SIZE = 32

function range(length) {
  return [...Array(length).keys()]
}

function App() {
  const [activeTile, setActiveTile] = useState(null)
  const [tilesetDimensions, setTilesetDimensions] = useState({ x: 0, y: 0 })

  const handleSetActiveTile = (tile) => {
    setActiveTile(tile)
  }

  const handleTileClick = (e) => {
    console.log(e, e.target.dataset)
  }

  const handleImgLoad = ({ target: img }) => {
    setTilesetDimensions({ x: (img.offsetWidth / TILESET_SIZE), y: (img.offsetHeight / TILESET_SIZE)})
  }

  return (
    <div className={styles.container}>
      <Draggable handle="#header">
        <div style={{width: '448px', height: '448px', border: '1px solid rgba(1,1,1,1)', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: 'white'  }}>
          <h3 id="header" style={{ backgroundColor: 'black', color: 'white', margin: '0', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Tileset</h3>
          <div style={{  width: '100%', height: '100%', overflow: 'scroll', userSelect: 'none', position: 'relative' }}>
            <img src={tileset} alt="tileset" draggable="false" onLoad={handleImgLoad} />
            {range(tilesetDimensions.y).map(y => (
              range(tilesetDimensions.x).map(x => (
                <div data-coordinates={`${x},${y}`} style={{ borderTop: '1px solid black', borderRight: '1px solid black',  width: '32px', height: '32px', position: 'absolute', top: (y * TILESET_SIZE), left: (x * TILESET_SIZE)}} onClick={handleTileClick}/>
              ))
            ))}
          </div>
        </div>
      </Draggable>
      {/* <Map 
        img={tileset} 
        width={800} height={600}
        tileSize={32}
        activeTile={activeTile}
      /> */}
    </div>
    // <div className={styles.container}>
    //   <Palette
    //     img={tileset} 
    //     width={1280} height={992}
    //     tileSize={32}
    //     activeTile={activeTile}
    //     setActiveTile={handleSetActiveTile} 
    //   />
    //   <Map 
    //     img={tileset} 
    //     width={800} height={600}
    //     tileSize={32}
    //     activeTile={activeTile}
    //   />
    // </div>
  );
}

export default App;
