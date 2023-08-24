// @flow strict
import { Fragment, type Node, useState } from 'react';
import { Box, Button, IconButton, Layer, Text } from 'gestalt';

export default function Example(): Node {
  const [showLayer, setShowLayer] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fragment>
        <Button text="Show Layer" onClick={() => setShowLayer(!showLayer)} />
        {showLayer && (
          <Layer>
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
