import { ReactNode, useRef, useState } from 'react';
import { Box, Dropdown, Flex, IconButtonFloating, Image, Text } from 'gestalt';

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

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <Box margin={2}>
      <Flex alignItems="center" flex="grow" gap={4} justifyContent="center" width="100%" wrap>
        {cards.map((card) => (
          <Flex.Item key={card.title} flex="grow">
            <Box
              borderStyle="sm"
              color="default"
              minWidth={320}
              padding={4}
              rounding={4}
              width="100%"
            >
              <Flex alignContent="center" direction="column" gap={3} justifyContent="between">
                <Text align="start" size="500">
                  {card.title}
                </Text>
                <Box height={170} width="100%">
                  <Image
                    alt=""
                    color="#000"
                    fit="cover"
                    naturalHeight={1}
                    naturalWidth={1}
                    role="presentation"
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
{ /* @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
      <Box ref={anchorRef} bottom margin={4} position="fixed" right role="contentinfo">
        <IconButtonFloating
          accessibilityControls="sections-dropdown-example"
          accessibilityExpanded={open}
          accessibilityLabel="Help & Resources Menu"
          accessibilityPopupRole="menu"
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
          idealDirection="up"
          onDismiss={() => setOpen(false)}
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
