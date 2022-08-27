import React, { useLayoutEffect, useState } from 'react'
import { View, Image, TextInput, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native'
import { GRID_HORIZONTAL_PADDING } from '../../hooks/useImageDimensions'
import useDebounce from '../../hooks/useDebounce'

export default function SearchInput({ value, setValue, handleEmptyText, fetchImageData }) {
    const [loading, setLoading] = useState(false)
    const debouncedValue = useDebounce(value, 180)

    const handleChange = async () => {
        try {
            setLoading(prev => !prev? true: prev)
            setValue(debouncedValue)
            await fetchImageData(null, err => {
                Alert.alert("Error occurred", err?.toString?.())
            }, false)
        }
        finally {
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        if (!!debouncedValue) {
            handleChange()
        }
        else {
            handleEmptyText()
        }
    }, [debouncedValue])

    return (
        <View style = {styles.root}>
            <TextInput
                defaultValue = {value}
                onChangeText = {setValue}
                placeholder = "Search by keywords"
                placeholderTextColor = "gray"
                style = {styles.input}
            />
            {loading? <ActivityIndicator size = "small" color = "green" />: <Image source = {require("./assets/searchIcon.png")} style = {styles.searchIcon} />}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingVertical: Platform.select({
            ios: 10,
            android: 5
        }),
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginHorizontal: GRID_HORIZONTAL_PADDING
    },
    searchIcon: {
        width: 30,
        height: 30
    },
    input: {
        flex: 1,
        paddingRight: 16,
        color: "black"
    }
})