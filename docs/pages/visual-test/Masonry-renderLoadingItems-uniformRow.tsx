import { useEffect, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Masonry } from 'gestalt';
import { TOKEN_COLOR_GRAY_ROBOFLOW_300 } from 'gestalt-design-tokens';

type Pin = {
  color: string;
  naturalHeight: number;
  src: string;
  width: number;
  name: string;
};

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

function getPins(): Promise<Array<Pin>> {
  const pinList = [...new Array(3)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}

const styles = {
  backgroundColor: `${TOKEN_COLOR_GRAY_ROBOFLOW_300}`,
  backgroundSize: '200vw 100%',
  content: '',
  position: 'relative',
  width: '100%',
} as const;

function SkeletonPin({ data }: { data: { height: number } }) {
  const { height } = data;
  return (
    <div style={styles}>
      <Box height={height} />
    </div>
  );
}

function GridComponent({
  data,
}: {
  data: {
    name: string;
    color: string;
    naturalHeight: number;
    width: number;
    src: string;
  };
}) {
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
    { height: randomPinHeight() },
    { height: randomPinHeight() },
    { height: randomPinHeight() },
    { height: randomPinHeight() },
    { height: randomPinHeight() },
  ])
  .flat();

export default function Snapshot() {
  const [items, setItems] = useState<Array<Pin>>([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      getPins().then(setItems);
    }, 2500);
  }, []);

  return (
    <ColorSchemeProvider colorScheme="light">
      <div
        ref={scrollContainerRef}
        style={{ overflowY: 'scroll', height: '100vh', width: '100vw' }}
      >
        <Masonry
          _loadingStateItems={skeletonPins}
          // Since we are prefixing this prop with "_", we get this eslint warning
          // eslint-disable-next-line react/no-unstable-nested-components
          _renderLoadingStateItems={({ data }) => <SkeletonPin data={data} />}
          columnWidth={170}
          gutterWidth={20}
          items={items}
          layout="uniformRow"
          renderItem={({ data }) => <GridComponent data={data} />}
        />
      </div>
    </ColorSchemeProvider>
  );
}
