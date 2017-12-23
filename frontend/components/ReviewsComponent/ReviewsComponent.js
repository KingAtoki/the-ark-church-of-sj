import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
  Modal,
  TextInput
} from 'react-native';

let { height, width } = Dimensions.get('window');

var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyEvd4PvQslvlmrU' }).base(
  'appbSsbnI6uJ8Sy0V'
);

export default class ReviewsComponent extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerBackTitle: null,
      headerRight: (
        <Button
          title={'Write a Review'}
          onPress={() => params.handleReview()}
        />
      ),
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
      name: '',
      reviews: [],
      isReady: false,
      writeAReviewModalVisible: false,
      newReviewContent: ''
    };
  }

  addReview = () => {
    let name = this.state.name;
    let review = this.state.newReviewContent;
    let reviews = this.state.reviews;
    reviews.unshift({ name: name, review: review });
    base('Reviews').create(
      {
        Name: name,
        Review: review
      },
      function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Success!');
      }
    );
    this.setState({
      name: '',
      newReviewContent: '',
      reviews: reviews,
      writeAReviewModalVisible: false
    });
  };

  cancel = () => {
    this.setState({
      writeAReviewModalVisible: false,
      newReviewContent: ''
    });
  };

  onChangeReviewContent(value) {
    this.setState({
      newReviewContent: value
    });
  }

  setWriteAReviewModalVisible = visible => {
    this.setState({ writeAReviewModalVisible: visible });
  };

  writeAReview = async () => {
    try {
      let name = await AsyncStorage.getItem('name');
      if (name !== null) {
        this.setState({ name: name });
        this.setWriteAReviewModalVisible(true);
      } else {
        Alert.alert(
          'Not Logged In!',
          'Please log in to write a review!',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ handleReview: this.writeAReview });
  }

  async componentWillMount() {
    let name = '';
    let review = '';
    let reviews = this.state.reviews;
    try {
      await base('Reviews')
        .select({
          // Selecting the records in Grid view:
          view: 'Grid view',
          sort: [{ field: 'Date', direction: 'desc' }]
        })
        .eachPage(
          function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
              name = record.get('Name');
              review = record.get('Review');
              reviews.push({ name: name, review: review });
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
            this.setState({ reviews: reviews });
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
          data={this.state.reviews}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  marginVertical: '5%',
                  marginHorizontal: '5%'
                }}
              >
                <Text style={{ fontSize: 20 }}>{item.review}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontStyle: 'italic',
                    marginLeft: '5%',
                    marginBottom: '5%'
                  }}
                >
                  Author: {item.name}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.writeAReviewModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: '10%' }}>
            <TouchableWithoutFeedback
              style={{ height: '100%', width: '100%' }}
              onPress={Keyboard.dismiss}
            >
              <View>
                <TextInput
                  placeholder="Write a Review"
                  multiline={true}
                  numberOfLines={4}
                  maxHeight={350}
                  onEndEditing={Keyboard.dismiss}
                  style={{
                    height: '80%',
                    marginTop: '10%',
                    marginHorizontal: '5%',
                    borderColor: 'gray',
                    borderWidth: 1
                  }}
                  value={this.state.newReviewContent}
                  onChangeText={value => this.onChangeReviewContent(value)}
                />
                <View style={styles.modalButtons}>
                  <Button
                    title="Done"
                    onPress={() => {
                      this.addReview();
                    }}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => {
                      this.cancel();
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  modalButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
