// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, IconButton, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(100);

export default function Example(): ReactNode {
  const [showLayer, setShowLayer] = useState(false);
  // Results in a zIndex of 101
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fragment>
        <Button onClick={() => setShowLayer(!showLayer)} text="Show Layer" />
        {showLayer && (
          <Layer zIndex={zIndex}>
            <Box
              alignItems="center"
              bottom
              color="darkWash"
              display="flex"
              justifyContent="center"
              left
              position="fixed"
              right
              top
            >
              <Box alignItems="center" color="light" display="flex" padding={3}>
                <Text>Layer Content</Text>
                <Box marginStart={2}>
                  <IconButton
                    accessibilityLabel="Close"
                    icon="cancel"
                    onClick={() => setShowLayer(!showLayer)}
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        )}
      </Fragment>
    </Box>
  );
}
