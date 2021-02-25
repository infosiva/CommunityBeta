import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles, { colors } from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';
import { scrollInterpolators, animatedStyles } from './utils/animations';
import LinearGradient from 'react-native-linear-gradient';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './../components/SliderEntry';

const { height, width } = Dimensions.get('window');

import images from './../model/carousel'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const SLIDER_1_FIRST_ITEM = 1;

class CustomCarousel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            imageURI: null,
            body: null,
            imageTitle: null
        };
        this.onPress = this.onPress.bind(this);
    }
    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    _renderItem({ item, index }) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }
    _renderLightItem({ item, index }) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem({ item, index }) {
        return <SliderEntry data={item} even={true} />;
    }

    onPress() {
        this.props.navigation.navigate('ImageView', { title: 'Image View', ...this.state });
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.setState((state, props) => ({
                    imageURI: item.image,
                    body: item.body,
                    imageTitle: item.title
                }), this.onPress)
            }}>
                <Image
                    source={item.image}
                    style={style.logoStyle}
                />
                {/* <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text>{item.text}</Text> */}
            </TouchableOpacity>
        );
    }

    render() {
        const { slider1ActiveSlide } = this.state;
        return (
            <View style={styles.exampleContainer}>
                {/* <Text style={styles.title}>{`Example`}</Text>
            <Text style={styles.subtitle}>test</Text> */}
                <Carousel
                    autoplay={true}
                    data={images}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.95}
                    useScrollView={true}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    scrollInterpolator={scrollInterpolators[`scrollInterpolator`]}
                    slideInterpolatedStyle={animatedStyles[`animatedStyles`]}
                    useScrollView={true}
                    inactiveSlideOpacity={0.5}
                    enableMomentum={true}
                    activeSlideAlignment={'start'}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    activeAnimationType={'spring'}
                    activeAnimationOptions={{
                        friction: 4,
                        tension: 40
                    }}
                    autoplayDelay={200}
                    autoplayInterval={3000}
                    layout={'tinder'}
                    loopClonesPerSide={1}
                    loop={true}
                    scrollInterpolator={scrollInterpolators[`scrollInterpolator`]}
                    slideInterpolatedStyle={animatedStyles[`animatedStyles`]}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
                <Pagination
                    dotsLength={images.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    logoStyle: {
        transform: [{
            rotate: '14deg'
        }],
        width: width - 25,
        height: width / 2
    }
});

export default CustomCarousel;