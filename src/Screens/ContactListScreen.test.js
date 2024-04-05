import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactListScreen from './ContactListScreen';

describe('ContactListScreen Screen', () => {
    test('should add a new contact', () => {
      const { getByPlaceholderText, getByText } = render(<ContactListScreen />);
      const input = getByPlaceholderText('First Name..');
      const addButton = getByText('Add Contact');
  
      fireEvent.changeText(input, 'Test Contact');
      fireEvent.press(addButton);
  
      expect(getByText('Test Contact')).toBeTruthy();
    });
  
    // test('should display existing contact', () => {
    //   const { getByPlaceholderText, getByText } = render(<ContactListScreen />);
    //   const input = getByPlaceholderText('Enter a contact');
    //   const addButton = getByText('Add Contact');
  
    //   fireEvent.changeText(input, 'First Name..');
    //   fireEvent.press(addButton);
    //   fireEvent.changeText(input, 'Last Name..');
    //   fireEvent.press(addButton);
  
    //   expect(getByText('First Name..')).toBeTruthy();
    //   expect(getByText('Last Name..')).toBeTruthy();
    // });
  });