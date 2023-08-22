// @flow strict
import { type Node } from 'react';
import { Box, Image } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={6} paddingX={2}>
        <Image
          alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
          color="rgb(231, 186, 176)"
          loading="lazy"
          naturalHeight={496}
          naturalWidth={496}
          src="https://i.ibb.co/FY2MKr5/stock6.jpg"
        />
      </Box>
    </Box>
  );
}
