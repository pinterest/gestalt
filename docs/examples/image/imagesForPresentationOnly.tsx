import { Box, Heading, Image } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box
        alignContent="center"
        borderStyle="sm"
        direction="column"
        display="flex"
        height={300}
        justifyContent="between"
        width={300}
      >
        <Box height={200} width="100%">
          <Image
            alt=""
            color="#000"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            role="presentation"
            src="https://i.ibb.co/FY2MKr5/stock6.jpg"
          />
        </Box>
        <Heading align="center" size="600">
          Article Title
        </Heading>
      </Box>
    </Box>
  );
}
