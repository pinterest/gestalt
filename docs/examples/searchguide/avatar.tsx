import { useRef, useState } from 'react';
import { Avatar, Box, Flex, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const enioRef = useRef(null);
  const keerthiRef = useRef(null);
  const [showEnio, setShowEnio] = useState(false);
  const [showKeerthi, setShowKeerthi] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex gap={2} width="100%" wrap>
        <SearchGuide
          accessibilityLabel="Fatima"
          color="02"
          text="Fatima"
          thumbnail={{
            avatar: (
              <Avatar
                name="Fatima"
                src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
              />
            ),
          }}
        />
        <SearchGuide
          ref={enioRef}
          accessibilityControls="popover"
          accessibilityExpanded={showEnio}
          accessibilityHaspopup
          accessibilityLabel="Sora"
          color="03"
          expandable
          onClick={() => setShowEnio((showing) => !showing)}
          selected={showEnio}
          text="Sora"
          thumbnail={{
            avatar: (
              <Avatar
                name="Sora"
                src="https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg"
              />
            ),
          }}
        />
        <SearchGuide
          ref={keerthiRef}
          accessibilityControls="popover"
          accessibilityExpanded={showKeerthi}
          accessibilityHaspopup
          accessibilityLabel="Ayesha"
          color="04"
          expandable
          onClick={() => setShowKeerthi((showing) => !showing)}
          selected={showKeerthi}
          text=""
          thumbnail={{
            avatar: (
              <Avatar
                name="Ayesha"
                src="https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg"
              />
            ),
          }}
        />
      </Flex>
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
