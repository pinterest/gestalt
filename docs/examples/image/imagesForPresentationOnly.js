// @flow strict
import { type Node } from 'react';
import { Box, Heading, Image } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box
        display="flex"
        alignContent="center"
        justifyContent="between"
        direction="column"
        borderStyle="sm"
        height={300}
        width={300}
      >
        <Box height={200} width="100%">
          <Image
            alt=""
            role="presentation"
            color="#000"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
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
