// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, IconButton, Module, SegmentedControl, Text } from 'gestalt';

export default function Example(): Node {
  const sizes = ['sm', 'md', 'lg'];
  const [size, setSize] = useState('sm');

  return (
    <Box padding={8} height="100%" width="100%" display="flex" alignItems="center">
      <Flex
        direction="column"
        width="100%"
        height="100%"
        justifyContent="between"
        gap={{ column: 2, row: 0 }}
      >
        <SegmentedControl
          selectedItemIndex={sizes.indexOf(size)}
          items={sizes}
          onChange={({ activeIndex }) => {
            setSize(sizes[activeIndex]);
          }}
        />
        <Module
          icon="lock"
          iconButton={
            <IconButton
              bgColor="lightGray"
              icon="question-mark"
              iconColor="darkGray"
              accessibilityLabel="Get help"
              size="xs"
              onClick={() => {}}
            />
          }
          badge={{ text: 'Beta' }}
          iconAccessibilityLabel="Module Locked - check permission settings"
          id="ModuleExample - header"
          size={size}
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Module>
        <Module.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample - header expandable"
          size={size}
          items={[
            {
              icon: 'lock',
              children: <Text size="200">Content here</Text>,
              summary: ['Summary 1', 'Summary 2'],
              title: 'Title',
            },
            {
              badge: { text: 'badge' },
              children: <Text size="200">Content here</Text>,
              summary: ['Summary 1', 'Summary 2', 'Summary 3'],
              title: 'Title',
            },
            {
              children: <Text size="200">More content here</Text>,
              summary: ['Summary 1', 'Summary 2'],
              title: 'Title',
              iconButton: (
                <IconButton
                  bgColor="lightGray"
                  icon="question-mark"
                  iconColor="darkGray"
                  accessibilityLabel="Get help"
                  size="xs"
                  onClick={() => {}}
                />
              ),
            },
          ]}
        />
      </Flex>
    </Box>
  );
}
