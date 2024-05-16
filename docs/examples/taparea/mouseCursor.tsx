import {ReactNode} from 'react';
import { Box, Flex, TapArea, Text } from 'gestalt';

const descriptions = {
  'copy': 'Use the copy cursor to indicate an element is to be copied.',
  'default':
    'Use the default cursor over non-interactive elements. The default cursor should change to a pointer if the element it hovers over is also clickable or indicates functionally',
  'grab': 'Use the grab cursor to indicate something can be grabbed (dragged to be moved).',
  'grabbing':
    'Use the grabbing cursor to indicate something is being grabbed (dragged to be moved).',
  'move': 'Use the move cursor to indicate something is to be moved.',
  'noDrop':
    'Use the noDrop cursor to reinforce that an item may not be dropped at the current location.',
  'pointer': 'Use the pointer cursor to indicate interactive elements, such as links or actions.',
  'zoomIn': 'Use the ZoomIn cursor to indicate something can be zoomed (magnified) in.',
  'zoomOut': 'Use the ZoomIn cursor to indicate something can be zoomed out.',
} as const;

export default function TapAreaExample() {
  return (
    <Flex gap={2} wrap>
      {Object.keys(descriptions).map((cursor) => (
        <TapArea key={cursor} fullWidth={false} mouseCursor={cursor}>
          <Box borderStyle="lg" height={250} padding={4} width={250}>
            <Flex direction="column" height="100%" justifyContent="between">
              <Box>
                <Box marginBottom={2}>
                  <Text size="200" weight="bold">
                    {`mouseCursor="${cursor}"`}
                  </Text>
                </Box>
                <Text size="200">{descriptions[cursor]}</Text>
              </Box>
              <Text size="100">hover here </Text>
            </Flex>
          </Box>
        </TapArea>
      ))}
    </Flex>
  );
}
