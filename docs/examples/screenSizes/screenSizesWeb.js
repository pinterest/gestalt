// @flow strict
import { type Node } from 'react';
import { Box, Flex, Table, Text } from 'gestalt';

export default function ScreenSizesWeb(): Node {
  return (
    <Box padding={8} width="100%">
      <Table accessibilityLabel="Web Screen Sizes">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Device</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Size (px)</Text>
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
          <Table.Row>
            <Table.Cell>
              <Text>Desktop Breakpoints (min-width)</Text>
              <Box paddingY={2} maxWidth={500}>
                <Text italic>
                  Components in Gestalt adjust to browser size at these breakpoints. When designing,
                  please make sure your designs take these breakpoints into consideration.
                </Text>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 2,
                }}
              >
                <Text>sm: 576px</Text>
                <Text>md: 768px</Text>
                <Text>lg: 1312px</Text>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
