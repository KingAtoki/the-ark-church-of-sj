import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import moment from 'moment';

let { height, width } = Dimensions.get('window');

const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyEvd4PvQslvlmrU' }).base(
  'appM0Dz0vXZlndEcA'
);

export default class EventsComponent extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
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
  constructor() {
    super();
    this.state = {
      events: [],
      isReady: false
    };
  }

  async componentWillMount() {
    let eventName = '';
    let eventDescription = '';
    let date = '';
    let events = this.state.events;
    try {
      await base('Events')
        .select({
          // Selecting the records in Grid view:
          view: 'Grid view'
        })
        .eachPage(
          function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
              eventName = record.get('Event');
              eventDescription = record.get('Notes');
              date = moment(record.get('Date')).format('MMMM Do YYYY');
              events.push({
                eventName: eventName,
                eventDescription: eventDescription,
                date: date
              });
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
          },
          (done = err => {
            if (err) {
              console.error(err);
              return;
            }
            this.setState({ events: events });
            this.setState({ isReady: true });
          })
        );
    } catch (err) {
      console.log(err);
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 500,
          backgroundColor: '#CED0CE',
          marginBottom: '5%'
        }}
      />
    );
  };

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ marginTop: '10%' }}>
          <ActivityIndicator size="small" color="grey" />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.events}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  marginVertical: '5%',
                  marginLeft: '5%'
                }}
              >
                <Text style={{ fontSize: 20 }}>{item.eventName}</Text>
              </View>
              <View
                style={{
                  marginBottom: '10%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: 20 }}>{item.eventDescription}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontStyle: 'italic',
                    marginLeft: '5%',
                    marginBottom: '5%'
                  }}
                >
                  Date: {item.date}
                </Text>
              </View>
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
  icon: {
    width: 30,
    height: 30
  }
});
