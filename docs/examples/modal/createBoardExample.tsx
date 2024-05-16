import {Fragment, ReactNode, useState} from 'react';
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

export default function HeadingExample() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box padding={8}>
      <Button onClick={() => setShowComponent(true)} text="View Modal" />
      {showComponent && (
        <Layer zIndex={modalZIndex}>
          <Modal
            accessibilityModalLabel="Create new board"
            align="start"
            footer={
              <Flex alignItems="center" justifyContent="end">
                <Button color="red" text="Create" />
              </Flex>
            }
            heading="Create board"
            onDismiss={() => setShowComponent(false)}
            size="sm"
          >
            <Fragment>
              <Box marginBottom={6}>
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
            </Fragment>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}
