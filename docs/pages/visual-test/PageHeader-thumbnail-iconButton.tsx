import { Box, Image, PageHeader } from 'gestalt';

export default function Snapshot() {
  return (
    <Box width="100vw">
      <PageHeader
        helperIconButton={{
          accessibilityLabel: 'test',
          accessibilityControls: 'test',
          accessibilityExpanded: false,
          onClick: () => {},
        }}
        thumbnail={
          <Image
            alt="square"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          />
        }
        title="Product groups"
      />
    </Box>
  );
}
