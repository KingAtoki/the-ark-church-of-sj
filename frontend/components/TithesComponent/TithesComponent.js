import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  AsyncStorage,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

import axios from 'axios';

const stripe = require('stripe-client')('pk_test_Ns8vsLo7uM2it2zTj5hogWpT');
axios.defaults.headers.common[
  'Authorization'
] = `Bearer sk_test_fYEhpEPdWve0w9nLJz89OcGE`;

let { height, width } = Dimensions.get('window');

const tithesMessages = [
  'Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver. \n\n2 Corinthians 9:7 ',
  'Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it. \n\nMalachi 3:10 ',
  'There is that scattereth, and yet increaseth; and there is that withholdeth more than is meet, but it tendeth to poverty. \n\nProverbs 11:24',
  'Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again. \n\nLuke 6:38',
  'And Jesus sat over against the treasury, and beheld how the people cast money into the treasury: and many that were rich cast in much. \n\nMark 12:41-44',
  'But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully. \n\n2 Corinthians 9:6-7',
  'Honour the LORD with thy substance, and with the firstfruits of all thine increase: \n\nProverbs 3:9',
  'Will a man rob God? Yet ye have robbed me. But ye say, Wherein have we robbed thee? In tithes and offerings. \n\nMalachi 3:8-10',
  'Honour the LORD with thy substance, and with the firstfruits of all thine increase: \n\nProverbs 3:9-10',
  'Offer the sacrifices of righteousness, and put your trust in the LORD. \n\nPsalms 4:5',
  'Take heed that ye do not your alms before men, to be seen of them: otherwise ye have no reward of your Father which is in heaven. \n\nMatthew 6:1-4',
  'I have shewed you all things, how that so labouring ye ought to support the weak, and to remember the words of the Lord Jesus, how he said, It is more blessed to give than to receive. \n\nActs 20:35',
  'He that is faithful in that which is least is faithful also in much: and he that is unjust in the least is unjust also in much. \n\nLuke 16:10',
  'And he looked up, and saw the rich men casting their gifts into the treasury. \n\nLuke 21:1-4',
  'For where your treasure is, there will your heart be also. \n\nMatthew 6:21'
];
let message = '';
export default class TithesComponent extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: '',
      amount: '',
      addCardModalVisible: false,
      paymentModalVisible: false,
      alreadyACustomer: false,
      loggedIn: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      gesturesEnabled: false,
      header: null,
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-donate.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
  };

  setCardModalVisible = visible => {
    if (this.state.alreadyACustomer === true) {
      Alert.alert(
        'Wait a second.',
        'You are already set up.',
        [
          {
            text: 'OK',
            onPress: () => this.setState({ paymentModalVisible: visible })
          }
        ],
        { cancelable: false }
      );
    }
    this.setState({ addCardModalVisible: visible });
  };
  setPaymentModalVisible = visible => {
    if (this.state.alreadyACustomer === false) {
      Alert.alert(
        'Sorry',
        'Please start with Set Payment Method.',
        [
          {
            text: 'OK',
            onPress: () => this.setState({ addCardModalVisible: visible })
          }
        ],
        { cancelable: false }
      );
      return;
    } else {
      this.setState({ paymentModalVisible: visible });
    }
  };

  async makePayment() {
    if (this.state.loggedIn === false) {
      Alert.alert(
        'Sorry',
        'Please log in to Give',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    if (this.state.alreadyACustomer === false) {
      Alert.alert(
        'Sorry',
        'Please start with Add Payment Method.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    if (
      this.state.amount === '0' ||
      this.state.amount === '' ||
      this.state.amount === '$'
    ) {
      Alert.alert(
        'Wait a second!',
        'Please give something more $0.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    } else if (this.state.amount > 3000) {
      Alert.alert(
        'We appreciate the generosity.',
        'Please enter an amount less than $3001.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    } else {
      try {
        const customerID = await AsyncStorage.getItem('customerID');
        const name = await AsyncStorage.getItem('name');
        if (customerID !== null) {
          // We have an id
        } else {
          // we do not have an id
        }
        try {
          axios({
            method: 'post',
            url: 'https://api.stripe.com/v1/charges',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
              amount: Math.floor(this.state.amount * 100),
              currency: 'usd',
              customer: `${customerID}`,
              description: `Charge for ${name}`
            }
          })
            .then(response => {
              Alert.alert(
                'Success',
                'Thank you for giving ❤️',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      this.setState({
                        amount: '',
                        paymentModalVisible: false
                      })
                  }
                ],
                { cancelable: false }
              );
            })
            .catch(err => {
              console.log('Axios error:' + err);
            });
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async createCustomer() {
    if (this.state.alreadyACustomer !== false) {
      Alert.alert(
        'No need.',
        'Payment method already set up.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    if (this.state.loggedIn === false) {
      Alert.alert(
        'Sorry',
        'Please log in to Give',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    }
    if (
      this.state.number === '' ||
      this.state.exp_month === '' ||
      this.state.exp_year === '' ||
      this.state.cvc === '' ||
      this.state.name === '' ||
      this.state.number.length !== 16
    ) {
      Alert.alert(
        'Wait a second!',
        'Make sure you completed all fields and they are correct.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      return;
    } else {
      try {
        let customerID = await AsyncStorage.getItem('customerID');
        if (customerID !== null) {
          Alert.alert(
            'No Need',
            'You have done this before, sorry I didnt tell you earlier.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      } catch (err) {
        console.log(err);
      }
      const name = await AsyncStorage.getItem('name');
      const information = {
        card: {
          number: this.state.number,
          exp_month: this.state.exp_month,
          exp_year: this.state.exp_year,
          cvc: this.state.cvc,
          name: name
        }
      };
      let card = await stripe.createToken(information);
      let paymentToken = card.id;
      axios({
        method: 'post',
        url: 'https://api.stripe.com/v1/customers',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          description: name,
          source: paymentToken
        }
      })
        .then(async response => {
          const customerID = response.data.id;
          try {
            await AsyncStorage.setItem('customerID', customerID);
          } catch (err) {
            console.log('You couldnt save ID');
          }
          this.setState({
            addCardModalVisible: false,
            alreadyACustomer: true
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  cancel = () => {
    this.setState({
      addCardModalVisible: false,
      paymentModalVisible: false,
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: '',
      amount: ''
    });
  };

  onChangeNumber(value) {
    this.setState({
      number: value
    });
  }
  onChangeMonth(value) {
    this.setState({
      exp_month: value
    });
  }
  onChangeYear(value) {
    this.setState({
      exp_year: value
    });
  }
  onChangeCVC(value) {
    this.setState({
      cvc: value
    });
  }
  onChangeAmount(value) {
    this.setState({
      amount: value
    });
  }

  async componentDidMount() {
    // This loads the 'scripture' that will be displayed
    message = tithesMessages[Math.floor(Math.random() * 15)];
    try {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        this.setState({
          loggedIn: false
        });
      } else {
        this.setState({
          loggedIn: true
        });
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const ID = await AsyncStorage.getItem('customerID');
      if (ID !== null) {
        this.setState({ alreadyACustomer: true });
      } else {
        this.setState({ alreadyACustomer: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%'
        }}
      >
        <Text style={{ fontSize: 30, marginTop: '5%' }}>
          Tithes and Offerings
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: '5%'
            }}
          >
            <View style={{ height: width * 0.8, width: width * 0.8 }}>
              <View
                style={{
                  marginTop: '5%',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5
                }}
              >
                <Image
                  source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/GoldGiftBox.jpeg')}
                  style={{ height: width * 0.8, width: width * 0.8 }}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontStyle: 'italic', padding: '5%' }}>
              {message}
            </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 90,
                margin: '5%'
              }}
              onPress={() => this.setPaymentModalVisible(true)}
            >
              <Text style={{ color: 'white' }}>Ready to Give</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 90,
                margin: '5%'
              }}
              onPress={() => this.setCardModalVisible(true)}
            >
              <Text style={{ color: 'white' }}>Set Payment Method</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.addCardModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={{ marginTop: '10%' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>Card Details</Text>
              </View>
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: '5%'
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: '20%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                  >
                    <Text>Card No.</Text>
                  </View>
                  <TextInput
                    placeholder="4242424242424242"
                    style={{
                      height: 50,
                      width: '75%',
                      paddingLeft: '5%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                      elevation: 5
                    }}
                    value={this.state.number}
                    keyboardType="numeric"
                    maxLength={16}
                    onChangeText={value => this.onChangeNumber(value)}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: '5%'
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: '20%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                  >
                    <Text>Exp Mo.</Text>
                  </View>
                  <TextInput
                    placeholder="02"
                    style={{
                      height: 50,
                      width: '75%',
                      paddingLeft: '5%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                    value={this.state.exp_month}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={value => this.onChangeMonth(value)}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: '5%'
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: '20%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                  >
                    <Text>Exp Yr.</Text>
                  </View>
                  <TextInput
                    placeholder="21"
                    style={{
                      height: 50,
                      width: '75%',
                      paddingLeft: '5%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                    value={this.state.exp_year}
                    keyboardType="numeric"
                    maxLength={2}
                    onChangeText={value => this.onChangeYear(value)}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: '5%'
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                      width: '20%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                  >
                    <Text>CVC</Text>
                  </View>
                  <TextInput
                    placeholder="999"
                    style={{
                      height: 50,
                      width: '75%',
                      paddingLeft: '5%',
                      borderColor: 'gray',
                      borderWidth: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5
                    }}
                    value={this.state.cvc}
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={value => this.onChangeCVC(value)}
                  />
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'blue',
                      width: '20%',
                      padding: 10,
                      marginRight: '5%',
                      borderRadius: 90
                    }}
                    underlayColor="blue"
                    onPress={() => {
                      this.createCustomer();
                    }}
                  >
                    <Text style={{ color: 'white' }}>Add</Text>
                  </TouchableOpacity>
                  <Button
                    title="Cancel"
                    onPress={() => {
                      this.cancel();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.paymentModalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={{ marginTop: '10%' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                  placeholder="$"
                  placeholderTextColor="black"
                  fontSize={50}
                  autoFocus={true}
                  caretHidden={true}
                  style={{
                    textAlign: 'center',
                    height: 100,
                    width: '100%',
                    marginHorizontal: '5%'
                  }}
                  value={`$${this.state.amount}`}
                  keyboardType="numeric"
                  onChangeText={value => this.onChangeAmount(value.slice(1))}
                />
                <View style={styles.buttons}>
                  <Button
                    title="Give"
                    onPress={() => {
                      this.makePayment();
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
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
