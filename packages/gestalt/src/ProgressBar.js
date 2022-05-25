// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';

type Props = {|
  /**
   * Prop description.
   *
   * Link: https://gestalt.pinterest.systems/progressbar#prop
   */
  accessibilityLabel?: string,
  /**
   * The header text for the component.
   */
  title: string,
  /**
   * The header text for the component.
   */
  helperText: string,
  /**
   * The datapoint value (e.g., 1.23M)
   */
  value: number,
|};

/**
 * [ProgressBar] https://gestalt.pinterest.systems/progressbar component should be used for ... on the page.
 * ![ProgressBar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ProgressBar.spec.mjs-snapshots/ProgressBar-chromium-darwin.png)
 * ![ProgressBar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ProgressBar-dark.spec.mjs-snapshots/ProgressBar-dark-chromium-darwin.png)
 */
export default function ProgressBar({
  accessibilityLabel,
  helperText,
  title,
  value = 0,
}: Props): Node {
  return (
    <Box width="100%">
      <Flex>
        <Flex.Item flex="grow">
          <Text size="200">{title}</Text>
        </Flex.Item>
        <Flex.Item>
          <Text size="200">{`${value * 100}%`}</Text>
        </Flex.Item>
      </Flex>
      <Box
        marginTop={2}
        marginBottom={2}
        aria-label={accessibilityLabel}
        color="secondary"
        width="100%"
        rounding="pill"
        height={16}
      >
        <Box color="successBase" width={`${value * 100}%`} rounding="pill" height={16} />
      </Box>
      <Text size="100" color="subtle">
        {helperText}
      </Text>
    </Box>
  );
}
