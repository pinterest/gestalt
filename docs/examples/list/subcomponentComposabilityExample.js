// @flow strict
import { Fragment, type Node } from 'react';
import { Box, List } from 'gestalt';

export default function Example(): Node {
  const someCondition = true;

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List label="List with conditionals" type="unordered">
        {someCondition && <List.Item text="List item text z" />}
        <List.Item text="List item text 0">
          {someCondition && (
            <Fragment>
              <List.Item text="List item text 1" />
              <List.Item text="List item text 2" />
              <List.Item text="List item text 3" />
            </Fragment>
          )}
        </List.Item>
        {someCondition && (
          <Fragment>
            <List.Item text="List item text A" />
            <List.Item text="List item text B" />
          </Fragment>
        )}
      </List>
    </Box>
  );
}
