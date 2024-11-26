import React, { useEffect, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Masonry } from 'gestalt';
import { TOKEN_COLOR_GRAY_ROBOFLOW_300 } from 'gestalt-design-tokens';

type Pin = {
  color: string;
  naturalHeight: number;
  src: string;
  width: number;
  name: string;
};

type SkeletonPin = {
  key: string;
  height: number;
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

function SkeletonPin({ data }: { data: SkeletonPin }) {
  const { height } = data;
  return (
    <div style={styles}>
      <Box height={height} />
    </div>
  );
}

function GridComponent({ data }: { data: Pin }) {
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

const smallPinHeight = 236;
const largePinHeight = 356;

function getSkeletonPins(numOfPins: number) {
  return Array.from({ length: numOfPins }).reduce<Array<{ height: number; key: React.Key }>>(
    (acc, _, i) => {
      const height = i % 2 === 0 ? largePinHeight : smallPinHeight;
      return [...acc, { height, key: `skeleton-pin-${i}`, isSkeletonPin: true }];
    },
    [],
  );
}

export function isSkeletonPin<T>(item: T | SkeletonPin): item is SkeletonPin {
  return Boolean(item && typeof item === 'object' && 'height' in item && 'isSkeletonPin' in item);
}

export default function Snapshot() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      getPins().then(setItems);
    }, 2500);
  }, []);

  const skeletonPins = getSkeletonPins(50);
  const finalItems = items.length === 0 ? skeletonPins : items;

  return (
    <ColorSchemeProvider colorScheme="light">
      <div
        ref={scrollContainerRef}
        style={{ overflowY: 'scroll', height: '100vh', width: '100vw' }}
      >
        <Masonry
          columnWidth={170}
          gutterWidth={20}
          items={finalItems}
          layout="flexible"
          renderItem={({ data, itemIdx }) => {
            if (itemIdx >= items.length && isSkeletonPin(data)) {
              return <SkeletonPin key={data.key} data={data} />;
            }
            return <GridComponent data={data as Pin} />;
          }}
        />
      </div>
    </ColorSchemeProvider>
  );
}
