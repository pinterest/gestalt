import { Accordion, Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }} justifyContent="between" width="100%">
        <Accordion
          icon="lock"
          iconAccessibilityLabel="Accordion Locked - check permission settings"
          id="accordionExample - header"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>

        <Accordion.Expandable
          id="accordionExample - header expandable"
          items={[
            {
              children: <Text size="200">Content here</Text>,
              summary: ['summary'],
              title: 'Title',
            },
          ]}
        />
      </Flex>
    </Box>
  );
}
