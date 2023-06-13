// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Masonry, Text } from 'gestalt';

type Pin = {|
  color: string,
  height: number,
  name: string,
  src: string,
  width: number,
|};

function getPins(): Promise<$ReadOnlyArray<Pin>> {
  const pins: $ReadOnlyArray<Pin> = [
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

  const pinList = [...new Array<?Pin>(3)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}

function GridComponent({ data }: { data: Pin, ... }) {
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

export default function Example(): Node {
  const [pins, setPins] = useState<$ReadOnlyArray<Pin>>([]);
  const scrollContainerRef = useRef<?HTMLDivElement>();
  const gridRef = useRef<?Masonry<Pin>>();

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
    });
  }, []);

  return (
    <Box padding={2}>
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={(el) => {
          scrollContainerRef.current = el;
        }}
        style={{
          height: '375px',
          margin: '0 auto',
          outline: '3px solid #ddd',
          overflowY: 'scroll',
          width: `800px`,
        }}
      >
        {scrollContainerRef.current && (
          <Masonry
            columnWidth={170}
            gutterWidth={20}
            items={pins}
            layout="uniformRow"
            minCols={1}
            ref={(ref) => {
              gridRef.current = ref;
            }}
            renderItem={({ data }) => <GridComponent data={data} />}
            // $FlowFixMe[incompatible-type]
            scrollContainer={() => scrollContainerRef.current}
          />
        )}
      </div>
    </Box>
  );
}
