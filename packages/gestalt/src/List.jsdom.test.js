// @flow strict
import { screen, render } from '@testing-library/react';
import List from './List.js';
import Text from './Text.js';

describe('List', () => {
  const Component = ({ labelDisplay, type, text }) => (
    <List labelDisplay={labelDisplay} label={text ? <Text>Numbers</Text> : 'Numbers'} type={type}>
      <List.Item text={text ? <Text>1</Text> : '1'}>
        <List.NestedList>
          <List.Item text="2">
            <List.NestedList>
              <List.Item text="3">
                <List.NestedList>
                  <List.Item text="4">
                    <List.NestedList>
                      <List.Item text="5">
                        <List.NestedList>
                          <List.Item text="6" />
                        </List.NestedList>
                      </List.Item>
                    </List.NestedList>
                  </List.Item>
                </List.NestedList>
              </List.Item>
            </List.NestedList>
          </List.Item>
        </List.NestedList>
      </List.Item>
    </List>
  );

  test('List presents label and item texts with strings', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Component />);

    expect(
      screen.getByText('Numbers', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('1', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('2', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('3', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('4', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('5', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('6', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('List presents label and item texts with Text', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Component text />);

    expect(
      screen.getByText('Numbers', {
        exact: true,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('1', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('List uses correct li tags', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Component type="unordered" />);
    let li = container.querySelectorAll('li');
    expect(li.length).toEqual(6);
  });

  test('Unordered list uses correct ul tags', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Component type="unordered" />);
    let ul = container.querySelectorAll('ul');
    expect(ul.length).toEqual(6);
  });

  test('Bare list uses correct ul tags', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Component type="bare" />);
    let ul = container.querySelectorAll('ul');
    expect(ul.length).toEqual(6);
  });

  test('Ordered list uses correct ul tags', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Component type="ordered" />);
    let ol = container.querySelectorAll('ol');
    expect(ol.length).toEqual(6);
  });
});
