// @flow strict
import { type Node } from 'react';
import { Table, Box, Label, Checkbox, Text } from 'gestalt';

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
        {['Status', 'Campaign'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text weight="bold">{title}</Text>
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
  campaign,
}: {|
  id: string,
  checked?: boolean,
  disabled?: boolean,
  text: string,
  campaign: string,
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
        <Text color={disabled ? 'subtle' : 'default'}>{campaign}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = "Example of a 'do' for table style";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow id={tableID} checked text="The best ad" campaign="Engagement" />
        <BaseRow id={tableID} disabled text="This ad is great" campaign="Awareness" />
        <BaseRow id={tableID} checked text="Mary's pincycle" campaign="Catalogs" />
        <BaseRow id={tableID} checked={false} text="Best Purchase Wins" campaign="Awareness" />
        <BaseRow id={tableID} checked={false} text="The third campaign" campaign="Conversions" />
      </Table.Body>
    </Table>
  );
}
