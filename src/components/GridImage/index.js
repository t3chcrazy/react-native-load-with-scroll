import React, { useMemo } from 'react'
import { Image } from 'react-native'
import useImageDimensions from '../../hooks/useImageDimensions'

const headers = {
    "Accept-Encoding": "keep-alive",
    "Connection": "gzip, deflate, br",
    "User-Agent": "SomeUserAgent",
    "Retry-After": "1"
}

export default function GridImage({ id, secret, server, farm }) {
    const props = useImageDimensions()
    const imageUri = useMemo(() => `http://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`, [id, secret, server, farm])

    return (
        <Image
            defaultSource = {require("./assets/placeholder.jpeg")}
            source = {{ uri: imageUri, headers }}
            style = {props}
            resizeMode = "contain"
        />
    )
}