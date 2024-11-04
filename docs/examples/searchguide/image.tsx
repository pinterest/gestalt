import { useRef, useState } from 'react';
import { Box, Flex, Image, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const vintageRef = useRef(null);
  const outfitRef = useRef(null);
  const [showVintage, setShowVintage] = useState(false);
  const [showOutfit, setShowOutfit] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex gap={2} width="100%" wrap>
        <SearchGuide
          accessibilityLabel="Design"
          color="01"
          text="Design"
          thumbnail={{
            image: (
              <Image
                alt="Design"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/3CT3Xnp/image.png"
              />
            ),
          }}
        />
        <SearchGuide
          ref={vintageRef}
          accessibilityControls="popover"
          accessibilityExpanded={showVintage}
          accessibilityHaspopup
          accessibilityLabel="Vintage"
          color="02"
          expandable
          onClick={() => setShowVintage((showing) => !showing)}
          selected={showVintage}
          text="Vintage"
          thumbnail={{
            image: (
              <Image
                alt="Vintage"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/dWQ7HHg/image.png"
              />
            ),
          }}
        />
        <SearchGuide
          ref={outfitRef}
          accessibilityControls="popover"
          accessibilityExpanded={showOutfit}
          accessibilityHaspopup
          accessibilityLabel="Outfit"
          color="03"
          expandable
          onClick={() => setShowOutfit((showing) => !showing)}
          selected={showOutfit}
          text=""
          thumbnail={{
            image: (
              <Image
                alt="Outfit"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/bBXC23j/fashion.jpg"
              />
            ),
          }}
        />
      </Flex>
      {showVintage && (
        <Popover
          anchor={vintageRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowVintage(false)}
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
      {showOutfit && (
        <Popover
          anchor={outfitRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowOutfit(false)}
          size="flexible"
        >
          <Box height={120} overflow="scrollX" padding={4}>
            <Flex direction="row" gap={2} wrap>
              <SearchGuide color="01" text="Casual" />
              <SearchGuide color="02" text="Formal" />
              <SearchGuide color="03" text="Athletic" />
            </Flex>
          </Box>
        </Popover>
      )}
    </Flex>
  );
}
