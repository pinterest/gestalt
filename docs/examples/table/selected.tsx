import { useState } from 'react';
import { Box, Checkbox, Table, Text } from 'gestalt';

export default function Example() {
  const [selected, setSelectedRow] = useState<ReadonlyArray<string>>([]);

  return (
    <Box height="100%" overflow="scroll" width="100%">
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
                checked={selected.includes('row')}
                id="Row"
                onChange={() =>
                  setSelectedRow((value) =>
                    value.includes('row')
                      ? value.filter((item) => item !== 'row')
                      : [...value, 'row'],
                  )
                }
                size="sm"
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
            key="row2"
            accessibilityCollapseLabel="Collapse"
            accessibilityExpandLabel="Expand"
            expandedContents={<Text>Content</Text>}
            hoverStyle="gray"
            id="row2"
            selected={selected.includes('rowExpandable') ? 'selected' : 'unselected'}
          >
            <Table.Cell>
              <Checkbox
                checked={selected.includes('rowExpandable')}
                id="RowExpandable"
                onChange={() =>
                  setSelectedRow((value) =>
                    value.includes('rowExpandable')
                      ? value.filter((item) => item !== 'rowExpandable')
                      : [...value, 'rowExpandable'],
                  )
                }
                size="sm"
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
            key="row3"
            drawerContents={<Text>Content</Text>}
            hoverStyle="gray"
            id="row3"
            selected={selected.includes('rowDrawer') ? 'selected' : 'unselected'}
          >
            <Table.Cell>
              <Text />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                checked={selected.includes('rowDrawer')}
                id="rowDrawer"
                onChange={() =>
                  setSelectedRow((value) =>
                    value.includes('rowDrawer')
                      ? value.filter((item) => item !== 'rowDrawer')
                      : [...value, 'rowDrawer'],
                  )
                }
                size="sm"
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
