import { Box, ColorSchemeProvider, Masonry, Text } from 'gestalt';

const dataObject = [
  { height: 100, name: 'Pin 1' },
  { height: 200, name: 'Pin 2' },
  { height: 150, name: 'Pin 3' },
  { height: 80, name: 'Pin 4' },
  { height: 100, name: 'Pin 5' },
  { height: 200, name: 'Pin 6' },
  { height: 150, name: 'Pin 7' },
  { height: 80, name: 'Pin 8' },
  { height: 100, name: 'Pin 9' },
  { height: 60, name: 'Pin 10' },
];

function GridComponent({
  data,
}: {
  data: {
    height: number;
    name: string;
  };
}) {
  return (
    <Box color="successBase" height={data.height} width={50}>
      <Text>{data.name}</Text>
    </Box>
  );
}

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" display="inlineBlock" padding={1} width={300}>
        <Masonry
          columnWidth={50}
          gutterWidth={3}
          items={dataObject}
          minCols={1}
          renderItem={({ data }) => <GridComponent data={data} />}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
