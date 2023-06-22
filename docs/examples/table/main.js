// @flow strict
import { type Node } from 'react';
import { Box, Table, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={4} width="100%" height="100%" display="flex" justifyContent="center">
      <Table accessibilityLabel="Main example table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Campaign</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Status</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Date</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {[
            { id: 'row1', campaign: 'Winter', status: 'Draft', date: 'December 25, 2023' },
            { id: 'row2', campaign: 'Spring', status: 'Active', date: 'April 25, 2023' },
            { id: 'row3', campaign: 'Fall', status: 'Finished', date: 'October 25, 2022' },
          ].map(({ id, campaign, status, date }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Text>{campaign}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{status}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{date}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
