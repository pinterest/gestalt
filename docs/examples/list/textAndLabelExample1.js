// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
              <Text inline weight="bold">
                Pin type settings:{' '}
              </Text>
              Pin type settings control what content Pinners can save from your page
            </Text>
          }
        />
        <List.Item
          text={
            <Text inline>
              <Text inline weight="bold">
                Button style settings:{' '}
              </Text>
              Button style settings control how your button looks
            </Text>
          }
        />
        <List.Item
          text={
            <Text inline>
              <Text inline weight="bold">
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
