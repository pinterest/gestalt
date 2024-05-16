import { ReactNode } from 'react';
import { Box, Checkbox, Label, Table, Text } from 'gestalt';

function HeaderRow({ id }: { id: string }) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor={id}>Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id={id} indeterminate onChange={() => {}} size="sm" />
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
}: {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  text: string;
  subtext: string;
  spend: string;
}) {
  return (
    <Table.Row>
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

export default function Example() {
  const tableID = "Example of a 'Dont' do for table alignment";

  return (
    <Table accessibilityLabel={tableID}>
      <HeaderRow id={tableID} />
      <Table.Body>
        <BaseRow checked id={tableID} spend="$5" subtext="12/20/21" text="The best ad" />
        <BaseRow
          disabled
          id={tableID}
          spend="$3,000.00"
          subtext="01/16/21"
          text="This ad is great"
        />
        <BaseRow checked id={tableID} spend="$1.750" subtext="07/15/22" text="Mary's pincycle" />
        <BaseRow
          checked={false}
          id={tableID}
          spend="$51,650,500.54"
          subtext="06/15/22"
          text="Best Purchase Wins"
        />
        <BaseRow
          checked={false}
          id={tableID}
          spend="$67.60"
          subtext="06/24/22"
          text="The third campaign"
        />
      </Table.Body>
    </Table>
  );
}
