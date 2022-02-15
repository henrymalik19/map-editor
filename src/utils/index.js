import { nanoid } from 'nanoid'

export function range(length) {
    return [...Array(length).keys()]
}

export function generateWithTilesetSize(tilesetSize) {
    return (coordinate) => {
        return coordinate * tilesetSize
    }
}