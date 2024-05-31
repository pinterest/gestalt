import { useState } from 'react';
import { ButtonGroup, ButtonToggle, Flex, ModalAlert, Text } from 'gestalt';

export default function Example() {
  const [business, setBusiness] = useState(false);
  const [warnDiscard, setWarnDiscard] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle
          onClick={() => business && setWarnDiscard(true)}
          selected={!business}
          size="lg"
          text="Personal Form"
        />
        <ButtonToggle
          onClick={() => !business && setWarnDiscard(true)}
          selected={business}
          size="lg"
          text="Business Form"
        />
      </ButtonGroup>
      {warnDiscard && (
        <ModalAlert
          accessibilityModalLabel="Confirmation modal"
          heading="Are you sure?"
          onDismiss={() => setWarnDiscard(false)}
          primaryAction={{
            label: 'Continue',
            onClick: () => {
              setBusiness(!business);
              setWarnDiscard(false);
            },
            role: 'button',
          }}
          secondaryAction={{
            label: 'Cancel',
            onClick: () => setWarnDiscard(false),
            role: 'button',
          }}
        >
          <Text>All changes will be lost!</Text>
        </ModalAlert>
      )}
    </Flex>
  );
}
