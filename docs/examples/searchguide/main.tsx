import { AvatarGroup,Flex, SearchGuide } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <SearchGuide text="Save" />
      <SearchGuide
          accessibilityLabel="Pins"
          color="01"
          expandable
          onClick={() => {}}
          text="Pins"
          thumbnail={{
            avatarGroup: (
              <AvatarGroup
                accessibilityLabel="Fatima, Sora."
                collaborators={[
                  {
                    name: 'Sora',
                    src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
                  },
                  {
                    name: 'Ayesha',
                    src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
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
