// @flow strict
import { type Node } from 'react';
import { Avatar, Box, Divider, Flex, Heading, Tabs, TextField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex width="100%" height="100%">
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
            <Avatar size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
            <TextField id="first" onChange={() => {}} label="First name" value="Kate" />
            <TextField id="last" onChange={() => {}} label="Last name" value="Dommeti" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
