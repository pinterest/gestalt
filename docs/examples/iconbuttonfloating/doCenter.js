// @flow strict
import { useState, useRef, type Node } from 'react';
import { IconButtonFloating, Dropdown, Box, Flex, Image, Mask } from 'gestalt';

export default function DoForScroll(): Node {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const anchorRef = useRef(null);

  const onSelect = ({ item }) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  const pins = [
    {
      src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
      name: 'the Hang Son Doong cave in Vietnam',
    },
    {
      src: 'https://i.ibb.co/zNDxPtn/stock10.jpg',
      name: 'La Gran Muralla, Pekín, China',
    },
    {
      src: 'https://i.ibb.co/M5TdMNq/stock11.jpg',
      name: 'Plitvice Lakes National Park, Croatia',
    },
    {
      src: 'https://i.ibb.co/r0NZKrk/stock12.jpg',
      name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
    },
    {
      src: 'https://i.ibb.co/zmFd0Dv/stock13.jpg',
      name: 'Border of China and Vietnam',
    },
    {
      src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
      name: 'the Hang Son Doong cave in Vietnam',
    },
  ];

  return (
    <Box margin={3}>
      <Flex justifyContent="center" width="100%" height="100%" gap={5} alignItems="center" wrap>
        {pins.map((pin) => (
          <Box key={pin.name} height={170} width={100}>
            <Mask rounding={2} width="100%" height="100%">
              <Image
                alt={pin.name}
                color="#000"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src={pin.src}
              />
            </Mask>
          </Box>
        ))}
      </Flex>
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
