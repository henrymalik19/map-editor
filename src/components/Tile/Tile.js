import React from 'react'

// styles
import styles from './Tile.module.scss'

const customTileStyles = (img, x, y, tileSize) => ({
    height: `${tileSize}px`,
    width: `${tileSize}px`,
    background: `url(${img}) -${x}px -${y}px no-repeat`
})

function Tile({ img, tile, tileSize, isInLastRow, isActiveTile, handleClick }) {
  const { x, y } = tile
  const tileStyle = customTileStyles(img, x, y, tileSize)

  return <div 
    className={[`
      ${styles.tile} 
      ${isInLastRow && styles.tile_last_row} 
      ${isActiveTile && styles.active_tile}
    `]} 
    style={tileStyle}
    onClick={handleClick}
  />
}

export default Tile
