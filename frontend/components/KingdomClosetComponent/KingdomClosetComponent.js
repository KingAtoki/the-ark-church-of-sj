import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Alert
} from 'react-native';

import { StackNavigator } from 'react-navigation';

const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'keyEvd4PvQslvlmrU' }).base(
  'appfuoZiqfimLOYcQ'
);

let { height, width } = Dimensions.get('window');

export default class KingdomClosetComponent extends Component {
  static navigationOptions = {
    gesturesEnabled: false,
    header: null,
    tabBarLabel: ' ',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-menu-50.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  state = {
    shirtModalVisible: false,
    pantsModalVisible: false,
    shoesModalVisible: false,
    accessoriesModalVisible: false,
    foodModalVisible: false,
    shirts: [],
    pants: [],
    shoes: [],
    accessories: [],
    food: [],
    isReady: false
  };

  setShirtModalVisible = visible => {
    if (this.state.shirts == 'Nothing available at this time.') {
      Alert.alert(
        'Sorry.',
        'Nothing available at this time.',
        [
          {
            text: 'OK',
            onPress: () => console.log('ok')
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ shirtModalVisible: visible });
    }
  };
  setPantsModalVisible = visible => {
    if (this.state.pants == 'Nothing available at this time.') {
      Alert.alert(
        'Sorry.',
        'Nothing available at this time.',
        [
          {
            text: 'OK',
            onPress: () => console.log('ok')
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ pantsModalVisible: visible });
    }
  };
  setShoesModalVisible = visible => {
    if (this.state.shoes == 'Nothing available at this time.') {
      Alert.alert(
        'Sorry.',
        'Nothing available at this time.',
        [
          {
            text: 'OK',
            onPress: () => console.log('ok')
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ shoesModalVisible: visible });
    }
  };
  setAccessoriesModalVisible = visible => {
    if (this.state.accessories == 'Nothing available at this time.') {
      Alert.alert(
        'Sorry.',
        'Nothing available at this time.',
        [
          {
            text: 'OK',
            onPress: () => console.log('ok')
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ accessoriesModalVisible: visible });
    }
  };
  setFoodModalVisible = visible => {
    if (this.state.food == 'Nothing available at this time.') {
      Alert.alert(
        'Sorry.',
        'Nothing available at this time.',
        [
          {
            text: 'OK',
            onPress: () => console.log('ok')
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({ foodModalVisible: visible });
    }
  };

  componentDidMount = async () => {
    let shirts = [];
    let pants = [];
    let shoes = [];
    let accessories = [];
    let food = [];
    try {
      base('Items')
        .select({
          view: 'Grid view'
        })
        .eachPage(
          function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
              switch (record.fields.Item) {
                case 'Shirts':
                  if (record.fields.Image == undefined) {
                    shirts.push('Nothing available at this time.');
                  } else {
                    for (let i = 0; i < record.fields.Image.length; i++) {
                      shirts.push(record.fields.Image[i].url);
                    }
                  }
                  break;
                case 'Pants':
                  if (record.fields.Image == undefined) {
                    pants.push('Nothing available at this time.');
                  } else {
                    for (let i = 0; i < record.fields.Image.length; i++) {
                      pants.push(record.fields.Image[i].url);
                    }
                  }
                  break;
                case 'Shoes':
                  if (record.fields.Image == undefined) {
                    shoes.push('Nothing available at this time.');
                  } else {
                    for (let i = 0; i < record.fields.Image.length; i++) {
                      shoes.push(record.fields.Image[i].url);
                    }
                  }
                  break;
                case 'Accessories':
                  if (record.fields.Image == undefined) {
                    accessories.push('Nothing available at this time.');
                  } else {
                    for (let i = 0; i < record.fields.Image.length; i++) {
                      accessories.push(record.fields.Image[i].url);
                    }
                  }
                  break;
                case 'Food':
                  if (record.fields.Image == undefined) {
                    food.push('Nothing available at this time.');
                  } else {
                    for (let i = 0; i < record.fields.Image.length; i++) {
                      food.push(record.fields.Image[i].url);
                    }
                  }
                  break;
                default:
                  console.log('I did not read any of that');
                  break;
              }
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
            } else {
              this.setState({
                shirts: shirts,
                pants: pants,
                shoes,
                shoes,
                accessories: accessories,
                food: food
              });
              this.setState({ isReady: true });
            }
          })
        );
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    if (!this.state.isReady) {
      return (
        <View style={styles.mainModalView}>
          <Text style={{ fontSize: 40, marginTop: '5%' }}>Kingdom Closet</Text>
          <View style={{ marginTop: '10%' }}>
            <ActivityIndicator size="small" color="grey" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.mainModalView}>
        <Text style={{ fontSize: 40, marginTop: '5%' }}>Kingdom Closet</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.mainView}>
              <View style={styles.shadowStyle}>
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/shirt.png')}
                  style={styles.image}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Shirts
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setShirtModalVisible(true);
                }}
              >
                <Text>See What's Available</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
              <View style={styles.shadowStyle}>
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/pants.png')}
                  style={styles.image}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Pants
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setPantsModalVisible(true);
                }}
              >
                <Text>See What's Available</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.mainView}>
              <View style={styles.shadowStyle}>
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/shoes.png')}
                  style={styles.image}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Shoes
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setShoesModalVisible(true);
                }}
              >
                <Text>See What's Available</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
              <View style={styles.shadowStyle}>
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/accessories.png')}
                  style={styles.image}
                />
              </View>
              <Text style={{ marginTop: '5%', fontStyle: 'italic' }}>
                Accessories/Extras
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setAccessoriesModalVisible(true);
                }}
              >
                <Text>See What's Available</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
              <View style={styles.shadowStyle}>
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/food.png')}
                  style={styles.image}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Food
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setFoodModalVisible(true);
                }}
              >
                <Text>See What's Available</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.shirtModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={styles.mainModalView}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.shirts}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item }}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index}
                />
                <Button
                  title="Done"
                  onPress={() => {
                    this.setShirtModalVisible(!this.state.shirtModalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.pantsModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={styles.mainModalView}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.pants}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item }}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index}
                />
                <Button
                  title="Done"
                  onPress={() => {
                    this.setPantsModalVisible(!this.state.pantsModalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.shoesModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={styles.mainModalView}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.shoes}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item }}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index}
                />
                <Button
                  title="Done"
                  onPress={() => {
                    this.setShoesModalVisible(!this.state.shoesModalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.accessoriesModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={styles.mainModalView}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.accessories}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item }}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index}
                />
                <Button
                  title="Done"
                  onPress={() => {
                    this.setAccessoriesModalVisible(
                      !this.state.accessoriesModalVisible
                    );
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.foodModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={styles.mainModalView}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.food}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item }}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index}
                />
                <Button
                  title="Done"
                  onPress={() => {
                    this.setFoodModalVisible(!this.state.foodModalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.8,
    marginVertical: '10%'
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  learnMoreButton: {
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 90
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  mainModalView: {
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width * 0.8,
    height: width * 0.8
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  descriptionText: {
    flexWrap: 'wrap',
    margin: '10%',
    fontSize: 20
  }
});
