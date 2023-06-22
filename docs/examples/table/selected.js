// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Table, Text } from 'gestalt';

export default function Example(): Node {
  const [selected, setSelectedRow] = useState<$ReadOnlyArray<string>>([]);

  return (
    <Box height="100%" width="100%" overflow="scroll">
      <Table accessibilityLabel="Selected row example table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Selected</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Column</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Column</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Subcomponent</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row
            key="row1"
            hoverStyle="gray"
            selected={selected.includes('row') ? 'selected' : 'unselected'}
          >
            <Table.Cell>
              <Text />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                id="Row"
                onChange={() =>
                  setSelectedRow((value) =>
                    value.includes('row')
                      ? value.filter((item) => item !== 'row')
                      : [...value, 'row'],
                  )
                }
                size="sm"
                checked={selected.includes('row')}
              />
            </Table.Cell>
            <Table.Cell>
              <Text>value</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>value</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Table.Row</Text>
            </Table.Cell>
          </Table.Row>
          <Table.RowExpandable
            accessibilityCollapseLabel="Collapse"
            accessibilityExpandLabel="Expand"
            expandedContents={<Text>Content</Text>}
            key="row2"
            id="row2"
            hoverStyle="gray"
            selected={selected.includes('rowExpandable') ? 'selected' : 'unselected'}
          >
            <Table.Cell>
              <Checkbox
                id="RowExpandable"
                onChange={() =>
                  setSelectedRow((value) =>
                    value.includes('rowExpandable')
                      ? value.filter((item) => item !== 'rowExpandable')
                      : [...value, 'rowExpandable'],
                  )
                }
                size="sm"
                checked={selected.includes('rowExpandable')}
              />
            </Table.Cell>
            <Table.Cell>
              <Text>value</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>value</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Table.RowExpandable</Text>
            </Table.Cell>
          </Table.RowExpandable>
          <Table.RowDrawer
            drawerContents={<Text>Content</Text>}
            key="row3"
            id="row3"
            hoverStyle="gray"
            selected={selected.includes('rowDrawer') ? 'selected' : 'unselected'}
          >
            <Table.Cell>
              <Text />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                id="rowDrawer"
                onChange={() =>
                  setSelectedRow((value) =>
                    value.includes('rowDrawer')
                      ? value.filter((item) => item !== 'rowDrawer')
                      : [...value, 'rowDrawer'],
                  )
                }
                size="sm"
                checked={selected.includes('rowDrawer')}
              />
            </Table.Cell>
            <Table.Cell>
              <Text>value</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>value</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Table.RowDrawer</Text>
            </Table.Cell>
          </Table.RowDrawer>
        </Table.Body>
      </Table>
    </Box>
  );
}
