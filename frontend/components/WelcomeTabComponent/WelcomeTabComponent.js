import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';

import VideoComponent from '../VideoComponent/VideoComponent';

const greetings = [
  'You look amazing today.',
  'Today is a beautiful day.',
  'What are you grateful for today?',
  'You are amazing.',
  'Whatever you are, be a good one. -Abraham Lincoln',
  'If you dream it, you can do it. -Walt Disney',
  'Turn your wounds into wisdom. -Oprah Winfrey',
  'Believe you can and you’re halfway there. -Theodore Roosevelt',
  'The best way out is always through. -Robert Frost'
];

export default class WelcomeTabComponent extends Component {
  static navigationOptions = {
    gesturesEnabled: false,
    header: null,
    tabBarLabel: ' ',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-city-church.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  async componentDidMount() {
    try {
      const name = await AsyncStorage.getItem('name');
      this.setState({ name: name });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let name = this.state.name;
    if (!name) {
      name = 'Guest';
    }
    return (
      <View>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}> Hi {name}!</Text>
          <Text
            style={{
              fontStyle: 'italic',
              marginVertical: '2%',
              marginHorizontal: '5%'
            }}
          >
            {greetings[Math.floor(Math.random() * 9)]}
          </Text>
          <VideoComponent />
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
  welcomeView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    marginTop: '15%'
  },
  welcomeText: {
    fontSize: 20,
    marginTop: '5%'
  }
});
