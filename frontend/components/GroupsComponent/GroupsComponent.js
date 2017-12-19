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

export default class GroupsComponent extends Component {
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
    arkAngelsModalVisible: false,
    kingdomKidsModalVisible: false,
    gpgModalVisible: false,
    kingdomClosetModalVisible: false
  };

  setArkAngelsModalVisible = visible => {
    this.setState({ arkAngelsModalVisible: visible });
  };
  setKingdomKidsModalVisible = visible => {
    this.setState({ kingdomKidsModalVisible: visible });
  };
  setGpgModalVisible = visible => {
    this.setState({ gpgModalVisible: visible });
  };
  setKingdomClosetModalVisible = visible => {
    this.setState({ kingdomClosetModalVisible: visible });
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
        <Text style={{ fontSize: 40, marginTop: '5%' }}>Groups</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.arkAngels}>
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/ArkAngels.png')}
                  style={styles.arkAngelsImage}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Ministry for Ages 3-8
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setArkAngelsModalVisible(true);
                }}
              >
                <Text>Learn more...</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kingdomKids}>
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/KingdomKids.png')}
                  style={styles.kingdomKidsImage}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Ministry for Ages 9-12
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setKingdomKidsModalVisible(true);
                }}
              >
                <Text>Learn more...</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.gpg}>
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/GPG.png')}
                  style={styles.gpgImage}
                />
              </View>
              <Text style={{ marginVertical: '5%', fontStyle: 'italic' }}>
                Ministry for Women
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setGpgModalVisible(true);
                }}
              >
                <Text>Learn more...</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.kingdomCloset}>
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/KingdomCloset.png')}
                  style={styles.kingdomClosetImage}
                />
              </View>
              <Text style={{ marginTop: '5%', fontStyle: 'italic' }}>
                Ministry Supporting
              </Text>
              <Text style={{ marginBottom: '5%', fontStyle: 'italic' }}>
                our Homeless
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => {
                  this.setKingdomClosetModalVisible(true);
                }}
              >
                <Text>Learn more...</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.arkAngelsModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/ArkAngels.png')}
                  style={styles.arkAngelsImage}
                />
              </View>
              <View>
                <Text style={styles.descriptionText}>
                  Our Ark Angels ministry is for our children from ages 3-8. We
                  believe learning to know and love God starts from when we are
                  young so we are able to build a strong foundation.
                </Text>
                <Button
                  title="Done"
                  onPress={() => {
                    this.setArkAngelsModalVisible(
                      !this.state.arkAngelsModalVisible
                    );
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.kingdomKidsModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/KingdomKids.png')}
                  style={styles.kingdomKidsImage}
                />
              </View>
              <View>
                <Text style={styles.descriptionText}>
                  Kingdom Kids is our ministry for our 9-12 year olds.
                  Continuing on from the foundation we set while our young
                  people were apart of our Ark Angels Ministry, we strengthen
                  our children's desire to know and become closer to God.
                </Text>
                <Button
                  title="Done"
                  onPress={() => {
                    this.setKingdomKidsModalVisible(
                      !this.state.kingdomKidsModalVisible
                    );
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.gpgModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/GPG.png')}
                  style={styles.gpgImage}
                />
              </View>
              <View>
                <Text style={styles.descriptionText}>
                  Our Girl Power Group focuses on empowering our women and
                  continually shaping our women to be leaders of the community.
                </Text>
                <Button
                  title="Done"
                  onPress={() => {
                    this.setGpgModalVisible(!this.state.gpgModalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.kingdomClosetModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
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
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/KingdomCloset.png')}
                  style={styles.kingdomClosetImage}
                />
              </View>
              <View>
                <Text style={styles.descriptionText}>
                  Our Kingdom Closet is our ministry dedicated to serving our
                  homeless community. We aim to support our homeless brothers
                  and sisters in any way we can.
                </Text>
                <Button
                  title="Done"
                  onPress={() => {
                    this.setKingdomClosetModalVisible(
                      !this.state.kingdomClosetModalVisible
                    );
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
  arkAngels: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  kingdomKids: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  gpg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  kingdomCloset: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: 22
  },
  arkAngelsImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  kingdomKidsImage: {
    width: width * 0.8,
    height: width * 0.8
  },

  gpgImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  kingdomClosetImage: {
    width: width * 0.8,
    height: width * 0.8
  },
  descriptionText: {
    flexWrap: 'wrap',
    margin: '10%',
    fontSize: 20
  }
});
