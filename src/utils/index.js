import { nanoid } from 'nanoid'

export function generateTiles(width, height, mapSize) {
    const rows = [...Array(Math.floor(height / mapSize)).keys()]
    const cols = [...Array(Math.floor(width / mapSize)).keys()]

    const tiles = rows.map(y => {
        return cols.map(x => {
            return { 
                id: nanoid(),
                x: x * mapSize, 
                y: y * mapSize
            }
        })
    })
    return tiles
}
