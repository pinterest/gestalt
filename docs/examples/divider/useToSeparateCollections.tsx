import { Avatar, Box, Divider, Flex, Heading, Tabs, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex height="100%" width="100%">
        <Box paddingX={4}>
          <Flex direction="column" width={150}>
            {['Public profile', 'Account settings', 'Home feed tuner', 'Claim', 'Permissions'].map(
              (item, idx) => (
                <Tabs
                  key={item}
                  activeTabIndex={idx}
                  onChange={() => {}}
                  tabs={[{ text: item, href: '#Best-practices' }]}
                />
              ),
            )}
          </Flex>
        </Box>
        <Divider />
        <Box marginStart={12}>
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            <Heading accessibilityLevel="none" size="300">
              Public profile
            </Heading>
            <Avatar
              name="Keerthi"
              size="lg"
              src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
            />
            <TextField id="first" label="First name" onChange={() => {}} value="Kate" />
            <TextField id="last" label="Last name" onChange={() => {}} value="Dommeti" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
