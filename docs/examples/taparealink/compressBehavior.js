// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Image, Label, Mask, Switch, TapAreaLink, Text } from 'gestalt';

export default function Example(): Node {
  const [disabled, setDisabled] = useState(false);
  const [compressed, setCompressed] = useState('compress');
  const [tabIndex, setTabIndex] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex alignItems="start" direction="column" gap={{ column: 6, row: 0 }}>
        <Flex gap={6} wrap>
          <TapAreaLink
            tapStyle={compressed}
            disabled={disabled}
            target="blank"
            href="https://www.pinterest.com"
            tabIndex={tabIndex ? -1 : 0}
          >
            <Box padding={3} column={12} borderStyle="lg" width={200}>
              <Mask rounding={2}>
                <Image
                  alt="Antelope Canyon"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/DwYrGy6/stock14.jpg"
                />
              </Mask>
              <Text align="center">Visit Pinterest.com</Text>
            </Box>
          </TapAreaLink>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Switch
            onChange={() => setCompressed(compressed === 'compress' ? 'none' : 'compress')}
            id="compress-buttons"
            switched={compressed === 'compress'}
          />
          <Box paddingX={2} flex="grow">
            <Label htmlFor="compress-buttons">
              <Text>Compress TapArea</Text>
            </Label>
          </Box>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Switch
            onChange={() => setDisabled(!disabled)}
            id="disable-buttons"
            switched={disabled}
          />
          <Box paddingX={2} flex="grow">
            <Label htmlFor="disable-buttons">
              <Text>Disable TapArea</Text>
            </Label>
          </Box>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Switch
            onChange={() => setTabIndex(!tabIndex)}
            id="unreachable-buttons"
            switched={tabIndex}
          />
          <Box paddingX={2} flex="grow">
            <Label htmlFor="unreachable-buttons">
              <Text>Remove from keyboard navigation with tabIndex</Text>
            </Label>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
