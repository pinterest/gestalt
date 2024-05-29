import { useState } from 'react';
import { ButtonToggle, Flex, ModalAlert, Text } from 'gestalt';

export default function Example() {
  const [business, setBusiness] = useState(false);
  const [warnDiscard, setWarnDiscard] = useState(false);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      {warnDiscard && (
        <ModalAlert
          accessibilityModalLabel="Discard Modal"
          heading="Are you sure?"
          onDismiss={() => setWarnDiscard(false)}
          primaryAction={{
            accessibilityLabel: 'Continue',
            label: 'Continue',
            onClick: () => {
              setBusiness(!business);
              setWarnDiscard(false);
            },
            role: 'button',
          }}
          secondaryAction={{
            accessibilityLabel: 'Cancel',
            label: 'Cancel',
            onClick: () => setWarnDiscard(false),
            role: 'button',
          }}
        >
          <Text>All changes will be lost!</Text>
        </ModalAlert>
      )}
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
    </Flex>
  );
}
