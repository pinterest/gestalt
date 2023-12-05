// @flow strict
import { type Node as ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Accordion, Box, Flex, IconButton, Text } from 'gestalt';

export default function Screenshot(): ReactNode {
  const { query } = useRouter();

  let size = 'lg';
  if (query.size) {
    size = query.size;
  }

  return (
    <Box color="default" display="inlineBlock" padding={1} width="600px">
      <Flex direction="column" width="100%" justifyContent="between" gap={{ column: 2, row: 0 }}>
        <Accordion
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
          iconAccessibilityLabel="Module Locked - check permission settings"
          id="ModuleExample - header"
          size={size}
          title="Module Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>
        <Accordion.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample - header expandable"
          size={size}
          items={[
            {
              badge: { text: 'badge' },
              children: <Text size="200">Content here</Text>,
              summary: ['Summary 1', 'Summary 2', 'Summary 3'],
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
            {
              icon: 'lock',
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
