// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, List, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={12} direction="column" maxWidth={600}>
        <List label="With bulk actions, you can:" type="unordered">
          <List.Item
            text={
              <Text inline>
                Request an asynchronous bulk report on advertiser entities campaigns, ad groups,
                product groups, ads, keywords.
                <Link display="inline" accessibilityLabel="Learn more about async reports" href="#">
                  Learn more
                </Link>
              </Text>
            }
          />
          <List.Item text="Create/update ad-related entities" />
        </List>
      </Flex>
    </Box>
  );
}
