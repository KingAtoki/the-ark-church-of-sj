import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Image,
  FlatList,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';
import axios from 'axios';

export default class VersesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      verses: []
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <Button title={'Notes'} onPress={() => params.handleNotes()} />
      ),
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-holy-bible.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
  };

  onToNotes = () => {
    this.state.loggedIn
      ? this.props.navigation.navigate('Notes')
      : Alert.alert(
          'Not Logged In!',
          'Please log in to take notes!',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
  };

  async componentDidMount() {
    let book = this.props.navigation.state.params.book.book;
    let chapter = this.props.navigation.state.params.chapter.item;
    axios
      .get(`https://bible-api.com/${book} ${chapter}`)
      .then(response => {
        this.setState({
          verses: response.data.verses
        });
      })
      .catch(err => {
        console.log(err);
      });
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        // console.log(value);
        this.setState({ loggedIn: true });
      }
    } catch (error) {
      // Error retrieving data
      console.log(`You done goofed because: ${error}`);
    }
    this.props.navigation.setParams({ handleNotes: this.onToNotes });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.verses}
          renderItem={({ item }) => (
            <View style={styles.verses}>
              <Text style={styles.itemNum}>
                {item.verse} <Text style={styles.itemText}>{item.text}</Text>
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 25
  },
  verses: {
    marginHorizontal: '2%'
  },
  icon: {
    width: 30,
    height: 30
  }
});

//AppRegistry.registerComponent('VersesComponent', () => VersesComponent);
