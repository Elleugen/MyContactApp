import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ContactDetailScreen from './ContactDetailScreen';

// describe('ContactDetailScreen Screen', () => {
//     test('should add a new contact', () => {
//       const { getByPlaceholderText, getByText } = render(<ContactDetailScreen />);
//       const input = getByPlaceholderText('First Name..');
//       const addButton = getByText('Add Contact');
  
//       fireEvent.changeText(input, 'Test Contact');
//       fireEvent.press(addButton);
  
//       expect(getByText('Test Contact')).toBeTruthy();
//     });
//   });