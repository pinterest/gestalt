import { AvatarGroupCluster, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <Flex alignContent="center" gap={4} height="100%" justifyContent="center" wrap>
      <AvatarGroupCluster
        collaborators={[
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Sora',
            src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
          },
        ]}
      />
      <AvatarGroupCluster
        collaborators={[
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Sora',
            src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
          },
          {
            name: 'Ayesha',
            src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          },
        ]}
      />
      <AvatarGroupCluster
        collaborators={[
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Sora',
            src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
          },
          {
            name: 'Ayesha',
            src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          },
          {
            name: 'Katie',
            src: 'htthttps://i.ibb.co/NsK2w5y/Alberto.jpg',
          },
        ]}
      />
    </Flex>
  );
}
