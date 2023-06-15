// @flow strict
import { type Node } from 'react';
import { Box, Checkbox, Flex, Label, Status, Table, Text } from 'gestalt';

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
  type,
  text,
  subtext,
  campaign,
}: {|
  id: string,
  checked?: boolean,
  disabled?: boolean,
  type: $ElementType<React$ElementConfig<typeof Status>, 'type'>,
  text: string,
  subtext: string,
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
        <Status type={type} title={text} subtext={subtext} />
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

export default function Example(): Node {
  const tableID = 'Example of correct accessibility with bottom caption';

  return (
    <Box padding={4}>
      <Flex gap={{ column: 2, row: 0 }} direction="column">
        <Table accessibilityLabel="Your campaigns summary">
          <HeaderRow id={tableID} />
          <Table.Body>
            <BaseRow
              id={tableID}
              checked
              type="inProgress"
              text="In progress"
              subtext="Ends 11/20/2021"
              campaign="Engagement"
            />
            <BaseRow
              id={tableID}
              disabled
              type="halted"
              text="Paused"
              subtext="Ends 11/20/2021"
              campaign="Awareness"
            />
            <BaseRow
              id={tableID}
              checked
              type="warning"
              text="Warning"
              subtext="Ends 11/20/2021"
              campaign="Catalogs"
            />
            <BaseRow
              id={tableID}
              checked={false}
              type="ok"
              text="Complete"
              subtext="Ends 11/20/2021"
              campaign="Awareness"
            />
          </Table.Body>
        </Table>
        <Box aria-hidden>
          <Text align="center" size="100">
            Your campaigns summary
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
