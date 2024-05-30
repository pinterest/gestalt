import { Accordion, Box, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion.Expandable
          id="ModuleExample - default"
          items={[
            {
              children: <Text size="200">Children1</Text>,
              summary: ['summary1', 'summary2', 'summary3'],
              title: 'Title',
            },
          ]}
        />
      </Box>
    </Box>
  );
}
