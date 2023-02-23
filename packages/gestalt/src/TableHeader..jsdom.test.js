// @flow strict
import { render } from '@testing-library/react';
import Table from './Table.js';
import Text from './Text.js';

describe('Table.Header', () => {
  test('renders correctly', () => {
    const { baseElement } = render(
      <Table accessibilityLabel="Sticky header" maxHeight={200}>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Total</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('sticky header renders correctly', () => {
    const { baseElement } = render(
      <Table accessibilityLabel="Sticky header" maxHeight={200}>
        <Table.Header sticky>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Total</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
