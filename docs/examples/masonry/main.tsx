import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Masonry, Text } from 'gestalt';

type Pin = {
  color: string;
  height: number;
  name: string;
  src: string;
  width: number;
};

function getPins(): Promise<ReadonlyArray<Pin>> {
  const pins: ReadonlyArray<Pin> = [
    {
      color: '#2b3938',
      height: 316,
      src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
      width: 474,
      name: 'the Hang Son Doong cave in Vietnam',
    },
    {
      color: '#8e7439',
      height: 1081,
      src: 'https://i.ibb.co/zNDxPtn/stock10.jpg',
      width: 474,
      name: 'La Gran Muralla, Pekín, China',
    },
    {
      color: '#698157',
      height: 711,
      src: 'https://i.ibb.co/M5TdMNq/stock11.jpg',
      width: 474,
      name: 'Plitvice Lakes National Park, Croatia',
    },
    {
      color: '#4e5d50',
      height: 632,
      src: 'https://i.ibb.co/r0NZKrk/stock12.jpg',
      width: 474,
      name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
    },
    {
      color: '#6d6368',
      height: 710,
      src: 'https://i.ibb.co/zmFd0Dv/stock13.jpg',
      width: 474,
      name: 'Border of China and Vietnam',
    },
  ];

  const pinList = [...new Array<Pin | null | undefined>(3)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}

function GridComponent({ data }: { data: Pin }) {
  return (
    <Flex direction="column">
      <Image
        alt={data.name}
        color={data.color}
        naturalHeight={data.height}
        naturalWidth={data.width}
        src={data.src}
      />
      <Text>{data.name}</Text>
    </Flex>
  );
}

export default function Example() {
  const [pins, setPins] = useState<ReadonlyArray<Pin>>([]);
  const scrollContainerRef = useRef<HTMLElement | null | undefined>();
  const gridRef = useRef<Masonry<Pin> | null | undefined>();

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
    });
  }, []);

  return (
    <Box
      ref={(el) => {
        scrollContainerRef.current = el;
      }}
      height="100%"
      marginEnd="auto"
      marginStart="auto"
      padding={4}
      width="100%"
    >
      {scrollContainerRef.current && (
        <Masonry
          ref={(ref) => {
            gridRef.current = ref;
          }}
          columnWidth={170}
          gutterWidth={20}
          items={pins}
          layout="basicCentered"
          renderItem={({ data }) => <GridComponent data={data} />}
          // @ts-expect-error - TS2322 - Type '() => HTMLElement | null | undefined' is not assignable to type '() => HTMLElement'.
          scrollContainer={() => scrollContainerRef.current}
        />
      )}
    </Box>
  );
}
