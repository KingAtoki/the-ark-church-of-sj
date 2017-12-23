import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class MenuComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      gesturesEnabled: false,
      headerBackTitle: null,
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-menu-50.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
  };

  async logout() {
    AsyncStorage.multiRemove(['token', 'name', 'customerID'], err => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
    this.props.navigation.navigate('Home');
  }

  meetThePastors() {
    this.props.navigation.navigate('MeetThePastors');
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 22 }}>
        <TouchableOpacity
          style={styles.defaultButton}
          onPress={() => this.meetThePastors()}
        >
          <Text style={{ fontSize: 20 }}>Meet the Pastors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.logout()}
        >
          <Text style={{ fontSize: 20, color: 'red' }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  logoutButton: {
    width: '100%',
    height: 50,
    padding: 10,
    marginVertical: '5%',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  defaultButton: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center'
  }
});
