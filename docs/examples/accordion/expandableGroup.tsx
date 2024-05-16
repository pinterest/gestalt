import { ReactNode } from 'react';
import { Accordion, Box, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        {/* @ts-expect-error - TS2739 - Type '{ id: string; items: { children: Element; summary: string[]; title: string; }[]; }' is missing the following properties from type 'AccordionExpandableProps': accessibilityCollapseLabel, accessibilityExpandLabel */}
        <Accordion.Expandable
          id="AccordionExample "
          items={[
            {
              children: <Text size="200">Children1</Text>,
              summary: ['summary1'],
              title: 'Title1',
            },
            {
              children: <Text size="200">Children2</Text>,
              summary: ['summary2'],
              title: 'Title2',
            },
            {
              children: <Text size="200">Children3</Text>,
              summary: ['summary3'],
              title: 'Title3',
            },
          ]}
        />
      </Box>
    </Box>
  );
}
