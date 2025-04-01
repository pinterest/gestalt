import { AvatarGroup, Box, Divider, Flex, Icon, Mask, Text } from 'gestalt';

function Block({ title, url, locked }: { title: string; url: string; locked?: boolean }) {
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
              src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
            },
            {
              name: 'Alberto',
              src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
            },
            {
              name: 'Shanice',
              src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
            },
          ]}
          size="sm"
        />
      )}
    </Flex>
  );
}

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 10, row: 0 }} width={300}>
        <Block locked title="Home decor" url="https://i.ibb.co/121JJzC/stock7.jpg" />
        <Flex justifyContent="center" width="100%">
          <Box width="50%">
            <Divider />
          </Box>
        </Flex>
        <Block title="Plants" url="https://i.ibb.co/FY2MKr5/stock6.jpg" />
      </Flex>
    </Box>
  );
}
