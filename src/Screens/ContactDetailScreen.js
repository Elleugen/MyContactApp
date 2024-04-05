import React, { useState } from 'react';
import { View, Image, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// import Task from './Task';
import Contact from '../Models/Contact';


const ContactDetailScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [photo, setPhoto] = useState('');

  const data = useSelector(state => state.data);

  // OLD NAVIGATION
  // const route = useRoute();
  // const { item } = route.params;

  const handleContactPreview = () => {
    console.log('Detail Contact:', firstName);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contactItem}>
        <TouchableOpacity>
          <View style={styles.bodyDataContainer} >
            <Image
              style={styles.logo}
              source={{
                uri: data.photo,
              }}
            />
            <Text>{data.firstName} {data.lastName} {'\n'} {data.age}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  contactItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  bodyDataContainer:{
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },

  logo: {
    width: 100,
    height: 100,
  },

  buttonsContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  updateButton: {
    backgroundColor: '#ff9d00',
    padding: 7,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 20,
    marginRight: 5,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 7,
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 20,
    marginRight: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ContactDetailScreen;