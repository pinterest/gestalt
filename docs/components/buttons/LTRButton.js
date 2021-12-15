// @flow strict
import type { Node } from 'react';
import { IconButton, Tooltip } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: () => void,
  textDirection: 'rtl' | 'ltr',
|};

export default function LTRButton({ onClick, textDirection }: Props): Node {
  const togglePageDirSvgPath = {
    __path:
      textDirection === 'rtl'
        ? 'M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z'
        : 'M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z',
  };

  const directionCopy = textDirection === 'rtl' ? 'Left-To-Right View' : 'Right-To-Left View';

  return (
    <Tooltip inline text={directionCopy}>
      <IconButton
        accessibilityLabel="Toggle page direction: Left-To-Right / Right-To-Left View"
        dangerouslySetSvgPath={togglePageDirSvgPath}
        iconColor="darkGray"
        onClick={() => {
          trackButtonClick('Toggle page direction', directionCopy);
          onClick();
        }}
        size="md"
      />
    </Tooltip>
  );
}
