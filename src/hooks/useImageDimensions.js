import { useWindowDimensions } from 'react-native'

export const GRID_HORIZONTAL_PADDING = 16
const GRID_INBETWEEN_SPACE = 10
const VERTICAL_SPACE = 20

export default function useImageDimensions() {
    const { width, height } = useWindowDimensions()
    const gridImageWidth = (width-2*GRID_HORIZONTAL_PADDING-2*GRID_INBETWEEN_SPACE)/3
    const gridImageHeight = (height-2*VERTICAL_SPACE)/4-VERTICAL_SPACE

    return { width: gridImageWidth, height: gridImageHeight, VERTICAL_SPACE, GRID_HORIZONTAL_PADDING }
}