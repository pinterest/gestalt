import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown.Link', () => {
  const onClickMock = jest.fn<
    [
      {
        dangerouslyDisableOnNavigation: () => void;
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        mobileOnDismissStart: () => void;
      },
    ],
    // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    undefined
  >();

  test('calls onClick when Item clicked', () => {
    render(
      <Dropdown.Link
        badge={{ text: 'New' }}
        href="/somePath"
        onClick={onClickMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    screen.getByText('Item 4').click();
    expect(onClickMock).toHaveBeenCalled();
  });

  test('creates an anchor when href is passed', () => {
    render(
      <Dropdown.Link
        badge={{ text: 'New' }}
        href="https://www.pinterest.com"
        onClick={onClickMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(screen.getByText('Item 4').closest('a')).toHaveAttribute(
      'href',
      'https://www.pinterest.com',
    );
  });

  test('adds badge and external icon', () => {
    render(
      <Dropdown.Link
        badge={{ text: 'Beta Badge' }}
        href="http://www.pinterest.com"
        iconEnd="visit"
        onClick={onClickMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('Beta Badge')).toBeInTheDocument();
    expect(
      screen.queryByTitle(', Opens a new tab', {
        exact: true,
      }),
    ).not.toBeVisible();
  });

  test('adds avatar', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Dropdown.Link
        avatar={{
          name: 'Ayesha',
          accessibilityLabel: 'Ayesha avatar',
          src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          color: 1,
          size: 'sm',
        }}
        href="http://www.pinterest.com"
        onClick={onClickMock}
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
});
