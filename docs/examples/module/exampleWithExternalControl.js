// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Module, Text } from 'gestalt';

export default function Example(): Node {
  const [extExpandedId, setExtExpandedId] = useState<number | string | null>(null);
  const mapIds = {
    'first-0': 0,
    'first-1': 1,
    'second-0': 0,
    'second-1': 1,
  };

  return (
    <Box padding={8} height="100%" display="flex" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Box marginStart={2}>
              <Text>Step 1</Text>
            </Box>

            <Module.Expandable
              accessibilityExpandLabel="Expand the module"
              accessibilityCollapseLabel="Collapse the module"
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

            <Module.Expandable
              id="ModuleExampleStep2"
              accessibilityExpandLabel="Expand the module"
              accessibilityCollapseLabel="Collapse the module"
              expandedIndex={
                typeof extExpandedId === 'string' ? mapIds[extExpandedId] : extExpandedId
              }
              onExpandedChange={(index) => {
                if (index) setExtExpandedId(Number.isFinite(index) ? `second-${index}` : index);
              }}
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
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
