import { useRef, useState } from 'react';
import { AvatarGroup, Box, Flex, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const pinsRef = useRef(null);
  const creatorsRef = useRef(null);
  const [showPins, setShowPins] = useState(false);
  const [showCreators, setShowCreators] = useState(false);

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
        accessibilityLabel="Boards"
        color="04"
        text="Boards"
        thumbnail={{
          avatarGroup: (
            <AvatarGroup
              accessibilityLabel="Boards: Alberto, Enio."
              collaborators={[
                {
                  name: 'Alberto',
                  src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
                },
                {
                  name: 'Enio',
                  src: 'https://i.ibb.co/r7hRdgc/1727060847006.jpg',
                },
              ]}
              size="md"
            />
          ),
        }}
      />
      <SearchGuide
        ref={pinsRef}
        accessibilityControls="popover"
        accessibilityExpanded={showPins}
        accessibilityHaspopup
        accessibilityLabel="Pins"
        color="01"
        expandable
        onClick={() => setShowPins((showing) => !showing)}
        selected={showPins}
        text="Pins"
        thumbnail={{
          avatarGroup: (
            <AvatarGroup
              accessibilityLabel="Pins: Keerthi, Fatima."
              collaborators={[
                {
                  name: 'Keerthi',
                  src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
                },
                {
                  name: 'Fatima',
                  src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
                },
              ]}
              size="md"
            />
          ),
        }}
      />
      {showPins && (
        <Popover
          anchor={pinsRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowPins(false)}
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
        ref={creatorsRef}
        accessibilityControls="popover"
        accessibilityExpanded={showCreators}
        accessibilityHaspopup
        accessibilityLabel="Creators"
        color="05"
        expandable
        onClick={() => setShowCreators((showing) => !showing)}
        selected={showCreators}
        text="Creators"
        thumbnail={{
          avatarGroup: (
            <AvatarGroup
              accessibilityLabel="Creators: Ayesha, Shanice."
              collaborators={[
                {
                  name: 'Ayesha',
                  src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                },
                {
                  name: 'Shanice',
                  src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
                },
              ]}
              size="md"
            />
          ),
        }}
      />
      {showCreators && (
        <Popover
          anchor={creatorsRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowCreators(false)}
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
