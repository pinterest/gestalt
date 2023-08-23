// @flow strict
import { type Node } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List
        label={
          <Text size="400" weight="bold">
            Button settings
          </Text>
        }
        type="unordered"
      >
        <List.Item
          text={
            <Text inline>
              <Text weight="bold" inline>
                Pin type settings:{' '}
              </Text>
              Pin type settings control what content Pinners can save from your page
            </Text>
          }
        />
        <List.Item
          text={
            <Text inline>
              <Text weight="bold" inline>
                Button style settings:{' '}
              </Text>
              Button style settings control how your button looks
            </Text>
          }
        />
        <List.Item
          text={
            <Text inline>
              <Text weight="bold" inline>
                Source settings:{' '}
              </Text>
              Source settings control canonical sources, including descriptions, urls and images
            </Text>
          }
        />
      </List>
    </Box>
  );
}
