// @flow strict
import { render } from '@testing-library/react';
import Table from './Table';
import Text from './Text';

describe('Table.Footer', () => {
  test('renders correctly', () => {
    const { baseElement } = render(
      <Table accessibilityLabel="Sticky footer" maxHeight={200}>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Total</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('sticky footer renders correctly', () => {
    const { baseElement } = render(
      <Table accessibilityLabel="Sticky footer" maxHeight={200}>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Total</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
