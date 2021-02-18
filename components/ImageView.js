import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import images from './../model/carousel'

// Inside of a component's render() method:
const CustomImageView = ({ route, navigation }) => {
  const { imageURI, imageTitle, body } = route.params;
  return (
    <View style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" />
    <ImageHeaderScrollView
      maxHeight={200}
      minHeight={100}
      headerImage={imageURI}
      renderForeground={() => (
        <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
          <TouchableOpacity onPress={() => console.log("tap!!")}>
            <Text style={{ backgroundColor: "transparent" }}>{imageTitle}</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={{ height: 1000 }}>
      <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
          >
            <Text style={styles.title}>
              <Text style={styles.name}>{imageTitle}</Text>
            </Text>
          </TriggeringView>
          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Overview</Text> */}
            <Text style={styles.sectionContent}>{body}</Text>
          </View>
      </View>
    </ImageHeaderScrollView>
    </View>

  );
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
});

export default CustomImageView