// @flow strict
import { type Node as ReactNode } from 'react';
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

export default function OnePrimaryActionExample(): ReactNode {
  const tableID = 'Audience table';

  return (
    <Box color="secondary" height="100%" width="100%">
      <PageHeader
        borderStyle="sm"
        dropdownAccessibilityLabel="More options"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create audience" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-audience"
              onSelect={() => {}}
              option={{ value: 'Create audience', label: 'Create audience' }}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button color="red" size="lg" text="Export" />,
          dropdownItems: [
            <Dropdown.Item
              key="export"
              onSelect={() => {}}
              option={{ value: 'Export', label: 'Export' }}
            />,
          ],
        }}
        title="Audiences"
      />
      <Box padding={12}>
        <Flex
          alignItems="end"
          gap={{
            row: 7,
            column: 0,
          }}
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
                    <Checkbox id={tableID} indeterminate onChange={() => {}} size="sm" />
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
                        checked={checked}
                        id={`${tableID.replace(/ /g, '_').replace(/'/g, '')}_${status
                          .replace(/ /g, '_')
                          .replace(/'/g, '')}`}
                        onChange={() => {}}
                        size="sm"
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
