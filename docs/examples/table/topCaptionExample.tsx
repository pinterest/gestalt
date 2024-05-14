import { ComponentProps } from 'react';
import { Box, Checkbox, Flex, Label, Status, Table, Text } from 'gestalt';

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
  type,
  text,
  subtext,
  campaign,
}: {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  type: ComponentProps<typeof Status>['type'];
  text: string;
  subtext: string;
  campaign: string;
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
        <Status subtext={subtext} title={text} type={type} />
      </Table.Cell>
      <Table.Cell>
        <Label
          htmlFor={`${id.replace(/ /g, '_').replace(/'/g, '')}_${text
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
        >
          <Text color={disabled ? 'subtle' : 'default'}>{campaign}</Text>
        </Label>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Example() {
  const tableID = 'Example of correct accessibility with top caption';

  return (
    <Box padding={4}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Box aria-hidden>
          <Text size="400" weight="bold">
            Your Campaigns Summary
          </Text>
        </Box>
        <Table accessibilityLabel="Your campaigns summary">
          <HeaderRow id={tableID} />
          <Table.Body>
            <BaseRow
              campaign="Engagement"
              checked
              id={tableID}
              subtext="Ends 11/20/2021"
              text="In progress"
              type="inProgress"
            />
            <BaseRow
              campaign="Awareness"
              disabled
              id={tableID}
              subtext="Ends 11/20/2021"
              text="Paused"
              type="halted"
            />
            <BaseRow
              campaign="Catalogs"
              checked
              id={tableID}
              subtext="Ends 11/20/2021"
              text="Warning"
              type="warning"
            />
            <BaseRow
              campaign="Awareness"
              checked={false}
              id={tableID}
              subtext="Ends 11/20/2021"
              text="Complete"
              type="ok"
            />
          </Table.Body>
        </Table>
      </Flex>
    </Box>
  );
}
