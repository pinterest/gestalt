// @flow strict
import { type Node as ReactNode } from 'react';
import { AvatarGroup, Box, Divider, Flex, Icon, Mask, Text } from 'gestalt';

function Block({ title, url, locked }: { title: string, url: string, locked?: boolean }) {
  return (
    <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
      <Box maxWidth={60}>
        <Mask rounding={4}>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img alt="example image" src={url} style={{ maxWidth: '100%', display: 'block' }} />
        </Mask>
      </Box>
      <Flex.Item flex="grow">
        <Text size="200" weight="bold">
          {title}
        </Text>
      </Flex.Item>
      {locked ? (
        <Icon accessibilityLabel="" icon="lock" size={12} />
      ) : (
        <AvatarGroup
          accessibilityLabel="Collaborators."
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
          size="sm"
        />
      )}
    </Flex>
  );
}

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
        <Block locked title="Home decor" url="https://i.ibb.co/121JJzC/stock7.jpg" />
        <Divider />
        <Block title="Plants" url="https://i.ibb.co/FY2MKr5/stock6.jpg" />
      </Flex>
    </Box>
  );
}
