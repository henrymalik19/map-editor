import React from 'react'

// styles
import styles from './Tile.module.scss'

const setTileVars = (x, y, tilesetSize, isGridVisible) => ({ 
  "--tile-width": `${tilesetSize}px`,
  "--tile-height": `${tilesetSize}px`,
  "--tile-position-x": `${tilesetSize * x}px`,
  "--tile-position-y": `${tilesetSize * y}px`,

  "--tile-border-top": isGridVisible ? '1px solid black' : 'none', 
  "--tile-border-right": isGridVisible ? '1px solid black' : 'none'
})

function Tile({ x, y, tilesetSize, isGridVisible, isActiveTile, handleSetActiveTile }) {
  return (
    <div
      className={`${styles.tile} ${isActiveTile && styles.tile_active}`}
      style={setTileVars(x, y, tilesetSize, isGridVisible, isActiveTile)} 
      data-coordinates={`${x},${y}`} 
      onClick={handleSetActiveTile}
    />
  )
}

export default Tile
