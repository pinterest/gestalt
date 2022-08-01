// @flow strict
import React, { type Node } from 'react';
import {
  Box,
  Dropdown,
  Flex,
  IconButton,
  Heading,
  PageHeader,
  SelectList,
  TextField,
  Tooltip,
} from 'gestalt';

export default function PageHeaderMaxWidthExample(): Node {
  return (
    <Box width="100%" color="secondary" height="100%">
      <PageHeader
        maxWidth="65%"
        borderStyle="sm"
        title="Settings"
        primaryAction={{
          component: (
            <Tooltip text="Additional options" idealDirection="up">
              <IconButton
                icon="ellipsis"
                iconColor="darkGray"
                size="lg"
                accessibilityLabel="Additional options"
              />
            </Tooltip>
          ),
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Item', label: 'Item' }}
              key="item"
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Flex justifyContent="center">
        <Box width="100%" padding={6}>
          <Flex direction="column" gap={5}>
            <Heading size="400" accessibilityLevel={2}>
              Edit profile
            </Heading>
            <TextField
              label="Name"
              id="c-textfield1"
              onChange={() => {}}
              placeholder="Placeholder"
            />
            <Flex gap={2}>
              <Flex.Item flex="grow">
                <TextField
                  label="Phone"
                  id="c-textfield2"
                  onChange={() => {}}
                  placeholder="Placeholder"
                />
              </Flex.Item>
              <Flex.Item flex="grow">
                <TextField
                  label="Email"
                  id="c-textfield3"
                  onChange={() => {}}
                  placeholder="Placeholder"
                />
              </Flex.Item>
            </Flex>
            <SelectList
              label="Location"
              id="selectlist2"
              options={[
                {
                  value: 'belgium',
                  label: 'Belgium',
                },
                {
                  value: 'france',
                  label: 'France',
                },
                {
                  value: 'usa',
                  label: 'USA',
                },
              ]}
              placeholder="Placeholder"
              onChange={() => {}}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
