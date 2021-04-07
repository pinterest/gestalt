// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Table.js';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Table>
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with border', () => {
  const tree = renderer
    .create(
      <Table borderStyle="sm">
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with maxHeight', () => {
  const tree = renderer
    .create(
      <Table maxHeight={100}>
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with stickyColumns', () => {
  const tree = renderer
    .create(
      <Table stickyColumns={2}>
        <div>rest of table</div>
      </Table>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
