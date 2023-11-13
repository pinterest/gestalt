// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Checkbox, Table, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Table accessibilityLabel="Campaign selection" maxHeight={200}>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Name</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Box width={20}>
                <Checkbox
                  checked={checked1}
                  id="1"
                  onChange={({ checked }) => setChecked1(checked)}
                  size="sm"
                  label="Select Summertime picnic row"
                  labelDisplay="hidden"
                />
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Text>Summertime picnic</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Box width={20}>
                <Checkbox
                  checked={checked2}
                  id="2"
                  onChange={({ checked }) => setChecked2(checked)}
                  size="sm"
                  label="Select Summer 1950 row"
                  labelDisplay="hidden"
                />
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Text>Summer 1950</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Box width={20}>
                <Checkbox
                  checked={checked3}
                  id="3"
                  onChange={({ checked }) => setChecked3(checked)}
                  size="sm"
                  label="Select Back to school row"
                  labelDisplay="hidden"
                />
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Text>Back to school</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  );
}
