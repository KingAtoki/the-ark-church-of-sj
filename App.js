import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeComponent from './frontend/components/HomeComponent/HomeComponent';
import ContentComponent from './frontend/components/ContentComponent/ContentComponent';
import BibleTabComponent from './frontend/components/BibleTabComponent/BibleTabComponent';
import WelcomeTabComponent from './frontend/components/WelcomeTabComponent/WelcomeTabComponent';
import ChapterComponent from './frontend/components/BibleTabComponent/ChapterComponent';
import VersesComponent from './frontend/components/BibleTabComponent/VersesComponent';
import GroupsComponent from './frontend/components/GroupsComponent/GroupsComponent';
import NotesComponent from './frontend/components/NotesComponent/NotesComponent';
import TithesComponent from './frontend/components/TithesComponent/TithesComponent';
import MenuComponent from './frontend/components/MenuComponent/MenuComponent';
import MeetThePastorsComponent from './frontend/components/MeetThePastorsComponent/MeetThePastorComponent';
import EventsComponent from './frontend/components/EventsComponent/EventsComponent';
import ReviewsComponent from './frontend/components/ReviewsComponent/ReviewsComponent';
import KingdomClosetComponent from './frontend/components/KingdomClosetComponent/KingdomClosetComponent';

const Menu = StackNavigator({
  Menu: {
    screen: MenuComponent,
    navigationOptions: {
      title: 'Menu'
    }
  },
  MeetThePastors: {
    screen: MeetThePastorsComponent,
    navigationOptions: {
      title: 'Meet The Pastors'
    }
  },
  Events: {
    screen: EventsComponent,
    navigationOptions: {
      title: 'Events'
    }
  },
  Reviews: {
    screen: ReviewsComponent,
    navigationOptions: {
      title: 'Reviews'
    }
  },
  KingdomCloset: {
    screen: KingdomClosetComponent,
    navigationOptions: {
      title: 'Kingdom Closet'
    }
  }
});

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
const Tabs = TabNavigator({
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
  },
  MenuComponent: {
    screen: Menu
  }
});

const Routes = StackNavigator(
  {
    Home: { screen: HomeComponent },
    Content: { screen: Tabs }
  },
  { headerMode: 'none' }
);

export default class App extends Component {
  render() {
    return <Routes />;
  }
}
