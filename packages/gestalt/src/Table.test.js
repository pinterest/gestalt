// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Table from './Table.js';

describe('<Table />', () => {
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
});

describe('<Table.Body />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Table.Body>
          <div>rows</div>
        </Table.Body>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Table.Cell />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<Table.Cell>cell content</Table.Cell>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with colSpan and rowSpan', () => {
    const tree = renderer
      .create(
        <Table.Cell rowSpan={2} colSpan={3}>
          cell content
        </Table.Cell>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Table.Header />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Table.Header>
          <div>row with column names</div>
        </Table.Header>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Table.HeaderCell />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<Table.HeaderCell>column name</Table.HeaderCell>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with props', () => {
    const tree = renderer
      .create(
        <Table.HeaderCell rowSpan={2} colSpan={3} scope="row">
          row name
        </Table.HeaderCell>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Table.Row />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Table.Row>
          <div>row cells</div>
        </Table.Row>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
