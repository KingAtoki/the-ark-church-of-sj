import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  AsyncStorage
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import BibleTabComponent from '../BibleTabComponent/BibleTabComponent';
import WelcomeTabComponent from '../WelcomeTabComponent/WelcomeTabComponent';
import ChapterComponent from '../BibleTabComponent/ChapterComponent';
import VersesComponent from '../BibleTabComponent/VersesComponent';
import GroupsComponent from '../GroupsComponent/GroupsComponent';
import NotesComponent from '../NotesComponent/NotesComponent';
import TithesComponent from '../TithesComponent/TithesComponent';

const Bible = StackNavigator({
  Books: {
    screen: BibleTabComponent,
    navigationOptions: {
      title: 'Bible'
    }
  },
  Chapters: {
    screen: ChapterComponent,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.book.item}`
    })
  },
  Verses: {
    screen: VersesComponent,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.chapter.item} ${
        navigation.state.params.book.book
      }`
    })
  },
  Notes: {
    screen: NotesComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Notes'
    })
  }
});
const Tabs = TabNavigator(
  {
    WelcomeTabComponent: {
      screen: WelcomeTabComponent
    },
    BibleTabComponent: {
      screen: Bible
    },
    TithesComponent: {
      screen: TithesComponent
    },
    GroupsComponent: {
      screen: GroupsComponent
    }
  },
  { animationEnabled: true }
);

export default class Content extends Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    header: null,
    gesturesEnabled: false
  });

  render() {
    return <Tabs screenProps={this.props.navigation.state.params.name} />;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    margin: 20
  },
  text: {
    color: 'white'
  }
});
