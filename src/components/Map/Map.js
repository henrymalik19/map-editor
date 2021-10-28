import React, { useEffect, useState } from 'react'
import MapTile from '../MapTile'

import { generateTiles } from '../../utils'

// styles
import styles from './Map.module.scss'

function Map({ img, width, height, tileSize, activeTile }) {
    const [currentLayer, setCurrentLayer] = useState(1)
    const [layers, setLayers] = useState([
        { id: 1, rows: [], style: { } },
        { id: 2, rows: [], style: { opacity: 0.5 } }
    ])
    // const [rows, setRows] = useState([])

    useEffect(() => {
        const _rows = generateTiles(width, height, tileSize)
        setLayers(prev => {
            prev.forEach(layer => {
                layer.rows = _rows
            })

            return [...prev]
        })
    }, [])

    return (
        <div className={styles.container}>
            <button onClick={() => setCurrentLayer(1)}>Layer 1</button>
            <button onClick={() => setCurrentLayer(2)}>Layer 2</button>
            <div className={styles.map}>
                {layers.map(layer => (
                    <div id={`layer-${layer.id}`} className={styles.layer} style={{ zIndex: currentLayer === layer.id ? 2: 1, ...layer.style }}>
                        {layer.rows.map((row, rowIdx) => (
                            <div key={rowIdx} className={styles.row}>
                                {row.map(tile => (
                                    <MapTile 
                                        key={tile.id} img={img}
                                        tile={tile} tileSize={tileSize}
                                        activeTile={activeTile}
                                        isInLastRow={(rowIdx + 1) === layer.rows.length}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            {}
            </div>
        </div>
    )
}

export default Map
