// @flow strict
import { Fragment, type Node, useRef, useState } from 'react';
import { Box, Flex, Image, Layer, Mask, Popover, TapArea, Text } from 'gestalt';

export default function MenuButtonExample(): Node {
  const [selected, setSelected] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fragment>
        <TapArea
          accessibilityLabel="Open the options menu"
          accessibilityControls="menu"
          accessibilityExpanded={selected}
          accessibilityHaspopup
          onTap={() => setSelected(!selected)}
        >
          <Box
            ref={anchorRef}
            borderStyle="sm"
            display="inlineBlock"
            alignItems="center"
            rounding={1}
            padding={2}
          >
            <Flex gap={{ column: 0, row: 2 }}>
              <Box height={50} width={50}>
                <Mask rounding={1}>
                  <Image
                    alt="Antelope Canyon"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://i.ibb.co/FY2MKr5/stock6.jpg"
                  />
                </Mask>
              </Box>
              <Text weight="bold" align="center">
                Menu
              </Text>
            </Flex>
          </Box>
        </TapArea>
        {selected && (
          <Layer>
            <Popover
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => setSelected(false)}
              positionRelativeToAnchor={false}
              size="md"
            >
              <Box id="menu" direction="column" display="flex" padding={2}>
                <Box padding={2}>
                  <Text weight="bold">Option 1</Text>
                </Box>
                <Box padding={2}>
                  <Text weight="bold">Option 2</Text>
                </Box>
              </Box>
            </Popover>
          </Layer>
        )}
      </Fragment>
    </Box>
  );
}
