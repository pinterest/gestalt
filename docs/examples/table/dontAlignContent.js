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
        {['Campaign', 'Spend'].map((title) => (
          <Table.HeaderCell key={title}>
            <Text align={title === 'Campaign' ? 'center' : 'start'} weight="bold">
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
  subtext,
  spend,
}: {|
  id: string,
  checked?: boolean,
  disabled?: boolean,
  text: string,
  subtext: string,
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
          <Text align="center">{text}</Text>
          <Text align="center">{subtext}</Text>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Text align="end">{spend}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example(): Node {
  const tableID = "Example of a 'Dont' do for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow id={tableID} checked text="The best ad" subtext="12/20/21" spend="$5" />
        <BaseRow
          id={tableID}
          disabled
          text="This ad is great"
          subtext="01/16/21"
          spend="$3,000.00"
        />
        <BaseRow id={tableID} checked text="Mary's pincycle" subtext="07/15/22" spend="$1.750" />
        <BaseRow
          id={tableID}
          checked={false}
          text="Best Purchase Wins"
          subtext="06/15/22"
          spend="$51,650,500.54"
        />
        <BaseRow
          id={tableID}
          checked={false}
          text="The third campaign"
          subtext="06/24/22"
          spend="$67.60"
        />
      </Table.Body>
    </Table>
  );
}
