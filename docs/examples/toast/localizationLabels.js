// @flow strict
import { type Node } from 'react';
import { DefaultLabelProvider, Flex, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Toast: {
          accessibilityDismissButtonLabel: 'Den Toast verwerfen',
          accessibilityIconSuccessLabel: 'Erfolgsmeldung',
          accessibilityIconErrorLabel: 'Fehlermeldung',
          accessibilityProcessingLabel: 'Nachricht bearbeiten',
        },
      }}
    >
      <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
        <Toast
          type="success"
          text="Passwort aktualisiert"
          dismissButton={{ onDismiss: () => {} }}
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
