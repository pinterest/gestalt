import { Fragment, ReactNode, useState } from 'react';
import { Box, Button, Flex, Layer, Modal, Text } from 'gestalt';

export default function PreventCloseExample() {
  const [showComponent, setShowComponent] = useState(true);
  return (
    <Fragment>
      <Box padding={8}>
        <Button
          onClick={() => {
            setShowComponent(!showComponent);
          }}
          text="Open Modal"
        />
      </Box>

      {showComponent && (
        <Layer>
          <Modal
            accessibilityModalLabel="Non closable modal"
            align="start"
            closeOnOutsideClick={false}
            footer={
              <Flex justifyContent="end">
                <Button
                  color="red"
                  onClick={() => {
                    setShowComponent(!showComponent);
                  }}
                  text="Close"
                />
              </Flex>
            }
            heading="Heading"
            onDismiss={() => {
              setShowComponent(!showComponent);
            }}
          >
            <Text align="start">Click on the button to close the modal</Text>
          </Modal>
        </Layer>
      )}
    </Fragment>
  );
}
