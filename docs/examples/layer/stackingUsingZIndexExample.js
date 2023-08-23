// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, IconButton, Layer, Text } from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(100);

export default function Example(): Node {
  const [showLayer, setShowLayer] = useState(false);
  // Results in a zIndex of 101
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fragment>
        <Button text="Show Layer" onClick={() => setShowLayer(!showLayer)} />
        {showLayer && (
          <Layer zIndex={zIndex}>
            <Box
              color="darkWash"
              position="fixed"
              top
              left
              right
              bottom
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box color="light" padding={3} display="flex" alignItems="center">
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
