// @flow strict
import { Fragment, type Node, useState } from 'react';
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

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Modal: {
          accessibilityDismissButtonLabel: 'Modal entlassen',
        },
      }}
    >
      <Box padding={8}>
        <Button text="Modal entlassen" onClick={() => setShowComponent(true)} />
        {showComponent && (
          <Layer zIndex={modalZIndex}>
            <Modal
              accessibilityModalLabel="Neue Tafel erstellen"
              align="start"
              heading="Neue Tafel erstellen"
              onDismiss={() => setShowComponent(false)}
              footer={
                <Flex alignItems="center" justifyContent="end">
                  <Button color="red" text="Erstellen" />
                </Flex>
              }
              size="sm"
            >
              <Fragment>
                <Box marginBottom={6}>
                  <TextField
                    id="name"
                    onChange={() => {}}
                    placeholder='Zum Beispiel "Ausflugsziele" oder "Rezepte"'
                    label="Name"
                    type="text"
                  />
                </Box>
                <Checkbox
                  checked={false}
                  id="secret"
                  label="Dieses Board geheim halten"
                  helperText="Nur Sie und Ihre Mitarbeiter können es sehen."
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
