import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  StackNavigator
} from 'react-native';
import { Asset, AppLoading } from 'expo';

import ContentComponent from '/Users/kingatoki/Desktop/the-ark-church-of-sj/frontend/components/ContentComponent/ContentComponent.js';

export default class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: null,
      isReady: false
    };
  }
  static navigationOptions = {
    header: null
  };

  async logInWithFB() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '2040679689509254',
      {
        permissions: ['public_profile']
      }
    );
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const userInfo = await response.json();
      this.setState({ userInfo });
      const name = this.state.userInfo.name;
      try {
        await AsyncStorage.multiSet([['token', token], ['name', name]]);
      } catch (error) {
        // Error saving data
        console.log(`You done goofed because: ${error}`);
      }
      this.props.navigation.navigate('Content', {
        name: { name }
      });
    }
  }

  loginAsGuest() {
    this.props.navigation.navigate('Content', {
      name: 'Guest'
    });
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.multiGet(['token', 'name']);
      if (value[0][1] !== null) {
        // We have data!!
        const name = value[1][1];
        this.props.navigation.navigate('Content', {
          name: { name }
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(`You done goofed because: ${error}`);
    }
  }

  async _cacheResourcesAsync() {
    images = [
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/ArkAngels.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/GPG.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-city-church.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-donate.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-holy-bible.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-user-groups.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/KingdomCloset.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/KingdomKids.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/pexels-photo-255379.jpeg'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/TheArkChurch.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-menu-50.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/TheArkChurch1024x1024.png'),
      require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/Matt&Janet.png')
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainView}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        >
          <Image
            source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/pexels-photo-255379.jpeg')}
            style={{ resizeMode: 'cover' }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
          }}
        >
          <Image
            style={styles.image}
            source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/TheArkChurch.png')}
          />
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              paddingBottom: '15%'
            }}
          >
            Reach. Teach. Empower. Impact.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.logInWithFB()}
            >
              <View style={styles.button}>
                <Text style={styles.text}>Connect with Facebook</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.guestView}>
              <Text>
                Log in as a{' '}
                <Text style={styles.guest} onPress={() => this.loginAsGuest()}>
                  Guest
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  image: {
    marginVertical: '20%',
    width: 250,
    height: 250
  },

  buttonContainer: {
    flexDirection: 'column'
  },

  button: {
    height: '5%',
    width: '95%',
    backgroundColor: '#3B5998',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
    margin: '5%',
    borderRadius: 90
  },

  text: {
    color: 'white'
  },
  guest: {
    color: 'blue'
  },
  guestView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
