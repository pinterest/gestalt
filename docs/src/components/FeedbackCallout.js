// @flow strict
import { Box, Button, Callout, Flex, Layer, Modal } from 'gestalt';
import React from 'react';

const FeedbackCallout = () => {
  const [showCallout, setShowCallout] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginLeft={-1} marginRight={-1}>
      {showCallout && (
        <Callout
          type="info"
          iconAccessibilityLabel="Info icon"
          title="We'd love your feedback!"
          message="The Gestalt team has been working hard to extend our documentation to include design best practices, as well as create a standardized documentation format. Let us know what you think so far by filling out our survey."
          primaryAction={{
            label: 'Give feedback',
            onClick: () => {
              setShowModal(!showModal);
            },
          }}
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {
              setShowCallout(!showCallout);
            },
          }}
        />
      )}
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Send Gestalt Team Feedback"
            heading="What do you think of the new docs design?"
            subHeading="Note: Only Pinterest employees will be able to submit a response."
            onDismiss={() => {
              setShowModal(!showModal);
            }}
            footer={
              <Flex flex="grow" justifyContent="end">
                <Button
                  text="Close"
                  inline
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                  size="lg"
                />
              </Flex>
            }
            size="lg"
          >
            <iframe
              title="feedback"
              src="https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?embedded=true"
              width="900"
              height="350"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </Modal>
        </Layer>
      )}
    </Box>
  );
};

export default FeedbackCallout;
