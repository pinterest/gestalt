import {ReactNode, useState} from 'react';
import { Box, Flex, Table, Text } from 'gestalt';

export default function Example() {
  const [expandedRows, setExpandedRows] = useState(['row1']);

  return (
    <Box height="100%" overflow="scroll" width="100%">
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
                accessibilityCollapseLabel="Collapse"
                accessibilityExpandLabel="Expand"
                expanded={expandedRows.includes(id)}
                expandedContents={
                  <Box padding={2} width={100}>
                    <Text>Content</Text>
                  </Box>
                }
                id={id}
                onExpand={({ expanded }) => {
                  if (expanded) {
                    setExpandedRows(expandedRows.filter((value) => value !== id));
                  } else {
                    setExpandedRows([...expandedRows, id]);
                  }
                }}
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
