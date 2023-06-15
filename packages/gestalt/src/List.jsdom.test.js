// @flow strict
import { type Node } from 'react';
import { render, screen } from '@testing-library/react';
import List from './List.js';
import Text from './Text.js';

describe('List', () => {
  function Component({
    labelDisplay,
    type,
    text,
  }: {|
    labelDisplay?: 'hidden' | 'visible',
    type?: 'unordered' | 'bare' | 'ordered',
    text?: boolean,
  |}): Node {
    return (
      <List labelDisplay={labelDisplay} label={text ? <Text>Numbers</Text> : 'Numbers'} type={type}>
        <List.Item text={text ? <Text>1</Text> : '1'}>
          <List.Item text="2">
            <List.Item text="3">
              <List.Item text="4">
                <List.Item text="5">
                  <List.Item text="6" />
                </List.Item>
              </List.Item>
            </List.Item>
          </List.Item>
        </List.Item>
      </List>
    );
  }

  test('List presents label and item texts with strings', () => {
    render(<Component />);

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
    render(<Component text />);

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
    render(<Component type="unordered" />);
    const array = screen.getAllByRole('listitem');
    expect(array.length).toEqual(6);
  });

  test('Ordered list uses correct ol tags', () => {
    render(<Component type="ordered" />);
    const array = screen.getAllByRole('list');
    expect(array.filter((a) => a.type !== 'ol').length).toEqual(6);
  });

  test('Unordered list uses correct ol tags', () => {
    render(<Component type="unordered" />);
    const array = screen.getAllByRole('list');
    expect(array.filter((a) => a.type !== 'ul').length).toEqual(6);
  });

  test('Bare list uses correct ul tags', () => {
    render(<Component type="unordered" />);
    const array = screen.getAllByRole('list');
    expect(array.filter((a) => a.type !== 'ul').length).toEqual(6);
  });
});
