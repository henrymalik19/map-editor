import React, { useState, useEffect } from 'react'
import PaletteTile from '../PaletteTile'

import { generateTiles } from '../../utils'

// styles
import styles from './Palette.module.scss'

function Palette({ img, width, height, tileSize, activeTile, setActiveTile }) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const _rows = generateTiles(width, height, tileSize)
        setRows(_rows)
    }, [])

    useEffect(() => {
        console.log('updating...')
    })

    return (
        <div className={styles.container}>
            <div className={styles.palette} style={{ width }}>
                {rows.map((row, rowIdx) => (
                    <div key={rowIdx} className={styles.row}>
                        {row.map(tile => (
                            <PaletteTile 
                                key={tile.id} img={img} 
                                tile={tile} tileSize={tileSize}
                                isInLastRow={(rowIdx + 1) === rows.length}
                                isActiveTile={activeTile && activeTile.id === tile.id}
                                setActiveTile={setActiveTile}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Palette
