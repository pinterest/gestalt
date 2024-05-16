import { Fragment, ReactNode, useState } from 'react';
import { Box, Button, IconButton, Layer, Text } from 'gestalt';

export default function Example() {
  const [showLayer, setShowLayer] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fragment>
        <Button onClick={() => setShowLayer(!showLayer)} text="Show Layer" />
        {showLayer && (
          <Layer>
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
