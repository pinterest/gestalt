import { Avatar, Box, Flex } from 'gestalt';

type Color = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface AvatarProps {
  name: string;
  color: Color;
}

const avatars: AvatarProps[] = [
  { name: 'Alberto', color: 1 },
  { name: 'Andy', color: 2 },
  { name: 'Alexandra', color: 3 },
  { name: 'Alexi', color: 4 },
  { name: 'Alonso', color: 5 },
  { name: 'Arturo', color: 6 },
  { name: 'Amanda', color: 7 },
  { name: 'Angelina', color: 8 },
  { name: 'Adrian', color: 9 },
  { name: 'Amelia', color: 10 },
];

export default function Example() {
  return (
    <Box marginTop={4} maxWidth={900} width="100%">
      <Flex alignItems="center" height="50%" justifyContent="evenly" width="100%">
        {avatars.map(({ name, color }) => (
          <Box key={name} width={40}>
            <Avatar color={color} name={name} outline />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
