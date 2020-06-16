// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Table from './index.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Table>
        <div>rest of table</div>
      </Table>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with border', () => {
  const tree = renderer
    .create(
      <Table borderSize="sm">
        <div>rest of table</div>
      </Table>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with maxHeight', () => {
  const tree = renderer
    .create(
      <Table maxHeight={100}>
        <div>rest of table</div>
      </Table>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
