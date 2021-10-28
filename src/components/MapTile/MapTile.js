import React, { useState } from 'react'
import Tile from '../Tile'

function MapTile({ img, tile, tileSize, isInLastRow, activeTile }) {
    // this source is so that we can dynamically set the source for this tile
    const [source, setSource] = useState(null)
    const [_tile, _setTile] = useState(tile)

    const handleSetTileImg = () => {
        setSource(img)
        _setTile({
            ...activeTile,
            id: _tile.id
        })
    }

    return (
        <Tile
            img={source}
            tile={_tile}
            tileSize={tileSize}
            isInLastRow={isInLastRow}
            activeTile={activeTile}
            handleClick={() => handleSetTileImg()}
        />
    )
}

export default MapTile
