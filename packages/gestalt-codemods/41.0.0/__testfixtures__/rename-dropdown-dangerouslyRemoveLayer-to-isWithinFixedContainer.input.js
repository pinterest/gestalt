// @flow strict
import { Box, Dropdown } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Dropdown id="test-id" onDismiss={() => {}}>
        <Dropdown.Item onSelect={() => {}} option={{ label: 'Test Option', value: 0 }} />
      </Dropdown>
      <Dropdown id="test-id" onDismiss={() => {}} dangerouslyRemoveLayer={false}>
        <Dropdown.Item onSelect={() => {}} option={{ label: 'Test Option', value: 0 }} />
      </Dropdown>
      <Dropdown id="test-id" onDismiss={() => {}} dangerouslyRemoveLayer>
        <Dropdown.Item onSelect={() => {}} option={{ label: 'Test Option', value: 0 }} />
      </Dropdown>
    </Box>
  );
}
