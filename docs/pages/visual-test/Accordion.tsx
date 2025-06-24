import { useRouter } from 'next/router';
import { Accordion, Box, Flex, IconButton, Text } from 'gestalt';

export default function Screenshot() {
  const { query } = useRouter();

  let size = 'lg';
  if (query.size) {
    // @ts-expect-error - TS2322 - Type 'string | string[]' is not assignable to type 'string'.
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
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"sm" | "md" | "lg" | undefined'.
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
          // @ts-expect-error - TS2322 - Type '{ accessibilityCollapseLabel: string; accessibilityExpandLabel: string; id: string; items: ({ badge: { text: string; }; children: Element; summary: string[]; title: string; iconButton: Element; } | { ...; })[]; size: string; }' is not assignable to type 'IntrinsicAttributes & AccordionExpandableProps'.
          size={size}
        />
      </Flex>
      <Box marginTop={2} />
      <Accordion.Expandable
        accessibilityCollapseLabel="Collapse section"
        accessibilityExpandLabel="Expand section"
        borderStyle="none"
        expandedIndex={0}
        id="AccordionExample - borderless expandable"
        items={[
          {
            children: <Text size="200">Summary 1</Text>,
            title: 'Title 1 - indented divider',
          },
          {
            children: <Text size="200">Summary 2</Text>,
            title: 'Title 2 - indented divider',
          },
        ]}
        onExpandedChange={() => {}}
      />
    </Box>
  );
}
