// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DefaultLabelProvider,
  FixedZIndex,
  Flex,
  Layer,
  OverlayPanel,
  Text,
} from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        OverlayPanel: {
          accessibilityDismissButtonLabel: 'Overlay-Panel auflösen.',
          dismissConfirmationMessage: 'Sind Sie sicher, dass Sie Ihre Kündigung einreichen wollen?',
          dismissConfirmationSubtext:
            'Sie verlieren alle Ihre Änderungen. Dies kann nicht rückgängig gemacht werden',
          dismissConfirmationPrimaryActionText: 'Ja, entlassen',
          dismissConfirmationPrimaryActionTextLabel: 'Yes, dismiss the overlay panel',
          dismissConfirmationSecondaryActionText: 'Nein, geh zurück',
          dismissConfirmationSecondaryActionTextLabel: 'Nein, gehen Sie zurück zum Overlay-Panel',
        },
      }}
    >
      <Box padding={8}>
        <Button
          text="Erstellen Sie eine neue Zielgruppenliste"
          onClick={() => setShowComponent(true)}
        />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            dismissConfirmation={{}}
            accessibilityDismissButtonLabel="Schließen Sie das Overlay-Panel für die Erstellung der Zielgruppe"
            accessibilityLabel="Erstellung von Zielgruppenlisten für neue Kampagnen"
            heading="Erstellen Sie eine neue Zielgruppenliste"
            onDismiss={() => setShowComponent(false)}
            footer={
              <OverlayPanel.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex alignItems="center" justifyContent="end">
                    <Button color="red" text="Erstellen" onClick={onDismissStart} />
                  </Flex>
                )}
              </OverlayPanel.DismissingElement>
            }
            size="md"
          >
            <Box
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text align="center">Inhalt</Text>
            </Box>
          </OverlayPanel>
        </Layer>
      )}
    </DefaultLabelProvider>
  );
}
