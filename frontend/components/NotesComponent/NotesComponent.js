import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  Modal,
  TextInput,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class NotesComponent extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      addNotesModalVisible: false,
      notesModalVisible: false,
      currentNote: {},
      noteToBeAdded: { title: '', content: '' },
      newNoteTitle: '',
      newNoteContent: ''
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <Button title={'Add Note'} onPress={() => params.handleNotes()} />
      ),
      title: 'Notes',
      tabBarLabel: ' ',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('/Users/kingatoki/Desktop/the-ark-church-of-sj/assets/icons8-holy-bible.png')}
          style={[styles.icon, { tintColor: tintColor }]}
        />
      )
    };
  };

  setAddNotesModalVisible = visible => {
    this.setState({ addNotesModalVisible: visible });
  };

  setNotesModalVisible = (visible, item) => {
    this.setState({ notesModalVisible: visible });
    this.setState({ currentNote: item });
  };

  addNote = () => {
    this.state.noteToBeAdded.title = this.state.newNoteTitle;
    this.state.noteToBeAdded.content = this.state.newNoteContent;
    const notes = this.state.notes;
    notes.push(this.state.noteToBeAdded);
    this.setState({
      noteToBeAdded: { title: '', content: '' },
      newNoteTitle: '',
      newNoteContent: '',
      notes: notes,
      addNotesModalVisible: false
    });
  };

  async deleteNote() {
    const index = this.state.notes.indexOf(this.state.currentNote);
    let notes = this.state.notes.slice();
    notes.splice(index, 1);
    this.setState({
      notes: notes,
      notesModalVisible: false
    });
  }
  editNote = () => {
    this.setState({
      newNoteTitle: this.state.currentNote.title,
      newNoteContent: this.state.currentNote.content,
      addNotesModalVisible: true,
      notesModalVisible: false
    });
    const index = this.state.notes.indexOf(this.state.currentNote);
    let notes = this.state.notes.slice();
    notes.splice(index, 1);
    console.log('notes after splice' + notes);
    this.setState({
      notes: notes
    });
  };

  cancel = () => {
    this.setState({
      addNotesModalVisible: false,
      newNoteTitle: '',
      newNoteContent: ''
    });
  };

  onChangeTitle(value) {
    this.setState({
      newNoteTitle: value
    });
  }
  onChangeContent(value) {
    this.setState({
      newNoteContent: value
    });
  }

  async componentDidMount() {
    try {
      let notes = await AsyncStorage.getItem('notes');
      if (notes !== null) {
        notes = JSON.parse(notes);
        this.setState({ notes: notes });
      } else {
        console.log('Notes was null');
        this.setState({
          notes: [
            { title: 'Create New Note (Press Me)', content: 'Sample content' }
          ]
        });
      }
    } catch (error) {
      console.log(`You done goofed because: ${error}`);
    }
    this.props.navigation.setParams({
      handleNotes: this.setAddNotesModalVisible
    });
  }
  async componentWillUnmount() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    try {
      await AsyncStorage.setItem('notes', stringifiedNotes);
    } catch (error) {
      console.log(`You done goofed because: ${error}`);
    }
  }
  async saveNotes() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    try {
      await AsyncStorage.setItem('notes', stringifiedNotes);
    } catch (error) {
      console.log(`You done goofed because: ${error}`);
    }
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginBottom: '5%'
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.notes}
          extraData={this.state}
          renderItem={({ item }) => (
            <View>
              <Text
                style={styles.itemText}
                onPress={() => {
                  this.setNotesModalVisible(true, item);
                }}
              >
                {item.title}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.addNotesModalVisible}
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
                  placeholder="Enter Title"
                  style={{
                    height: 40,
                    marginHorizontal: '5%',
                    borderColor: 'gray',
                    borderWidth: 1
                  }}
                  value={this.state.newNoteTitle}
                  onChangeText={value => this.onChangeTitle(value)}
                />

                <TextInput
                  placeholder="Enter Note"
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
                  value={this.state.newNoteContent}
                  onChangeText={value => this.onChangeContent(value)}
                />
                <View style={styles.modalButtons}>
                  <Button
                    title="Add"
                    onPress={() => {
                      this.addNote();
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.notesModalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: '10%' }}>
            <View>
              <View style={styles.noteTitleContainer}>
                <Text style={styles.noteTitleText}>
                  {this.state.currentNote.title}
                </Text>
              </View>
              <View style={styles.noteContentContainer}>
                <Text style={styles.noteContentText}>
                  {this.state.currentNote.content}
                </Text>
              </View>
              <View style={styles.modalButtons}>
                <Button
                  title="Done"
                  onPress={() => {
                    this.setNotesModalVisible(false, {});
                  }}
                />
                <Button
                  title="Edit"
                  onPress={() => {
                    this.editNote();
                  }}
                />
                <Button
                  title="Delete"
                  onPress={() => {
                    this.deleteNote();
                  }}
                />
              </View>
            </View>
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
  mainContainer: {
    marginTop: '5%'
  },
  itemText: {
    fontSize: 25,
    marginLeft: '5%'
  },
  noteTitleText: {
    fontSize: 30
  },
  noteContentText: {
    fontSize: 20,
    marginHorizontal: '5%'
  },
  modalButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  noteTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%'
  },
  noteContentContainer: {
    marginVertical: '20%',
    marginHorizontal: '5%',
    height: '50%',
    borderWidth: 1
  }
});
