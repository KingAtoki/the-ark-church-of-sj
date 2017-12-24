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
  Dimensions
} from 'react-native';

import { StackNavigator } from 'react-navigation';

let { height, width } = Dimensions.get('window');

export default class KingdomClosetComponent extends Component {
  static navigationOptions = {
    gesturesEnabled: false,
    header: null,
    tabBarLabel: ' ',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-user-groups.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  state = {
    shirtModalVisible: false,
    pantsModalVisible: false,
    shoesModalVisible: false,
    accessoriesModalVisible: false,
    foodModalVisible: false
  };

  setShirtModalVisible = visible => {
    this.setState({ shirtModalVisible: visible });
  };
  setPantsModalVisible = visible => {
    this.setState({ pantsModalVisible: visible });
  };
  setShoesModalVisible = visible => {
    this.setState({ shoesModalVisible: visible });
  };
  setAccessoriesModalVisible = visible => {
    this.setState({ accessoriesModalVisible: visible });
  };
  setFoodModalVisible = visible => {
    this.setState({ foodModalVisible: visible });
  };
  render() {
    return (
      <View
        style={{
          marginTop: 22,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 40, marginTop: '5%' }}>Kingdom Closet</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.shirt}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5
                }}
              >
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/shirt.png')}
                  style={styles.shirtImage}
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
            <View style={styles.pants}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5
                }}
              >
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/pants.png')}
                  style={styles.pantsImage}
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
            <View style={styles.shoes}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5
                }}
              >
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/shoes.png')}
                  style={styles.shoesImage}
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
            <View style={styles.accessories}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5
                }}
              >
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/accessories.png')}
                  style={styles.accessoriesImage}
                />
              </View>
              <Text style={{ marginTop: '5%', fontStyle: 'italic' }}>
                Accessories
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
            <View style={styles.food}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5
                }}
              >
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/food.png')}
                  style={styles.foodImage}
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
            <ScrollView>
              <View
                style={{
                  marginTop: 22,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View
                  style={{
                    marginTop: 22,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                  }}
                >
                  <Image
                    source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/shirt.png')}
                    style={styles.shirtImage}
                  />
                </View>
                <View>
                  <Text style={styles.descriptionText}>
                    Here is where the Images for the clothes will go.
                  </Text>
                  <Button
                    title="Done"
                    onPress={() => {
                      this.setShirtModalVisible(!this.state.shirtModalVisible);
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.pantsModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <ScrollView>
              <View
                style={{
                  marginTop: 22,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View
                  style={{
                    marginTop: 22,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                  }}
                >
                  <Image
                    source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/pants.png')}
                    style={styles.pantsImage}
                  />
                </View>
                <View>
                  <Text style={styles.descriptionText}>
                    Images for the pants will go here
                  </Text>
                  <Button
                    title="Done"
                    onPress={() => {
                      this.setPantsModalVisible(!this.state.pantsModalVisible);
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.shoesModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <ScrollView>
              <View
                style={{
                  marginTop: 22,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View
                  style={{
                    marginTop: 22,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                  }}
                >
                  <Image
                    source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/shoes.png')}
                    style={styles.shoesImage}
                  />
                </View>
                <View>
                  <Text style={styles.descriptionText}>
                    Images for the shoes
                  </Text>
                  <Button
                    title="Done"
                    onPress={() => {
                      this.setShoesModalVisible(!this.state.shoesModalVisible);
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.accessoriesModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <ScrollView>
              <View
                style={{
                  marginTop: 22,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View
                  style={{
                    marginTop: 22,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                  }}
                >
                  <Image
                    source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/accessories.png')}
                    style={styles.accessoriesImage}
                  />
                </View>
                <View>
                  <Text style={styles.descriptionText}>
                    Images for accessories
                  </Text>
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
            </ScrollView>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.foodModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <ScrollView>
              <View
                style={{
                  marginTop: 22,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View
                  style={{
                    marginTop: 22,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5
                  }}
                >
                  <Image
                    source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/food.png')}
                    style={styles.foodImage}
                  />
                </View>
                <View>
                  <Text style={styles.descriptionText}>
                    Here is where the Images for the food will go.
                  </Text>
                  <Button
                    title="Done"
                    onPress={() => {
                      this.setFoodModalVisible(!this.state.foodModalVisible);
                    }}
                  />
                </View>
              </View>
            </ScrollView>
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
  shirt: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  pants: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  shoes: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  accessories: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  food: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  shirtImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  pantsImage: {
    width: width * 0.8,
    height: width * 0.8
  },

  shoesImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  accessoriesImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  foodImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  descriptionText: {
    flexWrap: 'wrap',
    margin: '10%',
    fontSize: 20
  }
});
