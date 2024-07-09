import { useEffect, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Masonry } from 'gestalt';
import { TOKEN_COLOR_GRAY_ROBOFLOW_300 } from 'gestalt-design-tokens';

function getPins() {
  const pins = [
    {
      color: '#2b3938',
      naturalHeight: 316,
      src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
      width: 474,
      name: 'the Hang Son Doong cave in Vietnam',
    },
    {
      color: '#8e7439',
      naturalHeight: 1081,
      src: 'https://i.ibb.co/zNDxPtn/stock10.jpg',
      width: 474,
      name: 'La Gran Muralla, Pekín, China',
    },
    {
      color: '#698157',
      naturalHeight: 711,
      src: 'https://i.ibb.co/M5TdMNq/stock11.jpg',
      width: 474,
      name: 'Plitvice Lakes National Park, Croatia',
    },
    {
      color: '#4e5d50',
      naturalHeight: 632,
      src: 'https://i.ibb.co/r0NZKrk/stock12.jpg',
      width: 474,
      name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
    },
    {
      color: '#6d6368',
      naturalHeight: 710,
      src: 'https://i.ibb.co/zmFd0Dv/stock13.jpg',
      width: 474,
      name: 'Border of China and Vietnam',
    },
  ];

  const pinList = [...new Array(3)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}

const styles = {
  backgroundColor: `${TOKEN_COLOR_GRAY_ROBOFLOW_300}`,
  backgroundSize: '200vw 100%',
  content: '',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
} as const;
// className="SkeletonPin__Loading"
// Component to display a skeleton pin
function SkeletonPin({ height }: { height: number }) {
  return (
    <div style={styles}>
      <Box height={height} width="100%" />
    </div>
  );
}

function GridComponent({ data }) {
  return (
    <Flex direction="column">
      <Image
        alt={data.name}
        color={data.color}
        naturalHeight={data.naturalHeight}
        naturalWidth={data.width}
        src={data.src}
      />
    </Flex>
  );
}

const randomPinHeight = () => Math.random() * 200 + 100;

const skeletonPins = [...new Array(3)]
  .map(() => [
    { id: 1, height: randomPinHeight(), width: 474 },
    { id: 2, height: randomPinHeight(), width: 474 },
    { id: 3, height: randomPinHeight(), width: 474 },
    { id: 4, height: randomPinHeight(), width: 474 },
    { id: 5, height: randomPinHeight(), width: 474 },
  ])
  .flat();

export default function Snapshot() {
  const [pins, setPins] = useState([]);
  const scrollContainerRef = useRef(null);
  const gridRef = useRef(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getPins().then(setPins);
  //   }, 2500);
  // }, []);

  return (
    <ColorSchemeProvider colorScheme="light">
      <div
        ref={scrollContainerRef}
        style={{ overflowY: 'scroll', height: '100vh', width: '100vw' }}
      >
        <Masonry
          ref={(ref) => {
            gridRef.current = ref;
          }}
          _loadingStateItems={skeletonPins}
          _renderLoadingItems={({ data }) => <SkeletonPin height={data.height} />}
          columnWidth={170}
          gutterWidth={20}
          items={pins}
          layout="basicCentered"
          renderItem={({ data }) => <GridComponent data={data} />}
          scrollContainer={() => scrollContainerRef.current}
        />
      </div>
    </ColorSchemeProvider>
  );
}
