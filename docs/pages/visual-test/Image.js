// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Image } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box padding={1}>
      <Box width={84} height={84}>
        <Image
          alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
          color="rgb(231, 186, 176)"
          naturalHeight={496}
          naturalWidth={496}
          src="https://i.ibb.co/FY2MKr5/stock6.jpg"
        />
      </Box>
    </Box>
  );
}
