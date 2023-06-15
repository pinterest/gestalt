// @flow strict
import { type Node } from 'react';
import { Box, Flex, Table, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box height="100%" width="100%" overflow="scroll">
      <Flex alignItems="start" gap={4} height="100%" justifyContent="center" width="100%">
        <Table accessibilityLabel="Table Row Expandable">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Box display="visuallyHidden">
                  <Text weight="bold">Open/Close row</Text>
                </Box>
              </Table.HeaderCell>
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
              <Table.RowExpandable
                key={id}
                accessibilityExpandLabel="Expand"
                accessibilityCollapseLabel="Collapse"
                id={id}
                onExpand={() => {}}
                expandedContents={
                  <Box width={100} padding={2}>
                    <Text>Content</Text>
                  </Box>
                }
              >
                <Table.Cell>
                  <Text>{campaign}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{status}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{date}</Text>
                </Table.Cell>
              </Table.RowExpandable>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    </Box>
  );
}
