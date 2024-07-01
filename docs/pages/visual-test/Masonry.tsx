import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, Flex, Image, Masonry } from 'gestalt';

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

// Component to display a skeleton pin
function SkeletonPin({ height }: { height: number }) {
  const refCallback = useCallback((ref) => {
    // rewrite parent to use abs vs transform
    if (ref) {
      const parentEl = ref.parentElement;
      if (parentEl.style.transform) {
        const computedStyles = getComputedStyle(parentEl);
        if (computedStyles.transform) {
          const matrix = new DOMMatrix(computedStyles.transform);
          const { m41: x, m42: y } = matrix;
          parentEl.style.transform = '';
          parentEl.style.top = `${y}px`;
          parentEl.style.left = `${x}px`;
        }
      }
    }
  }, []);
  return (
    <div ref={refCallback} className="SkeletonPin__Loading">
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

  useEffect(() => {
    setTimeout(() => {
      getPins().then(setPins);
    }, 2500);
  }, []);

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
          columnWidth={170}
          gutterWidth={20}
          items={pins}
          layout="basicCentered"
          loadingStateItems={skeletonPins}
          renderItem={({ data }) => <GridComponent data={data} />}
          renderLoadingItems={({ data }) => <SkeletonPin height={data.height} />}
          scrollContainer={() => scrollContainerRef.current}
          useShimmeringSkeletonLoadingState
        />
      </div>
    </ColorSchemeProvider>
  );
}
