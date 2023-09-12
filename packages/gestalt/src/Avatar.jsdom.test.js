// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import Avatar from './Avatar.js';

test('Avatar handles Image error by rendering the default avatar', () => {
  render(<Avatar name="Name" src="example.com" />);
  fireEvent.error(screen.getByAltText('Name'));

  expect(screen.getByText('N')).toBeTruthy();
  expect(() => {
    screen.getByText('T');
  }).toThrow('Unable to find an element with the text: T');
});
