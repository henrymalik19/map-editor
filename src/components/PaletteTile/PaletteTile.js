import React from 'react'
import Tile from '../Tile'

function PaletteTile({ img, tile, tileSize, isInLastRow, isActiveTile, setActiveTile }) {
    return (
        <Tile
            img={img} 
            tile={tile} tileSize={tileSize}
            isInLastRow={isInLastRow}
            isActiveTile={isActiveTile}
            handleClick={() => setActiveTile(tile)}
        />
    )
}

export default PaletteTile
