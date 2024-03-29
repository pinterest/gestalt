// @flow strict
import { type Node, useState } from 'react';
import { Accordion, Box, Flex, IconButton, SegmentedControl, Text } from 'gestalt';

export default function Example(): Node {
  const sizes = ['sm', 'md', 'lg'];
  const [size, setSize] = useState('sm');

  return (
    <Box alignItems="center" display="flex" padding={8} width="100%">
      <Flex direction="column" gap={{ column: 2, row: 0 }} justifyContent="between" width="100%">
        <SegmentedControl
          items={sizes}
          onChange={({ activeIndex }) => {
            setSize(sizes[activeIndex]);
          }}
          selectedItemIndex={sizes.indexOf(size)}
        />
        <Accordion
          badge={{ text: 'Beta' }}
          icon="lock"
          iconAccessibilityLabel="Accordion Locked - check permission settings"
          iconButton={
            <IconButton
              accessibilityLabel="Get help"
              bgColor="lightGray"
              icon="question-mark"
              iconColor="darkGray"
              onClick={() => {}}
              size="xs"
            />
          }
          id="AccordionExample - header"
          size={size}
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>
        <Accordion.Expandable
          accessibilityCollapseLabel="Collapse section"
          accessibilityExpandLabel="Expand section"
          id="AccordionExample - header expandable"
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
                  accessibilityLabel="Get help"
                  bgColor="lightGray"
                  icon="question-mark"
                  iconColor="darkGray"
                  onClick={() => {}}
                  size="xs"
                />
              ),
            },
          ]}
          size={size}
        />
      </Flex>
    </Box>
  );
}
