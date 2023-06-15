// @flow strict
import { type Node } from 'react';
import { Box, Checkbox, Label, Table, Text } from 'gestalt';

function BaseRow({
  id,
  checked = false,
  disabled = false,
  text,
  spend,
}: {|
  id: string,
  checked?: boolean,
  disabled?: boolean,
  text: string,
  spend: string,
|}) {
  const newId = `${id.replace(/ /g, '_').replace(/'/g, '')}_${text
    .replace(/ /g, '_')
    .replace(/'/g, '')}`;

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox id={newId} onChange={() => {}} disabled={disabled} size="sm" checked={checked} />
      </Table.Cell>
      <Table.Cell>
        <Label htmlFor={newId}>
          <Text>{text}</Text>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Text align="end">{spend}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Snapshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={4} width={400}>
      <Table accessibilityLabel="A table example">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Box display="visuallyHidden">
                <Label htmlFor="header_checkbox">Not all checkboxes are checked</Label>
              </Box>
              <Checkbox id="header_checkbox" onChange={() => {}} indeterminate size="sm" />
            </Table.HeaderCell>
            {['Campaign', 'Spend'].map((title) => (
              <Table.HeaderCell key={title}>
                <Text align={title === 'Spend' ? 'end' : 'start'} weight="bold">
                  {title}
                </Text>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <BaseRow id="example" checked text="The best ad" spend="$5.50" />
          <BaseRow id="example" disabled text="This ad is great" spend="$3,000.00" />
          <BaseRow id="example" checked text="Mary's pincycle" spend="$1.75" />
          <BaseRow id="example" checked={false} text="Best Purchase Wins" spend="$51,650,500.54" />
          <BaseRow id="example" checked={false} text="The third campaign" spend="$67.60" />
        </Table.Body>
      </Table>
    </Box>
  );
}
