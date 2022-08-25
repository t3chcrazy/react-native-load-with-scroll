import React, { useMemo } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function ListPlaceholder({ isSearchEmpty }) {
    const { image, text } = useMemo(() => ({
        image: isSearchEmpty? require("./assets/searchEmpty.png"): require("./assets/listEmpty.png"),
        text: isSearchEmpty? "Start typing to see results!": "No results! Modify your search query"
    }), [isSearchEmpty])

    return (
        <View style = {styles.root}>
            <Image style = {styles.image} source = {image} resizeMode = "contain" />
            <Text style = {styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        width: "80%",
        textAlign: "center",
        color: "black",
        marginTop: 20,
        fontWeight: "500",
        fontSize: 20
    },
    image: {
        width: 150,
        height: 150
    }
})