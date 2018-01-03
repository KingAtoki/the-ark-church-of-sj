import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  Alert
} from 'react-native';
import axios from 'axios';

import ChapterComponent from './ChapterComponent';

export default class BibleTabComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      gesturesEnabled: false,
      headerLeft: null,
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginBottom: '5%'
        }}
      />
    );
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
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        this.setState({ loggedIn: true });
      }
    } catch (error) {
      // Error retrieving data
      console.log(`You done goofed because: ${error}`);
    }
    this.props.navigation.setParams({ handleNotes: this.onToNotes });
  }

  render() {
    const booksOfBible = [
      'Genesis',
      'Exodus',
      'Leviticus',
      'Numbers',
      'Deuteronomy',
      'Joshua',
      'Judges',
      'Ruth',
      '1 Samuel',
      '2 Samuel',
      '1 Kings',
      '2 Kings',
      '1 Chronicles',
      '2 Chronicles',
      'Ezra',
      'Nehemiah',
      'Esther',
      'Job',
      'Psalms',
      'Proverbs',
      'Ecclesiastes',
      'Song of Solomon',
      'Isaiah',
      'Jeremiah',
      'Lamentations',
      'Ezekiel',
      'Daniel',
      'Hosea',
      'Joel',
      'Amos',
      'Obadiah',
      'Jonah',
      'Micah',
      'Nahum',
      'Habakkuk',
      'Zephaniah',
      'Haggai',
      'Zechariah',
      'Malachi',
      'Matthew',
      'Mark',
      'Luke',
      'John',
      'Acts',
      'Romans',
      '1 Corinthians',
      '2 Corinthians',
      'Galatians',
      'Ephesians',
      'Philippians',
      'Colossians',
      '1 Thessalonians',
      '2 Thessalonians',
      '1 Timothy',
      '2 Timothy',
      'Titus',
      'Philemon',
      'Hebrews',
      'James',
      '1 Peter',
      '2 Peter',
      '1 John',
      '2 John',
      '3 John',
      'Jude',
      'Revelation'
    ];
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={booksOfBible}
          renderItem={({ item }) => (
            <View>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('Chapters', {
                    book: { item }
                  })
                }
                style={styles.itemText}
              >
                {item}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 25,
    marginLeft: '5%'
  },
  icon: {
    width: 30,
    height: 30
  },
  mainContainer: {
    paddingTop: '2%'
  }
});
