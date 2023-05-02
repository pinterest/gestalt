// @flow strict
import { type Node } from 'react';
import styles from './TagData.css';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
  /**
   * Size of the tag
   */
  size?: 'sm' | 'md' | 'lg',
|} & BaseTagProps;

/**
 * [TagData] https://gestalt.pinterest.systems/web/tagdata component should be used for ... on the page.
 * ![TagData light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TagData.spec.mjs-snapshots/TagData-chromium-darwin.png)
 * ![TagData dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TagData-dark.spec.mjs-snapshots/TagData-dark-chromium-darwin.png)
 */
export default function TagData({ accessibilityLabel, text, disabled, size = 'md' }: Props): Node {
  const sizes = {
    'lg': { height: 48, font: '300' },
    'md': { height: 40, font: '200' },
    'sm': { height: 32, font: '200' },
  };

  return (
    <Box
      aria-disabled={disabled}
      color="secondary"
      display="inlineBlock"
      height={sizes[size].height}
      maxWidth={300}
      rounding={2}
      padding={2}
    >
      <Flex alignItems="center" height="100%">
        <div title={text}>
          <Text inline size={sizes[size].font} lineClamp={1}>
            {text}
          </Text>
        </div>
      </Flex>
    </Box>
  );
}
