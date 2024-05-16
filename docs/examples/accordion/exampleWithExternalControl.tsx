import {ReactNode, useState} from 'react';
import { Accordion, Box, Flex, Text } from 'gestalt';

export default function Example() {
  const [extExpandedId, setExtExpandedId] = useState<number | string | null>(null);
  const mapIds = {
    'first-0': 0,
    'first-1': 1,
    'second-0': 0,
    'second-1': 1,
  } as const;

  return (
    <Box display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Box marginStart={2}>
              <Text>Step 1</Text>
            </Box>

            <Accordion.Expandable
              expandedIndex={
                typeof extExpandedId === 'string' ? mapIds[extExpandedId] : extExpandedId
              }
              id="ModuleExampleStep1"
              items={[
                {
                  title: 'Title1',
                  summary: ['summary1'],
                  children: <Text size="200">Children1</Text>,
                },
                {
                  title: 'Title2',
                  summary: ['summary2'],
                  children: <Text size="200">Children2</Text>,
                },
              ]}
              onExpandedChange={(index) => {
                if (index) setExtExpandedId(Number.isFinite(index) ? `first-${index}` : index);
              }}
            />
          </Flex>

          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Box marginStart={2}>
              <Text>Step 2</Text>
            </Box>

            <Accordion.Expandable
              expandedIndex={
                typeof extExpandedId === 'string' ? mapIds[extExpandedId] : extExpandedId
              }
              id="AccordionExampleStep2"
              items={[
                {
                  title: 'Title1',
                  summary: ['summary1'],
                  children: <Text size="200">Children1</Text>,
                },
                {
                  title: 'Title2',
                  summary: ['summary2'],
                  children: <Text size="200">Children2</Text>,
                },
              ]}
              onExpandedChange={(index) => {
                if (index) setExtExpandedId(Number.isFinite(index) ? `second-${index}` : index);
              }}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
