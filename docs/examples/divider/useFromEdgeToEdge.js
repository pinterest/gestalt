// @flow strict
import { type Node } from 'react';
import { AvatarGroup, Box, Divider, Flex, Icon, Mask, Text } from 'gestalt';

function Block({ title, url, locked }: {| title: string, url: string, locked?: boolean |}) {
  return (
    <Flex gap={{ row: 2, column: 0 }} alignItems="center">
      <Box maxWidth={60}>
        <Mask rounding={4}>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img alt="example image" src={url} style={{ maxWidth: '100%', display: 'block' }} />
        </Mask>
      </Box>
      <Flex.Item flex="grow">
        <Text weight="bold" size="200">
          {title}
        </Text>
      </Flex.Item>
      {locked ? (
        <Icon accessibilityLabel="" icon="lock" size={12} />
      ) : (
        <AvatarGroup
          accessibilityLabel="Collaborators."
          size="sm"
          collaborators={[
            {
              name: 'Keerthi',
              src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
            },
            {
              name: 'Alberto',
              src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
            },
            {
              name: 'Shanice',
              src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
            },
          ]}
        />
      )}
    </Flex>
  );
}

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
        <Block title="Home decor" url="https://i.ibb.co/121JJzC/stock7.jpg" locked />
        <Divider />
        <Block title="Plants" url="https://i.ibb.co/FY2MKr5/stock6.jpg" />
      </Flex>
    </Box>
  );
}
