import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { storage } from './../firebase/config'
import ListImageItem from './ListImageItem';

const ImagesList = () => {
  const [urlsUploadedImages, setURLsUploadedImages] = useState(null);

  useEffect(() => {
    setURLsToFilesInBucket();
  }, []);

  const setURLsToFilesInBucket = async () => {
    const imageRefs = await storage.ref('carouselImages').listAll();
    const urls = await Promise.all(
      imageRefs.items.map((ref) => ref.getDownloadURL())
    );
    console.log(urls)
    setURLsUploadedImages(urls);
  };

  return (
    <FlatList
      style={styles.container}
      data={urlsUploadedImages}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <ListImageItem uri={item} />}
    />
  );
};

export default ImagesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});