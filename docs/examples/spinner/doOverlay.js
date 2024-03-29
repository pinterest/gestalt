// @flow strict
import { Fragment, type Node as ReactNode } from 'react';
import { Box, Flex, Spinner, Table, Text } from 'gestalt';

function DataTable() {
  return (
    <Table accessibilityLabel="Example table">
      <Table.Header>
        <Table.Row>
          {['Spend', 'Result', 'Cost per result', 'Impressions', 'CPM'].map((item) => (
            <Table.HeaderCell key={item}>
              <Text weight="bold">{item}</Text>
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {[...new Array<void | ReactNode>(8)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Table.Row key={i}>
            {['$0.00', '0 clicks', '$0.00 CPC', '0', '$0.00'].map((item) => (
              <Table.Cell key={item}>{item}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Overlay() {
  return (
    <Box color="default" height="100%" left opacity={0.8} position="absolute" top width="100%" />
  );
}

export default function Example(): ReactNode {
  return (
    <Fragment>
      <DataTable />

      <Overlay />

      <Box height="100%" left position="absolute" top width="100%">
        <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
          <Spinner accessibilityLabel="Example spinner" show />
        </Flex>
      </Box>
    </Fragment>
  );
}
