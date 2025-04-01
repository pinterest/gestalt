import { AvatarGroup, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
        collaborators={[
          {
            name: 'Artwork 1',
            src: 'https://i.pinimg.com/564x/2e/f4/80/2ef48048ccdb68439ef6a6ef1d842e4f.jpg',
          },
          {
            name: 'Artwork 2',
            src: 'https://i.pinimg.com/564x/2a/37/68/2a3768dd4640aebfe93537ec37b016a6.jpg',
          },
          {
            name: 'Artwork 3',
            src: 'https://i.pinimg.com/564x/49/20/5d/49205d231674daf0ddaadd606dd0f60e.jpg',
          },
        ]}
        size="md"
      />
    </Flex>
  );
}
