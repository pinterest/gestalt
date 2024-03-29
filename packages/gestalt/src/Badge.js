// @flow strict
import { type Node as ReactNode } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import Box from './Box';
import Flex from './Flex';
import Icon from './Icon';
import Tooltip from './Tooltip';
import { type Indexable } from './zIndex';

type Position = 'middle' | 'top';

type TooltipProps = {
  accessibilityLabel?: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
};

export type TypeOptions =
  | 'info'
  | 'error'
  | 'warning'
  | 'success'
  | 'neutral'
  | 'recommendation'
  | 'darkWash'
  | 'lightWash';

type Props = {
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
};

/**
 * [Badge](https://gestalt.pinterest.systems/web/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.mjs-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.mjs-snapshots/Badge-dark-chromium-darwin.png)
 *
 */

export default function Badge({
  position = 'middle',
  text,
  type = 'info',
  tooltip,
}: Props): ReactNode {
  const isInfoType = type === 'info';

  const shouldUseTooltip = isInfoType && tooltip?.text;

  let styleType: TypeOptions | 'interactiveInfo' = type;

  if (shouldUseTooltip) {
    styleType = 'interactiveInfo';
  }

  const csBadge = cx(styles.Badge, styles[position], styles[styleType]);

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
      idealDirection={tooltip.idealDirection}
      inline
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {badgeComponent}
    </Tooltip>
  ) : (
    badgeComponent
  );
}

Badge.displayName = 'Badge';
