// @flow strict
import React, { type Node } from 'react';
import { Box, Button, Layer, Modal, Text } from 'gestalt';

export default function PreventCloseExample(): Node {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <React.Fragment>
      <Box padding={8}>
        <Button
          text="Open Modal"
          onClick={() => {
            setShowModal(!showModal);
          }}
        />
      </Box>

      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Non closable modal"
            closeOnOutsideClick={false}
            heading="Heading"
            onDismiss={() => {
              setShowModal(!showModal);
            }}
          >
            <Box padding={8}>
              <Text align="center">Click on the button to close the modal</Text>
              <Box marginTop={4}>
                <Button
                  color="red"
                  text="Close"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                />
              </Box>
            </Box>
          </Modal>
        </Layer>
      )}
    </React.Fragment>
  );
}
