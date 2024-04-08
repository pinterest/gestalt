// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Image, Label, Mask, Switch, TapArea, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [disabled, setDisabled] = useState(false);
  const [compressed, setCompressed] = useState('compress');
  const [touches, setTouches] = useState(0);
  const [tabIndex, setTabIndex] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="start" direction="column" gap={{ column: 6, row: 0 }}>
        <Flex gap={6} wrap>
          <TapArea
            disabled={disabled}
            onTap={() => setTouches(touches + 1)}
            tabIndex={tabIndex ? -1 : 0}
            tapStyle={compressed}
          >
            <Box borderStyle="lg" column={12} padding={3} width={200}>
              <Mask rounding={2}>
                <Image
                  alt="Antelope Canyon"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/DwYrGy6/stock14.jpg"
                />
              </Mask>
              <Text align="center">
                Touched {touches} {touches === 1 ? 'time' : 'times'}
              </Text>
            </Box>
          </TapArea>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Switch
            id="compress-buttons"
            onChange={() => setCompressed(compressed === 'compress' ? 'none' : 'compress')}
            switched={compressed === 'compress'}
          />
          <Box flex="grow" paddingX={2}>
            <Label htmlFor="compress-buttons">
              <Text>Compress TapArea</Text>
            </Label>
          </Box>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Switch
            id="disable-buttons"
            onChange={() => setDisabled(!disabled)}
            switched={disabled}
          />
          <Box flex="grow" paddingX={2}>
            <Label htmlFor="disable-buttons">
              <Text>Disable TapArea</Text>
            </Label>
          </Box>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Switch
            id="unreachable-buttons"
            onChange={() => setTabIndex(!tabIndex)}
            switched={tabIndex}
          />
          <Box flex="grow" paddingX={2}>
            <Label htmlFor="unreachable-buttons">
              <Text>Remove from keyboard navigation with tabIndex</Text>
            </Label>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
