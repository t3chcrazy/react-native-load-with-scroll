export const fetchImages = async (pageNumber, searchText) => {
    const searchParams = new URLSearchParams()
    if (!!searchText) {
        searchParams.append("text", searchText)
    }
    if (!!pageNumber) {
        searchParams.append("page", pageNumber)
    }
    // const result = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&per_page=20${searchParams.toString()}`)
    const result = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&text=${searchText}&per_page=20&page=${pageNumber}`)
    const data = await result.json()
    if (result.status !== 200) {
        throw data?.message ?? "Something went wrong. Please try again"
    }
    return data
}