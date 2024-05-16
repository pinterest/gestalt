import { ReactNode, useState } from 'react';
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

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return (
    <DefaultLabelProvider
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
          onClick={() => setShowComponent(true)}
          text="Erstellen Sie eine neue Zielgruppenliste"
        />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Schließen Sie das Overlay-Panel für die Erstellung der Zielgruppe"
            accessibilityLabel="Erstellung von Zielgruppenlisten für neue Kampagnen"
            dismissConfirmation={{}}
            footer={
              <OverlayPanel.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex alignItems="center" justifyContent="end">
                    <Button color="red" onClick={onDismissStart} text="Erstellen" />
                  </Flex>
                )}
              </OverlayPanel.DismissingElement>
            }
            heading="Erstellen Sie eine neue Zielgruppenliste"
            onDismiss={() => setShowComponent(false)}
            size="md"
          >
            <Box
              alignItems="center"
              display="flex"
              height="100%"
              justifyContent="center"
              width="100%"
            >
              <Text align="center">Inhalt</Text>
            </Box>
          </OverlayPanel>
        </Layer>
      )}
    </DefaultLabelProvider>
  );
}
