import { Accordion, Box, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion.Expandable
          accessibilityCollapseLabel="Collapse section"
          accessibilityExpandLabel="Expand section"
          borderStyle="none"
          expandedIndex={0}
          id="AccordionExample - borderless expandable"
          indentDivider
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
    </Box>
  );
}
