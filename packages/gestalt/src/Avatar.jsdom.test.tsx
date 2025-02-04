import { fireEvent, render, screen } from '@testing-library/react';
import Avatar from './Avatar';

test('Avatar handles Image error by rendering the default avatar', () => {
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(<Avatar name="Name" src="example.com" />);
  expect(error.mock.calls[0]![0]).toEqual(
    expect.stringContaining('Warning: React does not recognize the `%s` prop on a DOM element'),
  );
  expect(error.mock.calls[0]![1]).toEqual(expect.stringContaining('fetchPriority'));
  fireEvent.error(screen.getByAltText('Name'));

  expect(screen.getByText('N')).toBeTruthy();
  expect(() => {
    screen.getByText('T');
  }).toThrow('Unable to find an element with the text: T');
});
