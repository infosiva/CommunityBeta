import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";
import images from "./../model/carousel";
import { storage } from "./../firebase/config";
import { LinearGradient } from "expo-linear-gradient";
import ImageViewing from "react-native-image-viewing";

const { width: screenWidth } = Dimensions.get("window");

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<any>();
  const [carouselImages, setCarouselImages] = useState<any>();
  const [indexSelected, setIndexSelected] = useState(0);
  const { width } = Dimensions.get("window");
  const SPACING = 10;
  const THUMB_SIZE = 80;
  const carouselRef = useRef<any>();
  const flatListRef = useRef<any>();

  const ref = useRef(null);

  const renderItem = (item, index, parallaxProps) => {
    return (
      <TouchableOpacity onPress={onPressCarousel(index)} style={styles.tile}>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.imageUrl }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Text style={styles.title} numberOfLines={2}>
            {item?.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref("carouselImages").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      let imagesList: any = [];
      urls.forEach((url) => {
        let image: any = {};
        image.imageUrl = url;
        image.title = "image...";
        imagesList.push(image);
      });
      console.log(JSON.stringify(imagesList));
      setCarouselImages(imagesList);
    };
    loadImages();
  }, []);

  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);

    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const onPressCarousel = (indexSelected: number) => {
    setIndexSelected(indexSelected);
  };

  const onTouchThumbnail = (touched: any) => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#648880", "#207cca", "#7db9e8"]}
          // style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Carousel
            layout="default"
            autoplay={true}
            loop={true}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={carouselImages || []}
            onPress={() => alert("")}
            onSnapToItem={(index) => onSelect(index)}
            renderItem={(
              item: {
                item: unknown;
                index: number;
              },
              parallaxProps
            ) => renderItem(item.item, item.index, parallaxProps)}
            hasParallaxImages={true}
          />
          {/* {indexSelected > 0 && (
            <ImageViewing
              images={carouselImages}
              imageIndex={indexSelected}
              presentationStyle="overFullScreen"
              visible={indexSelected ? true : false}
              // onRequestClose={onRequestClose}
              // onLongPress={onLongPress}
              // HeaderComponent={
              //   images === travel
              //     ? ({ imageIndex }) => {
              //         const title = get(images, `${imageIndex}.title`);
              //         return (
              //           <ImageHeader
              //             title={title}
              //             onRequestClose={onRequestClose}
              //           />
              //         );
              //       }
              //     : undefined
              // }
              // FooterComponent={({ imageIndex }) => (
              //   <ImageFooter
              //     imageIndex={imageIndex}
              //     imagesCount={images.length}
              //   />
              // )}
            />
          )} */}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 10,
    marginBottom: 0,
    width: screenWidth - 50,
    height: screenWidth - 50,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});

export default CustomCarousel;
