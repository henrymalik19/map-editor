import { nanoid } from 'nanoid'

export function range(length) {
    return [...Array(length).keys()]
}
