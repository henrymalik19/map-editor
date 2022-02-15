import React, { useEffect, useRef, useState } from 'react'

// components
import Tile from '../Tile'

// helpers
import { generateWithTilesetSize, range } from '../../utils'

// styles
import styles from './Map.module.scss'

function Map({ tilesetSrc, tilesetSize, activeTileCoordinates }) {
    const hasActiveTileCoordinates = (activeTileCoordinates.x !== null) && (activeTileCoordinates.y !== null)

    const withTilsetSize = generateWithTilesetSize(tilesetSize)

    const [image, setImage] = useState(null)
    const [currentLayer, setCurrentLayer] = useState(1)
    const [layers, setLayers] = useState([
        { id: 1, level: 1, tiles: {}, ctx: useRef() },
        { id: 2, level: 2, tiles: {}, ctx: useRef() },
        { id: 3, level: 3, tiles: {}, ctx: useRef() } // [destination on canvas]: source from img
    ])

    const clearTile = (ctx, config) => {
        const { x, y, tilesetSize } = config

        ctx.clearRect(withTilsetSize(x), withTilsetSize(y), tilesetSize, tilesetSize)
    }

    const draw = (ctx, config) => {
        const { img, sourceX, sourceY, destinationX, destinationY } = config

        ctx.drawImage(
            img, 
            withTilsetSize(sourceX), withTilsetSize(sourceY), 
            tilesetSize, tilesetSize,
            withTilsetSize(destinationX), withTilsetSize(destinationY),
            tilesetSize, tilesetSize
        )

    }

    const handleDrawTile = ({ target }) => {
        const [destinationX, destinationY] = target.dataset.coordinates.split(',')


        setLayers(prevLayers => {
            const layerToUpdate = prevLayers.find(layer => layer.level === currentLayer)
            layerToUpdate.tiles[`${destinationX},${destinationY}`] = [activeTileCoordinates.x, activeTileCoordinates.y]

            return [...prevLayers]
        })
    }

    useEffect(() => {
        const img = new Image()
        img.onload = () => setImage(img)
        img.src = tilesetSrc
    }, [])

    useEffect(() => {
        if (image) {
            const activeLayer = layers.find(layer => layer.level === currentLayer)
            const canvas = activeLayer.ctx.current
            const ctx = canvas.getContext('2d')

            const coordinates = Object.keys(activeLayer.tiles)

            coordinates.forEach(coordinates => {
                const [sourceX, sourceY] = activeLayer.tiles[coordinates]
                const [destinationX, destinationY] = coordinates.split(',')
                
                if (activeLayer.tiles[coordinates]) {
                    clearTile(ctx, { x: destinationX, y: destinationY, tilesetSize })
                }

                draw(ctx, {
                    img: image,
                    sourceX,
                    sourceY,
                    destinationX,
                    destinationY
                })
            })
        }
    }, [image, layers, currentLayer])

    return (
        <div className={styles.container}>
            <div className={styles.layers_container}>
                {layers.map(layer => 
                    <canvas 
                        width="896" 
                        height="448"
                        ref={layer.ctx}
                        key={`layer-${layer.level}`} 
                        id={`layer-${layer.level}`}  
                        className={`
                            ${styles.canvas} 
                            ${layer.level > currentLayer ? styles.canvas_layer_hidden : '' } 
                            ${layer.level < currentLayer ? styles.canvas_layer_covered : ''}
                        `} 
                    />
                )}
                <div className={styles.tile_overlay}>
                    {range(448 / tilesetSize).map(y => (
                        range(896 / tilesetSize).map(x => (
                            <Tile 
                                key={`tile-${x},${y}`} 
                                x={x} y={y} 
                                tilesetSize={tilesetSize} 
                                isGridVisible={true} 
                                isActiveTile={false}
                                handleClick={hasActiveTileCoordinates ? handleDrawTile: null}
                            />
                        ))
                    ))}
                </div>
            </div>
            <div className={styles.layers_panel}>
                <h4>Layers</h4>
                {layers.map(layer => (
                    <div 
                        key={layer.id} 
                        className={`${styles.layer_btn} ${layer.level === currentLayer ? styles.layer_btn_active : ''}`} 
                        onClick={() => setCurrentLayer(layer.level)}
                    >
                        {layer.level}
                    </div>
                ))}
            </div>
            <div className={styles.map_ctrls}>
                <h4>Controls</h4>
            </div>
        </div>
    )
}

export default Map
