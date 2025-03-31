import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, ColorSchemeProvider, DesignTokensProvider, Flex, Image, Masonry } from 'gestalt';
import { TOKEN_COLOR_GRAY_ROBOFLOW_300 } from 'gestalt-design-tokens';

const styles = {
  backgroundColor: `${TOKEN_COLOR_GRAY_ROBOFLOW_300}`,
  backgroundSize: '200vw 100%',
  content: '',
  position: 'relative',
  width: '100%',
} as const;

type SkeletonPinProps = {
  key: string;
  height: number;
};

function SkeletonPin({ data }: { data: SkeletonPinProps }) {
  const { height } = data;
  return (
    <div style={styles}>
      <Box height={height} />
    </div>
  );
}

const smallPinHeight = 236;
const largePinHeight = 356;

function getSkeletonPins(numOfPins: number) {
  return Array.from({ length: numOfPins }).reduce<Array<{ height: number; key: string }>>(
    (acc: Array<{ height: number; key: string }>, _, i) => {
      const height = i % 2 === 0 ? largePinHeight : smallPinHeight;
      return [...acc, { height, key: `skeleton-pin-${i}`, isSkeleton: true }];
    },
    [],
  );
}

function isSkeletonPin<T>(data: T | SkeletonPinProps): data is SkeletonPinProps {
  return Boolean(data && typeof data === 'object' && 'key' in data && 'height' in data);
}

function useSkeletonPins<T>({
  isFetching,
  items = [],
  renderItem,
}: {
  isFetching: boolean;
  items: T[];
  renderItem: (props: { data: T; itemIdx: number; isMeasuring: boolean }) => React.ReactNode;
}) {
  const isInitialLoadingState = isFetching && items.length === 0;
  const isInfiniteScrolling = isFetching && items.length > 0;

  const skeletonPins = useMemo(
    () => getSkeletonPins(isInfiniteScrolling ? 5 : 15),
    [isInfiniteScrolling],
  );

  // eslint-disable-next-line no-underscore-dangle
  const _items = useMemo(() => {
    if (isInitialLoadingState) {
      return skeletonPins;
    }

    if (isInfiniteScrolling) {
      return [...items, ...skeletonPins];
    }

    return items;
  }, [isInitialLoadingState, isInfiniteScrolling, items, skeletonPins]) as T[];

  // eslint-disable-next-line no-underscore-dangle
  const _renderItem = useMemo(
    () =>
      function renderMasonryItem(props: { data: T; itemIdx: number; isMeasuring: boolean }) {
        const { itemIdx, data } = props;

        if (itemIdx >= items.length && isSkeletonPin(data)) {
          return <SkeletonPin key={data.key} data={data} />;
        }

        return renderItem(props);
      },
    [renderItem, items.length],
  );

  return {
    _items,
    _renderItem,
  };
}

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

export default function Snapshot() {
  const [items, setItems] = useState<Array<Pin>>([]);
  const [isFetching, setIsFetching] = useState(true);

  const scrollContainerRef = useRef(null);

  const { _items, _renderItem } = useSkeletonPins({
    isFetching,
    items,
    renderItem: GridComponent,
  });

  const loadMoreItems = useCallback(() => {
    if (!isFetching) {
      setIsFetching(true);
      setTimeout(() => {
        getPins().then((newPins) => {
          setItems((prevItems) => [...prevItems, ...newPins]);
          setIsFetching(false);
        });
      }, 2500);
    }
  }, [isFetching]);

  useEffect(() => {
    setTimeout(() => {
      getPins().then((loadedPins) => {
        setItems(loadedPins);
        setIsFetching(false);
      });
    }, 2500);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (scrollHeight - scrollTop - clientHeight < 300) {
        loadMoreItems();
      }
    };

    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, [loadMoreItems]);

  return (
    <ColorSchemeProvider colorScheme="light">
      <DesignTokensProvider>
        <div
          ref={scrollContainerRef}
          style={{
            overflowY: 'scroll',
            minHeight: '150vh', // Force content to be taller than viewport
            width: '100vw',
          }}
        >
          <Masonry columnWidth={170} gutterWidth={20} items={_items} renderItem={_renderItem} />
        </div>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
