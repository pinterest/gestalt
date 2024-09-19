import { Avatar, Box, Flex } from 'gestalt';

type AvatarColorIndex = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';

interface AvatarProps {
  name: string;
  avatarColorIndex: AvatarColorIndex;
}

const avatars: AvatarProps[] = [
  { name: 'Alberto', avatarColorIndex: '01' },
  { name: 'Andy', avatarColorIndex: '02' },
  { name: 'Alexandra', avatarColorIndex: '03' },
  { name: 'Alexi', avatarColorIndex: '04' },
  { name: 'Alonso', avatarColorIndex: '05' },
  { name: 'Arturo', avatarColorIndex: '06' },
  { name: 'Amanda', avatarColorIndex: '07' },
  { name: 'Angelina', avatarColorIndex: '08' },
  { name: 'Adrian', avatarColorIndex: '09' },
  { name: 'Amelia', avatarColorIndex: '10' },
];

export default function Example() {
  return (
    <Box maxWidth={900} width="100%">
      <Flex alignItems="center" height="50%" justifyContent="evenly" width="100%">
        {avatars.map(({ name, avatarColorIndex }) => (
          <Box key={name} width={40}>
            <Avatar avatarColor={avatarColorIndex} name={name} outline />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
