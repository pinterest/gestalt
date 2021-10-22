// @flow strict
import type { Node, Element } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import Tooltip from './Tooltip.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Text from './Text.js';
import { type Dimension } from './boxTypes.js';

type Props = {|
  /**
   * Use numbers for pixels: \`maxWidth={100}\` and strings for percentages: \`maxWidth="100%"\`. See the [max width](https://gestalt.pinterest.systems/pageheader#Max-width) variant for more info.
   */
  maxWidth?: Dimension,
  /**
   * The primary action of the page. Can be [Button](https://gestalt.pinterest.systems/button), [Link](https://gestalt.pinterest.systems/link), [Tooltip](https://gestalt.pinterest.systems/tooltip) surrounding IconButton or a combination of IconButton, Tooltip and [Dropdown](https://gestalt.pinterest.systems/dropdown).
   */
  primaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>,
  /**
   * A secondary action for the page. Can be [Button](https://gestalt.pinterest.systems/button), [Link](https://gestalt.pinterest.systems/link), [Tooltip](https://gestalt.pinterest.systems/tooltip) surrounding IconButton or a combination of IconButton, Tooltip and [Dropdown](https://gestalt.pinterest.systems/dropdown).
   */
  secondaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>,
  /**
   * Used for metadata related to the current page, not designed to describe the title or the current surface. Content should be [localized](https://gestalt.pinterest.systems/pageheader#Localization).
   */
  subtext?: string,
  /**
   * Page title. Will always be a level 1 heading. Content should be [localized](https://gestalt.pinterest.systems/pageheader#Localization).
   */
  title: string,
|};

/**
 * [PageHeader](https://gestalt.pinterest.systems/PageHeader) is used to indicate the title of the current page, as well as optional actions.
 */
export default function PageHeader({
  maxWidth = '100%',
  primaryAction,
  secondaryAction,
  subtext,
  title,
}: Props): Node {
  return (
    <Box color="white" paddingX={8} width="100%">
      <Flex flex="grow" justifyContent="center" maxWidth="100%">
        <Flex alignItems="center" flex="grow" justifyContent="between" maxWidth={maxWidth}>
          <Box marginEnd={4} minWidth={0} marginTop={2} marginBottom={2}>
            <Heading size="md" lineClamp={1} accessibilityLevel={1}>
              {title}
            </Heading>
            {subtext && (
              <Box marginTop={2}>
                <Text lineClamp={1}>{subtext}</Text>
              </Box>
            )}
          </Box>

          {primaryAction && (
            <Flex alignItems="center" gap={2} flex="none">
              {secondaryAction}
              {/* 48px height needed to maintain proper sizing when action is a Link */}
              <Box alignItems="center" display="flex" marginTop={4} marginBottom={4} height="48px">
                {primaryAction}
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
