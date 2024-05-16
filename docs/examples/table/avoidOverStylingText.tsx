import {ReactNode} from 'react';
import { Box, Checkbox, Label, Table, Text } from 'gestalt';

function HeaderRow({
  id,
}: {
  id: string
}) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor={id}>Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id={id} indeterminate onChange={() => {}} size="sm" />
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
}: {
  id: string,
  checked?: boolean,
  disabled?: boolean,
  text: string,
  campaign: string
}) {
  return (
    (<Table.Row>
      <Table.Cell>
        <Checkbox
          checked={checked}
          disabled={disabled}
          id={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
          onChange={() => {}}
          size="sm"
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
    </Table.Row>)
  );
}

export default function Example() {
  const tableID = "Example of a 'do' for table style";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow campaign="Engagement" checked id={tableID} text="The best ad" />
        <BaseRow campaign="Awareness" disabled id={tableID} text="This ad is great" />
        <BaseRow campaign="Catalogs" checked id={tableID} text="Mary's pincycle" />
        <BaseRow campaign="Awareness" checked={false} id={tableID} text="Best Purchase Wins" />
        <BaseRow campaign="Conversions" checked={false} id={tableID} text="The third campaign" />
      </Table.Body>
    </Table>
  );
}
