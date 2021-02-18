import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native";

const ROW_HEIGHT = 70;

class ListElement extends Component {
  render() {
    const { name, email, phone } = this.props;

    const rowStyles = [styles.row];

    return (
      <TouchableOpacity onPress={this.onRemove}>
             <ListView
        dataSource={this.state.users}
        renderRow={data => (
          <View style={styles.container}>
            <Image
              source={{ uri: imageSource }}
              style={styles.img}
            />
          </View>)}
      />
        {/* <Animated.View style={rowStyles}>
          <View>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.email}>{phone}</Text>
          </View>
        </Animated.View> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
    height: ROW_HEIGHT
  },
  name: {
    fontSize: 18,
    fontWeight: "500"
  },
  email: {
    fontSize: 14
  },
  img: {
    width: 193,
    height: 110,
  },
});

export default ListElement;
