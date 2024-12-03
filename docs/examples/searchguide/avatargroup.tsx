import { useRef, useState } from 'react';
import { AvatarGroup, Box, Flex, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const pinsRef = useRef(null);
  const creatorsRef = useRef(null);
  const [showPins, setShowPins] = useState(false);
  const [showCreators, setShowCreators] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex gap={2} width="100%" wrap>
        <SearchGuide
          accessibilityLabel="Pins"
          color="04"
          text="Pins"
          thumbnail={{
            avatarGroup: (
              <AvatarGroup
                accessibilityLabel="Fatima, Sora."
                collaborators={[
                  {
                    name: 'Fatima',
                    src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
                  },
                  {
                    name: 'Sora',
                    src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
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
                accessibilityLabel="Fatima, Sora."
                collaborators={[
                  {
                    name: 'Sora',
                    src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
                  },
                  {
                    name: 'Ayesha',
                    src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                  },
                ]}
                size="md"
              />
            ),
          }}
        />
        <SearchGuide
          ref={creatorsRef}
          accessibilityControls="popover"
          accessibilityExpanded={showCreators}
          accessibilityHaspopup
          accessibilityLabel="Pins"
          color="05"
          expandable
          onClick={() => setShowCreators((showing) => !showing)}
          selected={showCreators}
          text=""
          thumbnail={{
            avatarGroup: (
              <AvatarGroup
                accessibilityLabel="Fatima, Sora."
                collaborators={[
                  {
                    name: 'Ayesha',
                    src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                  },
                  {
                    name: 'Fatima',
                    src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
                  },
                  {
                    name: 'Sora',
                    src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
                  },
                ]}
                size="md"
              />
            ),
          }}
        />
      </Flex>
      {showPins && (
        <Popover
          anchor={pinsRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowPins(false)}
          size="flexible"
        >
          <Box overflow="scrollX" padding={4}>
            <Flex direction="row" gap={2} wrap>
              <SearchGuide color="01" text="Boards" />
              <SearchGuide color="02" text="Pins" />
            </Flex>
          </Box>
        </Popover>
      )}
      {showCreators && (
        <Popover
          anchor={creatorsRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowCreators(false)}
          size="flexible"
        >
          <Box overflow="scrollX" padding={4}>
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
