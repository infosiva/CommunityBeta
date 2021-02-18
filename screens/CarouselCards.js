import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import data from './../model/banners'

const CarouselCards = () => {
    const isCarousel = React.useRef(null)

    return (
        <View>
            <Carousel
                autoplay={true}
                loop={true}
                layout={'tinder'}
                layoutCardOffset={9}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={0.65}
                // layout="tinder"
                // layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                // inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    )
}


export default CarouselCards