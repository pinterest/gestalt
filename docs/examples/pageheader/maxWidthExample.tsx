import { ReactNode } from 'react';
import {
  Box,
  Dropdown,
  Flex,
  Heading,
  IconButton,
  PageHeader,
  SelectList,
  TextField,
  Tooltip,
} from 'gestalt';

export default function PageHeaderMaxWidthExample() {
  return (
    <Box color="secondary" height="100%" width="100%">
      <PageHeader
        borderStyle="sm"
        dropdownAccessibilityLabel="Additional options"
        maxWidth="65%"
        primaryAction={{
          component: (
            <Tooltip idealDirection="up" text="Additional options">
              <IconButton
                accessibilityLabel="Additional options"
                icon="ellipsis"
                iconColor="darkGray"
                size="lg"
              />
            </Tooltip>
          ),
          dropdownItems: [
            <Dropdown.Item
              key="item"
              onSelect={() => {}}
              option={{ value: 'Item', label: 'Item' }}
            />,
          ],
        }}
        title="Settings"
      />
      <Flex justifyContent="center">
        <Box padding={6} width="100%">
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 5,
            }}
          >
            <Heading accessibilityLevel={2} size="400">
              Edit profile
            </Heading>
            <TextField
              id="c-textfield1"
              label="Name"
              onChange={() => {}}
              placeholder="Placeholder"
            />
            <Flex
              gap={{
                row: 2,
                column: 0,
              }}
            >
              <Flex.Item flex="grow">
                <TextField
                  id="c-textfield2"
                  label="Phone"
                  onChange={() => {}}
                  placeholder="Placeholder"
                />
              </Flex.Item>
              <Flex.Item flex="grow">
                <TextField
                  id="c-textfield3"
                  label="Email"
                  onChange={() => {}}
                  placeholder="Placeholder"
                />
              </Flex.Item>
            </Flex>
            <SelectList
              id="selectlist2"
              label="Location"
              onChange={() => {}}
              placeholder="Placeholder"
            >
              {[
                { value: 'belgium', label: 'Belgium' },
                { value: 'france', label: 'France' },
                { value: 'usa', label: 'USA' },
              ].map(({ label, value }) => (
                <SelectList.Option key={label} label={label} value={value} />
              ))}
            </SelectList>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
