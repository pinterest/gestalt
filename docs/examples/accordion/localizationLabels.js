// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, DefaultLabelProvider, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Accordion: {
          accessibilityCollapseLabel: 'Abschnitt kollabieren.',
          accessibilityExpandLabel: 'Erweitern Sie den Abschnitt.',
        },
      }}
    >
      <Box
        alignItems="center"
        display="flex"
        height="100%"
        justifyContent="center"
        padding={1}
        width="100%"
      >
        <Box column={12} maxWidth={800} padding={2}>
          <Accordion.Expandable
            id="Accordion"
            items={[
              {
                children: <Text size="200">Inhalt</Text>,
                summary: ['Zusammenfassung # 1', 'Zusammenfassung # 2', 'Zusammenfassung # 3'],
                title: 'Titel',
              },
            ]}
          />
        </Box>
      </Box>
    </DefaultLabelProvider>
  );
}
