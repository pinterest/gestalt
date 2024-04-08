// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Link, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
              <Text lineClamp={1} size="200">
                AD-225-DB-RFUYS-2398
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="200">100</Text>
            </Table.Cell>
            <Table.Cell>
              <Text inline overflow="noWrap" size="200">
                lifestyle, gaming
              </Text>
              <Text inline size="200" weight="bold">
                <Link href="#" underline="always">
                  3 more
                </Link>
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text lineClamp={1} size="200">
                AD-225-Dd-224-AKD-290
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="200">5,000</Text>
            </Table.Cell>
            <Table.Cell>
              <Text inline overflow="noWrap" size="200">
                bargain, gaming
              </Text>
              <Text inline size="200" weight="bold">
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
