// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Table accessibilityLabel="Badge color patterns">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Post title</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text>Handmade ceramics</Text>
            </Table.Cell>
            <Table.Cell>
              <Badge text="Posted" type="success" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Lunch ideas</Text>
            </Table.Cell>
            <Table.Cell>
              <Badge text="Cancelled" type="error" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text>Tattoo inspo</Text>
            </Table.Cell>
            <Table.Cell>
              <Badge text="Archived" type="neutral" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Flex>
  );
}
