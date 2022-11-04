// @flow strict
import React, { type Node } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dropdown,
  Flex,
  IconButton,
  Label,
  PageHeader,
  Table,
  Text,
} from 'gestalt';

function HeaderRow({ id }: {| id: string |}): Node {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Box display="visuallyHidden">
            <Label htmlFor={id}>Not all checkboxes are checked</Label>
          </Box>
          <Checkbox id={id} onChange={() => {}} indeterminate size="sm" />
        </Table.HeaderCell>
        {['Status', 'Audience'].map((title) => (
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
  status,
  audience,
}: {|
  id: string,
  checked?: boolean,
  status: string,
  audience: string,
|}): Node {
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          id={`${id.replace(/ /g, '_').replace(/'/g, '')}_${status
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
          onChange={() => {}}
          size="sm"
          checked={checked}
        />
      </Table.Cell>
      <Table.Cell>
        <Label
          htmlFor={`${id.replace(/ /g, '_').replace(/'/g, '')}_${status
            .replace(/ /g, '_')
            .replace(/'/g, '')}`}
        >
          <Text>{status}</Text>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Text>{audience}</Text>
      </Table.Cell>
    </Table.Row>
  );
}

export default function OnePrimaryActionExample(): Node {
  const tableID = 'Audience table';

  return (
    <Box width="100%" color="secondary" height="100%">
      <PageHeader
        borderStyle="sm"
        title="Audiences"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create audience" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-audience"
              option={{ value: 'Create audience', label: 'Create audience' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button color="red" size="lg" text="Export" />,
          dropdownItems: [
            <Dropdown.Item
              key="export"
              option={{ value: 'Export', label: 'Export' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="More options"
      />
      <Box padding={12}>
        <Flex
          gap={{
            row: 7,
            column: 0,
          }}
          alignItems="end"
        >
          <Flex.Item flex="grow">
            <Table accessibilityLabel="Audiences">
              <colgroup>
                <col span="1" style={{ width: '5%' }} />
                <col span="1" style={{ width: '10%' }} />
                <col span="1" style={{ width: '50%' }} />
              </colgroup>
              <HeaderRow id={tableID} />
              <Table.Body>
                <BaseRow id={tableID} checked status="Active" audience="East Coast" />
                <BaseRow id={tableID} status="Inactive" audience="West Coast" />
              </Table.Body>
            </Table>
          </Flex.Item>
          <IconButton
            accessibilityLabel="Create new audience"
            bgColor="red"
            icon="add"
            onClick={() => {}}
            size="lg"
            tooltip={{ text: 'Create new audience', idealDirection: 'up' }}
          />
        </Flex>
      </Box>
    </Box>
  );
}
