/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { fetchImages } from './src/api';
import ImageGrid from './src/components/ImageGrid';
import ListPlaceholder from './src/components/ListPlaceholder';
import SearchInput from './src/components/SearchInput';

const App = () => {
  const [search, setSearch] = useState("")
  const [list, setList] = useState([])
  const page = useRef(1)
  
  const fetchData = async (successCallback, errorCallback, concatenate = false) => {
    if (!search) {
      page.current = 1
      setList([])
      return
    }
    const previousPage = page.current
    try {
      if (concatenate) {
        page.current += 1
      }
      else {
        page.current = 1
      }
      const { photos: { photo } } = await fetchImages(page.current, search)
      setList(prev => concatenate? prev.concat(photo): photo)
      successCallback?.(photo)
    }
    catch (err) {
      page.current = previousPage
      errorCallback?.(err)
    }
  }

  const handleEmptyText = () => {
    page.current = 1
    setList([])
  }

  return (
    <SafeAreaView style={styles.root}>
      <SearchInput 
        fetchImageData = {fetchData} 
        value = {search} 
        setValue = {setSearch}
        handleEmptyText = {handleEmptyText}
      />
      <ImageGrid
        shouldLoadEnd = {!!search}
        list = {list} 
        fetchImageData = {fetchData}
        ListEmptyComponent = {() => <ListPlaceholder isSearchEmpty = {!search} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 root: {
  backgroundColor: "white",
  flex: 1,
  paddingTop: 30
 }
});

export default App;
