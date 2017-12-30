import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Verses from './Verses';

let { height, width } = Dimensions.get('window');

export default class ChapterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
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
    let verses = [];
    let book = this.props.navigation.state.params.book.item;
    switch (book) {
      case 'Genesis':
        verses = Verses[0];
        break;
      case 'Exodus':
        verses = Verses[1];
        break;
      case 'Leviticus':
        verses = Verses[2];
        break;
      case 'Numbers':
        verses = Verses[3];
        break;
      case 'Deuteronomy':
        verses = Verses[4];
        break;
      case 'Joshua':
        verses = Verses[5];
        break;
      case 'Judges':
        verses = Verses[6];
        break;
      case 'Ruth':
        verses = Verses[7];
        break;
      case '1 Samuel':
        verses = Verses[8];
        break;
      case '2 Samuel':
        verses = Verses[9];
        break;
      case '1 Kings':
        verses = Verses[10];
        break;
      case '2 Kings':
        verses = Verses[11];
        break;
      case '1 Chronicles':
        verses = Verses[12];
        break;
      case '2 Chronicles':
        verses = Verses[13];
        break;
      case 'Ezra':
        verses = Verses[14];
        break;
      case 'Nehemiah':
        verses = Verses[15];
        break;
      case 'Esther':
        verses = Verses[16];
        break;
      case 'Job':
        verses = Verses[17];
        break;
      case 'Psalms':
        verses = Verses[18];
        break;
      case 'Proverbs':
        verses = Verses[19];
        break;
      case 'Ecclesiastes':
        verses = Verses[20];
        break;
      case 'Song of Solomon':
        verses = Verses[21];
        break;
      case 'Isaiah':
        verses = Verses[22];
        break;
      case 'Jeremiah':
        verses = Verses[23];
        break;
      case 'Lamentations':
        verses = Verses[24];
        break;
      case 'Ezekiel':
        verses = Verses[25];
        break;
      case 'Daniel':
        verses = Verses[26];
        break;
      case 'Hosea':
        verses = Verses[27];
        break;
      case 'Joel':
        verses = Verses[28];
        break;
      case 'Amos':
        verses = Verses[29];
        break;
      case 'Obadiah':
        verses = Verses[30];
        break;
      case 'Jonah':
        verses = Verses[31];
        break;
      case 'Micah':
        verses = Verses[32];
        break;
      case 'Nahum':
        verses = Verses[33];
        break;
      case 'Habakkuk':
        verses = Verses[34];
        break;
      case 'Zephaniah':
        verses = Verses[35];
        break;
      case 'Haggai':
        verses = Verses[36];
        break;
      case 'Zechariah':
        verses = Verses[37];
        break;
      case 'Malachi':
        verses = Verses[38];
        break;
      case 'Matthew':
        verses = Verses[39];
        break;
      case 'Mark':
        verses = Verses[40];
        break;
      case 'Luke':
        verses = Verses[41];
        break;
      case 'John':
        verses = Verses[42];
        break;
      case 'Acts':
        verses = Verses[43];
        break;
      case 'Romans':
        verses = Verses[44];
        break;
      case '1 Corinthians':
        verses = Verses[45];
        break;
      case '2 Corinthians':
        verses = Verses[46];
        break;
      case 'Galatians':
        verses = Verses[46];
        break;
      case 'Ephesians':
        verses = Verses[48];
        break;
      case 'Philippians':
        verses = Verses[49];
        break;
      case 'Colossians':
        verses = Verses[50];
        break;
      case '1 Thessalonians':
        verses = Verses[51];
        break;
      case '2 Thessalonians':
        verses = Verses[52];
        break;
      case '1 Timothy':
        verses = Verses[53];
        break;
      case '2 Timothy':
        verses = Verses[54];
        break;
      case 'Titus':
        verses = Verses[55];
        break;
      case 'Philemon':
        verses = Verses[56];
        break;
      case 'Hebrews':
        verses = Verses[57];
        break;
      case 'James':
        verses = Verses[58];
        break;
      case '1 Peter':
        verses = Verses[59];
        break;
      case '2 Peter':
        verses = Verses[60];
        break;
      case '1 John':
        verses = Verses[61];
        break;
      case '2 John':
        verses = Verses[62];
        break;
      case '3 John':
        verses = Verses[63];
        break;
      case 'Jude':
        verses = Verses[64];
        break;
      case 'Revelation':
        verses = Verses[65];
        break;
    }
    return (
      <View style={styles.list}>
        <FlatList
          numColumns={5}
          data={verses}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.numberBox}
              onPress={() =>
                this.props.navigation.navigate('Verses', {
                  chapter: { item },
                  book: { book }
                })
              }
            >
              <Text
                onPress={() =>
                  this.props.navigation.navigate('Verses', {
                    chapter: { item },
                    book: { book }
                  })
                }
                style={styles.itemText}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 25
  },
  icon: {
    width: 30,
    height: 30
  },
  numberBox: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    width: width * 0.2,
    height: width * 0.2,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
