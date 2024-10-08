import { Avatar, Box, Flex } from 'gestalt';

type Color = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';

interface AvatarProps {
  name: string;
  color: Color;
}

const avatars: AvatarProps[] = [
  { name: 'Alberto', color: '01' },
  { name: 'Andy', color: '02' },
  { name: 'Alexandra', color: '03' },
  { name: 'Alexi', color: '04' },
  { name: 'Alonso', color: '05' },
  { name: 'Arturo', color: '06' },
  { name: 'Amanda', color: '07' },
  { name: 'Angelina', color: '08' },
  { name: 'Adrian', color: '09' },
  { name: 'Amelia', color: '10' },
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
