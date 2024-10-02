import { Avatar, AvatarGroup, Flex, Icon, Image, SearchGuideLink } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <SearchGuideLink
        accessibilityLabel="Image"
        color="01"
        href="https://pinterest.com"
        text="Image"
        thumbnail={{
          image: (
            <Image
              alt="Image"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/bBXC23j/fashion.jpg"
            />
          ),
        }}
      />
      <SearchGuideLink
        accessibilityLabel="Icon"
        color="02"
        href="https://pinterest.com"
        text="Icon"
        thumbnail={{
          icon: <Icon accessibilityLabel="" icon="sparkle" />,
        }}
      />
      <SearchGuideLink
        accessibilityLabel="Avatar"
        color="03"
        href="https://pinterest.com"
        text="Avatar"
        thumbnail={{
          avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
        }}
      />
      <SearchGuideLink
        accessibilityLabel="AvatarGroup"
        color="04"
        href="https://pinterest.com"
        text="AvatarGroup"
        thumbnail={{
          avatarGroup: (
            <AvatarGroup
              accessibilityLabel="Collaborators: Keerthi, Alberto, Enio."
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
                  name: 'Enio',
                },
              ]}
              size="md"
            />
          ),
        }}
      />
    </Flex>
  );
}
