// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Table accessibilityLabel="See what's possible with access tiers" maxHeight={200}>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell> </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Trial</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Standard</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Basic analytics</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Included</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Included</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold">Rate limits</Text>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={{ column: 2, row: 0 }}>
                <Text size="100">1000/day</Text>
                <Text>
                  <Link
                    accessibilityLabel="See rate limit details for trial package"
                    href="https://developers.pinterest.com/docs/api/v5/#tag/Rate-limits"
                    underline="always"
                  >
                    See details
                  </Link>
                </Text>
              </Flex>
            </Table.Cell>
            <Table.Cell>
              <Flex direction="column" gap={{ column: 1, row: 0 }}>
                <Text size="100">Variable</Text>
                <Text>
                  <Link
                    accessibilityLabel="See rate limit details for standard package"
                    href="https://developers.pinterest.com/docs/api/v5/#tag/Rate-limits"
                    underline="always"
                  >
                    See details
                  </Link>
                </Text>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Flex>
  );
}
