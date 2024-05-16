import { Box, Image } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
