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
      <Flex direction="column" gap={{ column: 2, row: 0 }} justifyContent="between" width="100%">
        <Accordion
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
          title="Accordion Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>
        <Accordion.Expandable
          accessibilityCollapseLabel="Collapse section"
          accessibilityExpandLabel="Expand section"
          id="AccordionExample - header expandable"
          items={[
            {
              badge: { text: 'badge' },
              children: <Text size="200">Content here</Text>,
              summary: ['Summary 1', 'Summary 2', 'Summary 3'],
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
            {
              icon: 'lock',
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
