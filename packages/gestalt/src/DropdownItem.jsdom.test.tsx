import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown.Item', () => {
  const onSelectMock = jest.fn<
    [
      {
        event: React.ChangeEvent<HTMLInputElement>;
        item: {
          label: string;
          subtext?: string;
          value: string;
        };
      },
    ],
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();

  test('calls onSelect when Item clicked', () => {
    render(
      <Dropdown.Item
        badge={{ text: 'New' }}
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    screen.getByText('Item 4').click();
    expect(onSelectMock).toHaveBeenCalled();
  });

  test('adds badge', () => {
    render(
      <Dropdown.Item
        badge={{ text: 'Beta Badge' }}
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('Beta Badge')).toBeInTheDocument();
  });

  test('adds avatar', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Dropdown.Item
        avatar={{
          name: 'Ayesha',
          accessibilityLabel: 'Ayesha avatar',
          src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          color: 1,
          size: 'sm',
        }}
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    // This error is expected because of a change in React 19 that now only accepts fetchPriority in camel case while in react 18 it only accepts it in lowercase
    expect(error.mock.calls[0]![0]).toEqual(
      expect.stringContaining('Warning: React does not recognize the `%s` prop on a DOM element'),
    );
    expect(error.mock.calls[0]![1]).toEqual(expect.stringContaining('fetchPriority'));
    expect(screen.getByAltText('Ayesha avatar')).toBeInTheDocument();
  });

  test('adds selected icon when item is selected', () => {
    render(
      <Dropdown.Item
        badge={{ text: 'New' }}
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
        selected={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { name: /Selected Item/i })).toBeInTheDocument();
  });
});
