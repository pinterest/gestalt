// @flow strict
import { type Node as ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  IconButton,
  Layer,
  Modal,
  TextField,
} from 'gestalt';

function ModalWithHeading({ onDismiss }: { onDismiss: () => void }): ReactNode {
  return (
    <Modal
      accessibilityModalLabel="Edit board"
      heading="Edit board"
      onDismiss={onDismiss}
      footer={
        <Flex alignItems="center" justifyContent="end">
          <Button color="red" text="Save" />
        </Flex>
      }
      size="sm"
    >
      <Box paddingX={8}>
        <Box marginBottom={8}>
          <TextField
            id="name"
            onChange={() => {}}
            placeholder='Like "Places to go" or "Recipes to Make"'
            label="Name"
            type="text"
          />
        </Box>
        <Checkbox
          checked={false}
          id="secret"
          label="Keep this board secret"
          helperText="So only you and collaborators can see it."
          name="languages"
          onChange={() => {}}
        />
      </Box>
    </Modal>
  );
}

export default function Example(): ReactNode {
  const [shouldShow, setShouldShow] = useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButton
        accessibilityLabel="Open edit modal"
        icon="edit"
        onClick={() => setShouldShow(true)}
        size="lg"
        tooltip={{ text: 'Edit Pin' }}
      />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </Flex>
  );
}
