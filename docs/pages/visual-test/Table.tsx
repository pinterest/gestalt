import { ReactNode } from 'react';
import { Box, Checkbox, Label, Table, Text } from 'gestalt';

function BaseRow({
  id,
  checked = false,
  disabled = false,
  text,
  spend,
}: {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  text: string;
  spend: string;
}) {
  const newId = `${id.replace(/ /g, '_').replace(/'/g, '')}_${text
    .replace(/ /g, '_')
    .replace(/'/g, '')}`;

  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox checked={checked} disabled={disabled} id={newId} onChange={() => {}} size="sm" />
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

export default function Snapshot() {
  return (
    <Box color="default" display="inlineBlock" padding={4} width={400}>
      <Table accessibilityLabel="A table example">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Box display="visuallyHidden">
                <Label htmlFor="header_checkbox">Not all checkboxes are checked</Label>
              </Box>
              <Checkbox id="header_checkbox" indeterminate onChange={() => {}} size="sm" />
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
          <BaseRow checked id="example" spend="$5.50" text="The best ad" />
          <BaseRow disabled id="example" spend="$3,000.00" text="This ad is great" />
          <BaseRow checked id="example" spend="$1.75" text="Mary's pincycle" />
          <BaseRow checked={false} id="example" spend="$51,650,500.54" text="Best Purchase Wins" />
          <BaseRow checked={false} id="example" spend="$67.60" text="The third campaign" />
        </Table.Body>
      </Table>
    </Box>
  );
}
