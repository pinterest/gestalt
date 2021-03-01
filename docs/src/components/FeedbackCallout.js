// @flow strict
import { Box, Button, ButtonGroup, Callout, Layer, Modal } from 'gestalt';
import React from 'react';

const FeedbackCallout = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Callout
        type="info"
        iconAccessibilityLabel="Info icon"
        title="We'd love your feedback!"
        message="Feedbackkk!"
        primaryAction={{
          label: 'Give feedback',
          onClick: () => {
            setShowModal(!showModal);
          },
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
      />
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Edit Julia's board"
            heading="Edit your board"
            onDismiss={() => {
              setShowModal(!showModal);
            }}
            footer={
              <Box
                justifyContent="between"
                display="flex"
                direction="row"
                marginLeft={-1}
                marginRight={-1}
              >
                <Box column={12} smColumn={6} paddingX={1}>
                  <Box display="flex" justifyContent="end">
                    <ButtonGroup>
                      <Button
                        text="Cancel"
                        inline
                        onClick={() => {
                          setShowModal(!showModal);
                        }}
                        size="lg"
                      />
                      <Button color="red" inline text="Send" size="lg" />
                    </ButtonGroup>
                  </Box>
                </Box>
              </Box>
            }
            size="md"
          >
            <Box maxHeight={300} overflow="auto">
              <iframe
                title="feedback-form"
                src="https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?embedded=true"
                width="640"
                height="878"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
              >
                Loading…
              </iframe>
            </Box>
          </Modal>
        </Layer>
      )}
    </Box>
  );
};

export default FeedbackCallout;
