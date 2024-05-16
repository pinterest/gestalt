import { Fragment, ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  DefaultLabelProvider,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  TextField,
} from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <DefaultLabelProvider
// @ts-expect-error - TS2740 - Type '{ Modal: { accessibilityDismissButtonLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        Modal: {
          accessibilityDismissButtonLabel: 'Modal entlassen',
        },
      }}
    >
      <Box padding={8}>
        <Button onClick={() => setShowComponent(true)} text="Modal entlassen" />
        {showComponent && (
          <Layer zIndex={modalZIndex}>
            <Modal
              accessibilityModalLabel="Neue Tafel erstellen"
              align="start"
              footer={
                <Flex alignItems="center" justifyContent="end">
                  <Button color="red" text="Erstellen" />
                </Flex>
              }
              heading="Neue Tafel erstellen"
              onDismiss={() => setShowComponent(false)}
              size="sm"
            >
              <Fragment>
                <Box marginBottom={6}>
                  <TextField
                    id="name"
                    label="Name"
                    onChange={() => {}}
                    placeholder='Zum Beispiel "Ausflugsziele" oder "Rezepte"'
                    type="text"
                  />
                </Box>
                <Checkbox
                  checked={false}
                  helperText="Nur Sie und Ihre Mitarbeiter können es sehen."
                  id="secret"
                  label="Dieses Board geheim halten"
                  name="secret"
                  onChange={() => {}}
                />
              </Fragment>
            </Modal>
          </Layer>
        )}
      </Box>
    </DefaultLabelProvider>
  );
}
