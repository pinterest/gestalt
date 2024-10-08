import { Avatar, AvatarGroup, Flex, Icon, Image, SearchGuide } from 'gestalt';

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
      <SearchGuide
        accessibilityLabel="Image"
        color="01"
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
      <SearchGuide
        accessibilityLabel="Icon"
        color="02"
        text="Icon"
        thumbnail={{
          icon: <Icon accessibilityLabel="" icon="sparkle" />,
        }}
      />
      <SearchGuide
        accessibilityLabel="Avatar"
        color="03"
        text="Avatar"
        thumbnail={{
          avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
        }}
      />
      <SearchGuide
        accessibilityLabel="AvatarGroup"
        color="04"
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
