// @flow strict
import { type Node } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function ScreenSizesIos(): Node {
  return (
    <Box width="100%" padding={8}>
      <Table accessibilityLabel="Android Screen Sizes">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Device</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Size (dp)</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>Small phone</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>320 x 480</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Phone</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>360 x 640</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Tablet</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>800 x 1280</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
