import React, { useState, useCallback, useRef, useEffect } from "react";
import { Text, View, SafeAreaView, Image, Dimensions } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import images from "./../model/carousel";
import { storage } from "./../firebase/config";

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
        imagesList.push(image);
      });
      console.log(JSON.stringify(imagesList));
      setCarouselImages(imagesList);
    };
    loadImages();
  }, []);

  const onSelect = (indexSelected: number) => {
    setIndexSelected(indexSelected);

    /**
     * if you want to position the thumbnail in * the middle of the screen on selection
     * do the following
     * Calculation done by awesome Catalin Miron
     * Source: https://www.youtube.com/watch?v=gjC2oUJhePE&t=1097s
     */
    // if (indexSelected * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > width / 2) {
    //   flatListRef?.current?.scrollToOffset({
    //     offset: indexSelected * (THUMB_SIZE + 10) - width / 2 + THUMB_SIZE / 2,
    //     animated: true,
    //   });
    // } else {
    //   flatListRef?.current?.scrollToOffset({
    //     offset: 0,
    //     animated: true,
    //   });
    // }

    //  my initial solution
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const onTouchThumbnail = (touched: any) => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", paddingBottom: 10 }}>
      <View style={{ margin: 10 }}>
        <Carousel
          autoplay={true}
          loop={true}
          ref={carouselRef}
          layout="tinder"
          data={carouselImages || []}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => onSelect(index)}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              source={{ uri: item?.imageUrl }}
            />
          )}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 32,
          alignSelf: "flex-end",
        }}
      ></View>
    </View>
  );
};

export default CustomCarousel;
