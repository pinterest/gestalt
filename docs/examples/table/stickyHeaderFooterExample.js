// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Table accessibilityLabel="Sticky footer" maxHeight={200}>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Campaign</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Impression</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Cost</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>Spring season</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>10,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>$500</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Autumn season</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>10,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>$500</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Summer season</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>10,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>$500</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Winter season</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>10,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>$500</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Total</Text>
            </Table.Cell>
            <Table.Cell>
              <Text weight="bold">40,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text weight="bold">$2,000</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Box>
  );
}
