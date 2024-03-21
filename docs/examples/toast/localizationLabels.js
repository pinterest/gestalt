// @flow strict
import { type Node as ReactNode } from 'react';
import { DefaultLabelProvider, Flex, Toast } from 'gestalt';

export default function Example(): ReactNode {
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
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Toast
          dismissButton={{ onDismiss: () => {} }}
          text="Passwort aktualisiert"
          type="success"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
