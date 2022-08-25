import React, { useRef, useState } from 'react'
import { View, FlatList, RefreshControl, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import GridImage from '../GridImage'
import useImageDimensions from '../../hooks/useImageDimensions'

export default function ImageGrid({ list, fetchImageData, shouldLoadEnd, ...props }) {
    const [endLoading, setEndLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [endReached, setEndReached] = useState(false)
    const [loadError, setLoadError] = useState(false)
    const endCallbackExecuting = useRef(false)
    const { height, VERTICAL_SPACE, GRID_HORIZONTAL_PADDING } = useImageDimensions()

    const renderItem = ({ item }) => <GridImage {...item} />

    const keyExtractor = item => item.id

    const handleEndReached = async () => {
        try {
            if (endCallbackExecuting.current) {
                return
            }
            endCallbackExecuting.current = true
            setEndLoading(true)
            setLoadError(prev => prev? false: prev)
            await fetchImageData(photos => {
                if (photos?.length === 0) {
                    setEndReached(true)
                }
            }, err => {
                setLoadError(true)
            }, true)
            endCallbackExecuting.current = false
        }
        finally {
            setEndLoading(false)
        }
    }

    const handleRefresh = async () => {
        try {
            setRefreshing(true)
            await fetchImageData()
        }
        finally {
            setRefreshing(false)
        }
    }

    const renderEmpty = () => <ActivityIndicator size = "large" color = "green" />

    const getItemLayout = (data, index) => ({
        length: height,
        offset: (height+VERTICAL_SPACE)*index,
        index
    })

    const renderFooter = () => endLoading && <ActivityIndicator size = "large" color = "green" />

    const renderSeparator = () => <View style = {{ height: VERTICAL_SPACE }} />

    return (
        <FlatList
            refreshControl = {<RefreshControl endLoading = {refreshing} onRefresh = {handleRefresh} />}
            keyExtractor = {keyExtractor}
            data = {list}
            renderItem = {renderItem}
            onEndReachedThreshold = {0.9}
            numColumns = {3}
            columnWrapperStyle = {styles.columnWrapper}
            contentContainerStyle = {{ paddingHorizontal: GRID_HORIZONTAL_PADDING, flexGrow: 1 }}
            getItemLayout = {getItemLayout}
            ItemSeparatorComponent = {renderSeparator}
            onEndReached = {shouldLoadEnd && handleEndReached}
            ListFooterComponent = {renderFooter}
            ListEmptyComponent = {renderEmpty}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: "space-between"
    }
})