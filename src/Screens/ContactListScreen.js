import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { setData } from '../Redux/Actions';

const API_URL = 'https://contact.herokuapp.com/contact';

const ContactListScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const dispatch = useDispatch();
  
  // Fetch contacts from the API when the component mounts
  useEffect(() => {
    fetchContacts();
    // handleButtonBClick();
  }, []);

  //FETCHING
  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data.data);
      console.log('Contact refreshed!', item.id);
      console.log('Contact List:', data.data);
      ToastAndroid.show('Contact refreshed!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // ADD NEW CONTACT
  const addContact = async () => {
    try {
      ToastAndroid.show('Adding contact..', ToastAndroid.SHORT);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          photo,
        }),
      });
      if (response.ok) {
        // If the request is successful, fetch updated contacts
        await fetchContacts();
        // Clear input fields
        setFirstName('');
        setLastName('');
        setAge('');
        setPhoto('');
        ToastAndroid.show('Contact added!', ToastAndroid.SHORT);
      } else {
        console.error('Failed to add contact');
        ToastAndroid.show('Failed to add contact. Make sure all field filled!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      ToastAndroid.show('Error adding contact!', ToastAndroid.SHORT);
    }
  };

  // UPDATE 
  const updateContact = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          photo,
        }),
      });
      if (response.ok) {
        // If the request is successful, fetch updated contacts
        await fetchContacts();
        // Clear input fields
        setFirstName('');
        setLastName('');
        setAge('');
        setPhoto('');
        ToastAndroid.show('Contact updated!', ToastAndroid.SHORT);
      } else {
        console.error('Failed to update contact');
        ToastAndroid.show('Failed to update contact', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      ToastAndroid.show('Error updating contact!', ToastAndroid.SHORT);
    }
  };


  // DELETE CONTACT
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
      // const response = await fetch(API_URL + 'contact/'+ `${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If the request is successful, fetch updated contacts
        await fetchContacts();
        ToastAndroid.show('Contact deleted!', ToastAndroid.SHORT);
      } else {
        console.error('Failed to delete contact');
        ToastAndroid.show('Failed to delete contact!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      ToastAndroid.show('Error deleting contact!', ToastAndroid.SHORT);
    }
  };

  // const [isButtonAClicked, setIsButtonAClicked] = useState(false);
  const [addContactIsShowed, setAddContactIsShowed] = useState(false);
  const handleShow = () => {
    setAddContactIsShowed(true);
  };

  const handleClose = () => {
    setAddContactIsShowed(false);
  };

  const handleContactDetailNavigate = (item) => {
    dispatch(setData(item));
    console.log('Item detail:', item);
    navigation.navigate('ContactDetail');
    // , { data }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Contacts</Text> */}
      {!addContactIsShowed && 
        <TouchableOpacity onPress={handleShow}>
          {/* <Text style={styles.header}>++ Add new contacts.. </Text> */}
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{backgroundColor: 'grey', height: 2, flex: 1, alignSelf: 'center'}} />
            <Text style={{color: 'grey', fontWeight: 'bold', alignSelf:'center', paddingHorizontal:5, fontSize: 16 }}> + Add contact </Text>
            {/* <Text style={styles.header}>Close </Text> */}
            {/* <View style={{backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} /> */}
          </View>
        </TouchableOpacity>
      }
      {addContactIsShowed && 
      <SafeAreaView>
        <TouchableOpacity onPress={handleClose}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{backgroundColor: 'grey', height: 2, flex: 1, alignSelf: 'center'}} />
            <Text style={{color: 'grey', fontWeight: 'bold', alignSelf:'center', paddingHorizontal:5, fontSize: 16 }}> X Close </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name.."
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name.."
            value={lastName}
            onChangeText={setLastName}
          />
          <View style={styles.addContactLowerBody}>
            <TextInput
              style={styles.inputAge}
              placeholder="Age.."
              value={age}
              onChangeText={setAge}
            />
            <TextInput
              style={styles.inputPhoto}
              placeholder="Photo.."
              value={photo}
              onChangeText={setPhoto}
            />
          </View>
          <Button title="Add" onPress={addContact} />
        </View>
      </SafeAreaView>
      }
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SafeAreaView>
            <View style={styles.contactItem}>
              <TouchableOpacity onPress={() => {
                handleContactDetailNavigate(item)
              }}>
                <View style={styles.bodyDataContainer} >
                  <Image
                    style={styles.logo}
                    source={{
                      uri: item.photo,
                    }}
                  />
                  <Text style={styles.dataDetail}>{item.firstName} {item.lastName} - {item.age}</Text>
                </View>
                {/* ---------------------------------------- */}
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.updateButton} onPress={() => {
                    console.log('Item ID:', item.id);
                  }}
                  >
                    <Text style={styles.updateButtonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => {
                    deleteContact(item.id);
                    console.log('Item ID:', item.id);
                  }}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    // marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  inputAge: {
    marginBottom: 10,
    paddingHorizontal: '20%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  inputPhoto: {
    marginBottom: 10,
    paddingHorizontal: '20%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  addContactLowerBody:{
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'stretch'
  },

  contactItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  bodyDataContainer:{
    // justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  dataDetail:{
    padding: 15,
    fontWeight: 'bold',
  },

  buttonsContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  updateButton: {
    backgroundColor: '#ff9d00',
    padding: 5,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 15,
    marginRight: 5,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 5,
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 15,
    marginRight: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ContactListScreen;
