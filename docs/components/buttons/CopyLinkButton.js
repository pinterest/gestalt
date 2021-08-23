// @flow strict
import type { Node } from 'react';
import { IconButton, Tooltip } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  name: string,
  onClick: () => void,
|};

export default function CopyLinkButton({ name, onClick }: Props): Node {
  const label = 'Copy link';

  return (
    <Tooltip inline text={label}>
      <IconButton
        accessibilityLabel={`${label} to ${name}`}
        icon="link"
        onClick={() => {
          trackButtonClick(label, name);
          onClick();
        }}
        size="xs"
        iconColor="darkGray"
      />
    </Tooltip>
  );
}
