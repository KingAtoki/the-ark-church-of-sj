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
import { Video } from 'expo';

let { height, width } = Dimensions.get('window');

const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyEvd4PvQslvlmrU' }).base(
  'apph5IQPkWh9tEcTg'
);

let videos = [];
export default class VideoComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isReady: false,
      videos: []
    };
  }

  async componentWillMount() {
    let title = '';
    let url = '';
    let speaker = '';
    videos = this.state.videos;
    try {
      await base('Imported table')
        .select({
          view: 'Grid view'
        })
        .eachPage(
          function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(record => {
              title = record.fields.Title;
              url = record.fields.Sermon[0].url;
              speaker = record.fields.Speaker;
              videos.push({ title: title, url: url, speaker: speaker });
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
            this.setState({ videos: videos });
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
        <Text style={{ fontSize: 30, marginLeft: '5%', marginTop: '5%' }}>
          Sermons
        </Text>

        <FlatList
          style={{ marginBottom: height * 0.15 }}
          showsVerticalScrollIndicator={false}
          data={this.state.videos}
          extraData={this.state}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  marginVertical: '5%',
                  marginLeft: '5%'
                }}
              >
                <Text style={{ fontSize: 20 }}>{item.title}</Text>
              </View>
              <View
                style={{
                  marginBottom: '10%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Video
                  source={{
                    uri: item.url
                  }}
                  rate={1.0}
                  volume={1.0}
                  muted={false}
                  resizeMode="cover"
                  useNativeControls={true}
                  style={{ width: width * 0.9, height: 200 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontStyle: 'italic',
                    marginLeft: '5%',
                    marginBottom: '5%'
                  }}
                >
                  Speaker: {item.speaker}
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
