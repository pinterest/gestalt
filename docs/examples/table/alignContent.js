// @flow strict
import { type Node } from 'react';
import { Box, Checkbox, Label, Table, Text } from 'gestalt';

function HeaderRow({ id }: {| id: string |}) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor={id}>Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id={id} onChange={() => {}} indeterminate size="sm" />
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
  );
}

function BaseRow({
  id,
  checked,
  disabled,
  text,
  spend,
}: {|
  id: string,
  checked?: boolean,
  disabled?: boolean,
  text: string,
  spend: string,
|}) {
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          id={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
          onChange={() => {}}
          disabled={disabled}
          size="sm"
          checked={checked}
        />
      </Table.Cell>
      <Table.Cell>
        <Label
          htmlFor={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
        >
          <Text>{text}</Text>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Text align="end">{spend}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = "Example of a 'do' for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow id={tableID} checked text="The best ad" spend="$5.50" />
        <BaseRow id={tableID} disabled text="This ad is great" spend="$3,000.00" />
        <BaseRow id={tableID} checked text="Mary's pincycle" spend="$1.75" />
        <BaseRow id={tableID} checked={false} text="Best Purchase Wins" spend="$51,650,500.54" />
        <BaseRow id={tableID} checked={false} text="The third campaign" spend="$67.60" />
      </Table.Body>
    </Table>
  );
}
