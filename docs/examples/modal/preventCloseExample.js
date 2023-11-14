// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Box, Button, Flex, Layer, Modal, Text } from 'gestalt';

export default function PreventCloseExample(): ReactNode {
  const [showComponent, setShowComponent] = useState(true);
  return (
    <Fragment>
      <Box padding={8}>
        <Button
          text="Open Modal"
          onClick={() => {
            setShowComponent(!showComponent);
          }}
        />
      </Box>

      {showComponent && (
        <Layer>
          <Modal
            accessibilityModalLabel="Non closable modal"
            align="start"
            closeOnOutsideClick={false}
            heading="Heading"
            onDismiss={() => {
              setShowComponent(!showComponent);
            }}
            footer={
              <Flex justifyContent="end">
                <Button
                  color="red"
                  text="Close"
                  onClick={() => {
                    setShowComponent(!showComponent);
                  }}
                />
              </Flex>
            }
          >
            <Text align="start">Click on the button to close the modal</Text>
          </Modal>
        </Layer>
      )}
    </Fragment>
  );
}
