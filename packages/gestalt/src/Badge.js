// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import Box from './Box.js';
import colors from './Colors.css';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Tooltip from './Tooltip.js';
import { type Indexable } from './zIndex.js';

type Position = 'middle' | 'top';

type TooltipProps = {|
  accessibilityLabel?: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

export type TypeOptions =
  | 'info'
  | 'error'
  | 'warning'
  | 'success'
  | 'neutral'
  | 'recommendation'
  | 'darkWash'
  | 'lightWash';

type Props = {|
  /**
   * Badge position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/web/badge#Positioning) variant to learn more.
   */
  position?: Position,
  /**
   * Text displayed inside of the Badge. Sentence case is preferred.
   */
  text: string,
  /**
   *  Experimental prop, do not use. Adds a [Tooltip](/web/tooltip) on hover/focus of the Badge. To convey the interaction, it also displays an information Icon. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
   */
  tooltip?: TooltipProps,
  /**
   * Determines the style of the badge. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
   */
  type?: TypeOptions,
|};

/**
 * [Badge](https://gestalt.pinterest.systems/web/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.mjs-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.mjs-snapshots/Badge-dark-chromium-darwin.png)
 *
 */

export default function Badge({ position = 'middle', text, type = 'info', tooltip }: Props): Node {
  const isInfoType = type === 'info';

  const shouldUseTooltip = isInfoType && tooltip?.text;

  const csBadge = cx(styles.Badge, styles[position], {
    [styles.darkWash]: type === 'darkWash',
    [styles.lightWash]: type === 'lightWash',
    [colors.infoBase]: isInfoType,
    [styles.interactiveInfo]: shouldUseTooltip,
    [colors.errorBase]: type === 'error',
    [colors.warningBase]: type === 'warning',
    [colors.successBase]: type === 'success',
    [colors.tertiary]: type === 'neutral',
    [colors.recommendationBase]: type === 'recommendation',
    [colors.washDark]: type === 'darkWash',
    [colors.washLight]: type === 'lightWash',
  });

  const badgeComponent = (
    <div className={csBadge}>
      <Flex alignItems="center" gap={1}>
        {shouldUseTooltip ? (
          <Box aria-hidden>
            <Icon accessibilityLabel="" color="inverse" icon="info-circle" inline size="14" />
          </Box>
        ) : null}
        <Box dangerouslySetInlineStyle={{ __style: { marginTop: '2px' } }} display="inlineBlock">
          {text}
        </Box>
      </Flex>
    </div>
  );

  return isInfoType && tooltip?.text ? (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      inline
      idealDirection={tooltip.idealDirection}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {badgeComponent}
    </Tooltip>
  ) : (
    badgeComponent
  );
}
