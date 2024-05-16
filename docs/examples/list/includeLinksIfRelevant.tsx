import {ReactNode} from 'react';
import { Box, Flex, Link, List, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={12} maxWidth={600}>
        <List label="With bulk actions, you can:" type="unordered">
          <List.Item
            text={
              <Text inline>
                Request an asynchronous bulk report on advertiser entities campaigns, ad groups,
                product groups, ads, keywords.
                <Link accessibilityLabel="Learn more about async reports" display="inline" href="#">
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
