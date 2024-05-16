import {ReactNode} from 'react';
import { Flex, HelpButton } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <HelpButton
        accessibilityLabel="Click to learn more about help button"
        accessibilityPopoverLabel="Expanded information about help button"
        idealDirection="right"
        text="Informational context that's displayed on click"
      />
    </Flex>
  );
}
