// @flow strict
import { fireEvent, render } from '@testing-library/react';
import Avatar from './Avatar.js';

test('Avatar handles Image error by rendering the default avatar', () => {
  const { getByAltText, getByText } = render(<Avatar name="Name" src="example.com" />);
  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  fireEvent.error(getByAltText('Name'));

  // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
  expect(getByText('N')).toBeTruthy();
  expect(() => {
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByText('T');
  }).toThrow('Unable to find an element with the text: T');
});
