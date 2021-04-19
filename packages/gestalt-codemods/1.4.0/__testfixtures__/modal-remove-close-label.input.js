// @flow strict
import { Box, Modal } from 'gestalt';

export default function ModalExample() {
  return (
    <Modal
      accessibilityCloseLabel="close"
      accessibilityModalLabel="Modal Example"
      heading="Modal Example"
      onDismiss={() => {}}
      size="sm">
      <Box padding={2}>Children</Box>
    </Modal>
  );
}
