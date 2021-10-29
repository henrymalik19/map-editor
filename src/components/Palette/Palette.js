import React, { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'

// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThLarge, faWindowMinimize, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import Tile from '../Tile'

import { range } from '../../utils'

// styles
import styles from './Palette.module.scss'

function Palette({ tilesetSrc, tilesetSize, boundary }) {
    const paletteRef = useRef()
    const [isGridVisible, setIsGridVisible] = useState(true)
    const [isMinimized, setIsMinimized] = useState(false)
    const [previousCoordinates, setPreviousCoordinates] = useState({ x: null, y: null })
    const [tilesetDimensions, setTilesetDimensions] = useState({ x: 0, y: 0 })
    const [activeTile, setActiveTile] = useState({ x: null, y: null })
    
    const handleImgLoad = ({ target: img }) => {
        setTilesetDimensions({ x: (img.offsetWidth / tilesetSize), y: (img.offsetHeight / tilesetSize)})
    }

    const handleToggleGrid = () => {
        setIsGridVisible(!isGridVisible)
    }

    const handleSetActiveTile = ({ target }) => {
        const [x, y] = target.dataset.coordinates.split(',')

        setActiveTile({ x: Number(x), y: Number(y) })
    }

    const handleToggleMinimized = () => {
        if (isMinimized && previousCoordinates) {
            paletteRef.current.updatePosition({ x: previousCoordinates.x, y: previousCoordinates.y })
        } else {
            const { x, y } = paletteRef.current.originalPosition
            setPreviousCoordinates({ x, y })

            const newY = document.querySelector(boundary).clientHeight 
            const contentHeight = document.querySelector(`.${styles.header}`).offsetHeight

            paletteRef.current.updatePosition({ x: 0, y: (newY - contentHeight)})
            paletteRef.current.updateSize({ width: '160px', height: '40px' })
        }

        setIsMinimized(!isMinimized)
    }

    return (
        <Rnd
            ref={paletteRef}
            className={`${styles.container} ${isMinimized ? styles.minimized : ''}`}
                default={{
                    x: 10,
                    y: 10,
                    width: tilesetSize * 10,
                    height: tilesetSize * 10,
                }}
                bounds={boundary}
                disableDragging={isMinimized}
                enableResizing={!isMinimized}
                minWidth={isMinimized ? 160 : (tilesetSize * 10)}
                minHeight={isMinimized ? 40 : (tilesetSize * 10)}
                resizeGrid={[tilesetSize, tilesetSize]}
                dragHandleClassName={styles.header}
        >
            <div className={`${styles.content} ${isMinimized ? styles.minimized : ''}`}>
                <div className={`${styles.header} ${isMinimized ? styles.minimized : ''}`}>
                    <h3 className={styles.header_title}>Tileset</h3>
                    <div className={styles.header_action_area}>
                        <FontAwesomeIcon icon={isMinimized ? faWindowMaximize : faWindowMinimize} onClick={handleToggleMinimized} />
                        {!isMinimized && <FontAwesomeIcon icon={faThLarge} onClick={handleToggleGrid} />}
                    </div>
                </div>
                <div className={`${styles.palette} ${isMinimized ? styles.minimized : ''}`}>
                    <img src={tilesetSrc} alt="tileset" draggable="false" onLoad={handleImgLoad} />
                    {range(tilesetDimensions.y).map(y => (
                        range(tilesetDimensions.x).map(x => (
                            <Tile 
                                key={`tile-${x},${y}`} 
                                x={x} y={y} 
                                tilesetSize={tilesetSize} 
                                isGridVisible={isGridVisible} 
                                isActiveTile={(x === activeTile.x) && (y === activeTile.y)}
                                handleSetActiveTile={handleSetActiveTile}
                            />
                        ))
                    ))}
                </div>
            </div>
        </Rnd>
    )
}

export default Palette
