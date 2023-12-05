// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion.Expandable
          id="AccordionExample "
          accessibilityExpandLabel="Expand the accordion"
          accessibilityCollapseLabel="Collapse the accordion"
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
