// @flow strict
import { type Node } from 'react';
import { Box, Link, Table, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Table accessibilityLabel="Font sizes">
        <Table.Header>
          <Table.Row>
            {['Name', 'Rate', 'Tags'].map((item) => (
              <Table.HeaderCell key={item}>
                <Text size="200" weight="bold">
                  {item}
                </Text>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text size="200" lineClamp={1}>
                AD-225-DB-RFUYS-2398
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="200">100</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="200" inline overflow="noWrap">
                lifestyle, gaming
              </Text>
              <Text inline weight="bold" size="200">
                <Link href="#" underline="always">
                  3 more
                </Link>
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text size="200" lineClamp={1}>
                AD-225-Dd-224-AKD-290
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="200">5,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="200" inline overflow="noWrap">
                bargain, gaming
              </Text>
              <Text inline weight="bold" size="200">
                <Link href="#" underline="always">
                  7 more
                </Link>
              </Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
