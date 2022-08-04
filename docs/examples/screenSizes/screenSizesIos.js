// @flow strict
import { type Node } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function ScreenSizesIos(): Node {
  return (
    <Box padding={8} width="100%">
      <Table accessibilityLabel="iOS Screen Sizes">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Device</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Size (pt)</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>Small phone</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>320 x 568</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Phone</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>360 x 780</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Tablet</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>768 x 1024</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
