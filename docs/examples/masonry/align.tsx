import { useEffect, useId, useRef, useState } from 'react';
import { Box, Flex, Image, Label, Masonry, RadioGroup, Text } from 'gestalt';

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

  const pinList = Array.from({ length: 1 }, () => pins).flat();
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
  const [layout, setLayout] = useState<'basic' | 'basicCentered'>('basic');
  const [align, setAlign] = useState<'start' | 'center' | 'end'>('center');
  const [pins, setPins] = useState<ReadonlyArray<Pin>>([]);
  const [width, setWidth] = useState<number>(700);
  const scrollContainerRef = useRef<HTMLDivElement | null | undefined>();
  const gridRef = useRef<Masonry<Pin> | null | undefined>();

  const labelId = useId();

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
    });
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.handleResize();
    }
  }, [width]);

  const updateWidth = ({ target }: { target: HTMLInputElement }) => {
    setWidth(Number(target.value));
  };

  return (
    <Box padding={2}>
      <Flex direction="column" gap={4}>
        <Flex alignItems="center" direction="column">
          <Flex.Item>
            <Label htmlFor={labelId}>
              <Text>Container Width</Text>
            </Label>
          </Flex.Item>
          <input
            defaultValue={800}
            id={labelId}
            max={8000}
            min={200}
            onChange={updateWidth}
            step={5}
            style={{ width: '400px', display: 'block', margin: '10px auto' }}
            type="range"
          />
        </Flex>

        <div
          ref={(el) => {
            scrollContainerRef.current = el;
          }}
          style={{
            height: '300px',
            margin: '0 auto',
            outline: '3px solid #ddd',
            overflowY: 'scroll',
            width: `${width}px`,
          }}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          {scrollContainerRef.current && (
            <Masonry
              ref={(ref) => {
                gridRef.current = ref;
              }}
              align={align}
              columnWidth={170}
              gutterWidth={20}
              items={pins}
              layout={layout}
              minCols={1}
              renderItem={({ data }) => <GridComponent data={data} />}
              // @ts-expect-error - TS2322 - Type '() => HTMLDivElement | null | undefined' is not assignable to type '() => HTMLElement'.
              scrollContainer={() => scrollContainerRef.current}
            />
          )}
        </div>
      </Flex>
      <Flex gap={12} justifyContent="center">
        <RadioGroup id="layoutOptions" legend="Layout">
          <RadioGroup.RadioButton
            checked={layout === 'basic'}
            id="basic"
            label="basic"
            name="layout"
            onChange={() => setLayout('basic')}
            value="basic"
          />
          <RadioGroup.RadioButton
            checked={layout === 'basicCentered'}
            id="basicCentered"
            label="basicCentered"
            name="layout"
            onChange={() => setLayout('basicCentered')}
            value="basicCentered"
          />
        </RadioGroup>
        <RadioGroup id="alignOptions" legend="Align">
          <RadioGroup.RadioButton
            checked={align === 'start'}
            id="start"
            label="Start"
            name="align"
            onChange={() => setAlign('start')}
            value="start"
          />
          <RadioGroup.RadioButton
            checked={align === 'center'}
            id="center"
            label="Center (default)"
            name="align"
            onChange={() => setAlign('center')}
            value="center"
          />
          <RadioGroup.RadioButton
            checked={align === 'end'}
            id="end"
            label="End"
            name="align"
            onChange={() => setAlign('end')}
            value="end"
          />
        </RadioGroup>
      </Flex>
    </Box>
  );
}
