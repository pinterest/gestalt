// @flow strict
import React, { type Node } from 'react';
import { Box, Button, Flex, Layer, Modal, Text } from 'gestalt';

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
            align="start"
            closeOnOutsideClick={false}
            heading="Heading"
            onDismiss={() => {
              setShowModal(!showModal);
            }}
            footer={
              <Flex justifyContent="end">
                <Button
                  color="red"
                  text="Close"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                />
              </Flex>
            }
          >
            <Box padding={6}>
              <Text align="start">Click on the button to close the modal</Text>
            </Box>
          </Modal>
        </Layer>
      )}
    </React.Fragment>
  );
}
