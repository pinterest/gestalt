// @flow strict
import type { Node } from 'react';
import { IconButton, Tooltip } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: () => void,
|};

export default function CopyCodeButton({ onClick }: Props): Node {
  const label = 'Copy code';

  return (
    <Tooltip inline text={label} idealDirection="up">
      <IconButton
        accessibilityLabel={label}
        icon="drag-drop"
        iconColor="darkGray"
        onClick={() => {
          trackButtonClick(label);
          onClick();
        }}
        size="xs"
      />
    </Tooltip>
  );
}
