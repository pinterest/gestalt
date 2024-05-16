import {ReactNode, useState} from 'react';
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

function ModalWithHeading(
  {
    onDismiss,
  }: {
    onDismiss: () => void
  },
) {
  return (
    <Modal
      accessibilityModalLabel="Edit board"
      footer={
        <Flex alignItems="center" justifyContent="end">
          <Button color="red" text="Save" />
        </Flex>
      }
      heading="Edit board"
      onDismiss={onDismiss}
      size="sm"
    >
      <Box paddingX={8}>
        <Box marginBottom={8}>
          <TextField
            id="name"
            label="Name"
            onChange={() => {}}
            placeholder='Like "Places to go" or "Recipes to Make"'
            type="text"
          />
        </Box>
        <Checkbox
          checked={false}
          helperText="So only you and collaborators can see it."
          id="secret"
          label="Keep this board secret"
          name="languages"
          onChange={() => {}}
        />
      </Box>
    </Modal>
  );
}

export default function Example() {
  const [shouldShow, setShouldShow] = useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
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
