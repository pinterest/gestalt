// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, List } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <List label="Use the synchronous analytics endpoints if:" type="unordered">
        <List.Item text="You need data from the last 90 days" />
        <List.Item text="You want a quick response to load a user facing dashboard/component in real time" />
        <List.Item text="You want to avoid large report size/unnecessary data being returned" />
        <List.Item text="You need only basic key metrics for each campaign/ad/etc" />
      </List>
    </Box>
  );
}
