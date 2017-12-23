import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions
} from 'react-native';

let { height, width } = Dimensions.get('window');

export default class MeetThePastorsComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-menu-50.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
  };

  render() {
    return (
      <View
        style={{
          marginTop: 22,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View>
          <Image
            source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/Matt&Janet.png')}
            style={styles.pastorsImage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  pastorsImage: {
    width: width * 0.8,
    height: width * 0.8,
    marginTop: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
});
