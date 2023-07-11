// @flow strict
import { type Node } from 'react';
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
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Box display="visuallyHidden">
                      <Label htmlFor={tableID}>Not all checkboxes are checked</Label>
                    </Box>
                    <Checkbox id={tableID} onChange={() => {}} indeterminate size="sm" />
                  </Table.HeaderCell>
                  {['Status', 'Audience'].map((title) => (
                    <Table.HeaderCell key={title}>
                      <Text weight="bold">{title}</Text>
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {[
                  { checked: true, status: 'Active', audience: 'East Coast' },
                  { checked: false, status: 'Inactive', audience: 'West Coast' },
                ].map(({ status, audience, checked }) => (
                  <Table.Row key={audience}>
                    <Table.Cell>
                      <Checkbox
                        id={`${tableID.replace(/ /g, '_').replace(/'/g, '')}_${status
                          .replace(/ /g, '_')
                          .replace(/'/g, '')}`}
                        onChange={() => {}}
                        size="sm"
                        checked={checked}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Label
                        htmlFor={`${tableID.replace(/ /g, '_').replace(/'/g, '')}_${status
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
                ))}
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
