// @flow strict
import React, { type Node } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  TextField,
} from 'gestalt';

function ModalWithHeading({ onDismiss }: {| onDismiss: () => void |}) {
  return (
    <Modal
      accessibilityModalLabel="Create new board"
      heading="Create board"
      onDismiss={onDismiss}
      footer={
        <Flex alignItems="center" justifyContent="end">
          <Button color="red" text="Create" />
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
          subtext="So only you and collaborators can see it."
          name="languages"
          onChange={() => {}}
        />
      </Box>
    </Modal>
  );
}

export default function HeadingExample(): Node {
  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8}>
      <Button text="View Modal" onClick={() => setShouldShow(true)} />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </Box>
  );
}
