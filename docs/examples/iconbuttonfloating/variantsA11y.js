// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Dropdown, Flex, IconButtonFloating, Image, Mask } from 'gestalt';

const pins = [
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
  {
    color: '#2b3938',
    height: 316,
    src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
    width: 474,
    name: 'the Hang Son Doong cave in Vietnam',
  },
];

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    $ReadOnlyArray<{| label: string, subtext?: string, value: string |}>,
  >([]);
  const anchorRef = useRef<null | HTMLElement>(null);

  const onSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  return (
    <Box margin={3}>
      <Box role="main">
        <Flex justifyContent="center" width="100%" height="100%" gap={5} alignItems="center" wrap>
          {[...new Array<void | $ReadOnlyArray<Node>>(3)].map(() =>
            pins.map((pin) => (
              <Mask rounding={2} key={pin.name} height={170} width={100}>
                <Image
                  alt={pin.name}
                  role="presentation"
                  color="white"
                  fit="cover"
                  naturalHeight={1}
                  naturalWidth={1}
                  src={pin.src}
                />
              </Mask>
            )),
          )}
        </Flex>
      </Box>
      <Box
        role="contentinfo"
        position="fixed"
        bottom
        ref={anchorRef}
        marginBottom={2}
        dangerouslySetInlineStyle={{ __style: { left: '50%', transform: 'translate(-50%)' } }}
      >
        <IconButtonFloating
          accessibilityControls="sections-dropdown-example"
          accessibilityExpanded={open}
          accessibilityPopupRole="menu"
          accessibilityLabel="Create Pin Menu"
          icon="add"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          tooltip={{ text: 'Create Pin Menu' }}
        />
      </Box>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
          idealDirection="up"
        >
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Box>
  );
}
