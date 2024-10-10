import { useRef, useState } from 'react';
import { Box, Flex, Icon, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const ideasRef = useRef(null);
  const boardsRef = useRef(null);
  const [showIdeas, setshowIdeas] = useState(false);
  const [showBoards, setshowBoards] = useState(false);

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
        accessibilityLabel="Search"
        color="02"
        text="Search"
        thumbnail={{
          icon: <Icon accessibilityLabel="search" icon="search" />,
        }}
      />
      <SearchGuide
        ref={ideasRef}
        accessibilityControls="popover"
        accessibilityExpanded={showIdeas}
        accessibilityHaspopup
        accessibilityLabel="Ideas"
        color="03"
        expandable
        onClick={() => setshowIdeas((showing) => !showing)}
        selected={showIdeas}
        text="Ideas"
        thumbnail={{
          icon: <Icon accessibilityLabel="ideas" icon="sparkle" />,
        }}
      />
      {showIdeas && (
        <Popover
          anchor={ideasRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setshowIdeas(false)}
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
        ref={boardsRef}
        accessibilityLabel="Search"
        color="04"
        expandable
        onClick={() => setshowBoards((showing) => !showing)}
        selected={showBoards}
        text=""
        thumbnail={{
          icon: <Icon accessibilityLabel="search" icon="search" />,
        }}
      />
      {showBoards && (
        <Popover
          anchor={boardsRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setshowBoards(false)}
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
