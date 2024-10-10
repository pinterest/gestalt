import { useRef, useState } from 'react';
import { Avatar, Box, Flex, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const enioRef = useRef(null);
  const keerthiRef = useRef(null);
  const [showEnio, setShowEnio] = useState(false);
  const [showKeerthi, setShowKeerthi] = useState(false);

  return (
    <Flex
      alignItems="center"
      direction="row"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <SearchGuide
        accessibilityLabel="Alberto"
        color="02"
        text="Alberto"
        thumbnail={{
          avatar: <Avatar name="Alberto" src="https://i.ibb.co/NsK2w5y/Alberto.jpg" />,
        }}
      />
      <SearchGuide
        ref={enioRef}
        accessibilityControls="popover"
        accessibilityExpanded={showEnio}
        accessibilityHaspopup
        accessibilityLabel="Enio"
        color="03"
        expandable
        onClick={() => setShowEnio((showing) => !showing)}
        selected={showEnio}
        text="Enio"
        thumbnail={{
          avatar: <Avatar name="Enio" src="https://i.ibb.co/r7hRdgc/1727060847006.jpg" />,
        }}
      />
      {showEnio && (
        <Popover
          anchor={enioRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowEnio(false)}
          size="flexible"
        >
          <Box height={120} overflow="scrollX" padding={4}>
            <Flex direction="row" gap={2} wrap>
              <SearchGuide color="01" text="Boards" />
              <SearchGuide color="02" text="Pins" />
            </Flex>
          </Box>
        </Popover>
      )}
      <SearchGuide
        ref={keerthiRef}
        accessibilityControls="popover"
        accessibilityExpanded={showKeerthi}
        accessibilityHaspopup
        accessibilityLabel="Keerthi"
        color="04"
        expandable
        onClick={() => setShowKeerthi((showing) => !showing)}
        selected={showKeerthi}
        text=""
        thumbnail={{
          avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
        }}
      />
      {showKeerthi && (
        <Popover
          anchor={keerthiRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowKeerthi(false)}
          size="flexible"
        >
          <Box height={120} overflow="scrollX" padding={4}>
            <Flex direction="row" gap={2} wrap>
              <SearchGuide color="01" text="Boards" />
              <SearchGuide color="02" text="Pins" />
            </Flex>
          </Box>
        </Popover>
      )}
    </Flex>
  );
}
