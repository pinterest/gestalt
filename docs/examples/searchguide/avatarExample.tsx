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
        text="Image"
        thumbnail={{
          image: (
            <Image
              alt="Image"
              naturalHeight={1}
              naturalWidth={1}
              src="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
            />
          ),
        }}
      />
      <SearchGuide
        accessibilityLabel="Icon"
        text="Icon"
        thumbnail={{
          icon: <Icon accessibilityLabel="" icon="sparkle" />,
        }}
      />
      <SearchGuide
        accessibilityLabel="Avatar"
        text="Avatar"
        thumbnail={{
          avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
        }}
      />
      <SearchGuide
        accessibilityLabel="AvatarGroup"
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
