import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import StarRating from './StarRating';

const Card = ({itemData, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={itemData.image}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{itemData.title}</Text>
          {/* <StarRating ratings={itemData.ratings} reviews={itemData.reviews} /> */}
          <Text numberOfLines={1} style={styles.cardDetails}>{itemData.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 1,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 1,
    borderTopRightRadius: 5,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    paddingBottom: 10
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
