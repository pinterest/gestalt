// @flow strict
import { useState, useRef, type Node } from 'react';
import { IconButtonFloating, Dropdown, Box, Flex, Image, Text } from 'gestalt';

const cards = [
  {
    title: 'Newsroom',
    description: "Today's Top Holiday Picks",
    src: 'https://i.ibb.co/FY2MKr5/stock6.jpg',
  },
  {
    title: 'Pinterest Trends',
    description: 'Checkout our 2023 predictions',
    src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
  },
];

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <Box margin={2}>
      <Flex justifyContent="center" width="100%" flex="grow" gap={4} alignItems="center" wrap>
        {cards.map((card) => (
          <Flex.Item flex="grow" key={card.title}>
            <Box
              borderStyle="sm"
              minWidth={320}
              width="100%"
              color="default"
              rounding={4}
              padding={4}
            >
              <Flex gap={3} alignContent="center" justifyContent="between" direction="column">
                <Text align="start" size="500">
                  {card.title}
                </Text>
                <Box height={170} width="100%">
                  <Image
                    alt=""
                    role="presentation"
                    color="#000"
                    fit="cover"
                    naturalHeight={1}
                    naturalWidth={1}
                    src={card.src}
                  />
                </Box>
                <Text align="start" size="300">
                  {card.description}
                </Text>
              </Flex>
            </Box>
          </Flex.Item>
        ))}
      </Flex>
      <Box margin={4} position="fixed" bottom right ref={anchorRef} role="contentinfo">
        <IconButtonFloating
          accessibilityControls="sections-dropdown-example"
          accessibilityExpanded={open}
          accessibilityPopupRole="menu"
          accessibilityLabel="Help & Resources Menu"
          icon="question-mark"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          tooltip={{
            text: 'Help & Resources Menu',
          }}
        />
      </Box>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
          idealDirection="up"
        >
          <Dropdown.Link
            href="#"
            isExternal
            onClick={() => {
              /* log click here */
            }}
            option={{ value: 'Get help', label: 'Visit the Help Center' }}
          />
          <Dropdown.Link
            href="#"
            isExternal
            onClick={() => {
              /* log click here */
            }}
            option={{ value: 'Get help', label: 'Create widget' }}
          />
        </Dropdown>
      )}
    </Box>
  );
}
