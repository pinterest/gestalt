import { Fragment, useRef, useState } from 'react';
import { Box, Flex, Image, Layer, Mask, Popover, TapArea, Text } from 'gestalt';

export default function MenuButtonExample() {
  const [selected, setSelected] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fragment>
        <TapArea
          accessibilityControls="menu"
          accessibilityExpanded={selected}
          accessibilityHaspopup
          accessibilityLabel="Open the options menu"
          onTap={() => setSelected(!selected)}
        >
          <Box
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
            ref={anchorRef}
            alignItems="center"
            borderStyle="sm"
            display="inlineBlock"
            padding={2}
            rounding={1}
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
              <Text align="center" weight="bold">
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
              <Box direction="column" display="flex" id="menu" padding={2}>
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
