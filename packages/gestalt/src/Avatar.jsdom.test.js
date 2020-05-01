// @flow strict
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Avatar from './Avatar.js';

test('Avatar handles Image error by rendering the default avatar', () => {
  const { getByAltText, getByText } = render(
    <Avatar name="Name" src="example.com" />
  );
  fireEvent.error(getByAltText('Name'));

  expect(getByText('N')).toBeTruthy();
  expect(() => {
    getByText('T');
  }).toThrow('Unable to find an element with the text: T');
});

test('Avatar handles Image error by rendering the default icon if setted', () => {
  const { getByAltText, getByRole } = render(
    <Avatar name="Name" src="example.com" __dangerouslyUseDefaultIcon />
  );
  fireEvent.error(getByAltText('Name'));

  expect(getByRole('img')).toBeTruthy();
});
