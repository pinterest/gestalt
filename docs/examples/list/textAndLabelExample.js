// @flow strict
import { type Node } from 'react';
import { Box, List } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List label="Button settings" type="unordered">
        <List.Item text="Pin type settings: Pin type settings control what content Pinners can save from your page" />
        <List.Item text="Button style settings: Button style settings control how your button looks" />
        <List.Item text="Source settings: Source settings control canonical sources, including descriptions, urls and images" />
      </List>
    </Box>
  );
}
