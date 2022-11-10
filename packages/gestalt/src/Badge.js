// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';
import useInExperiment from './useInExperiment.js';
import Box from './Box.js';
import Text from './Text.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Tooltip from './Tooltip.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
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
  const { accessibilityInfoLabel } = useDefaultLabelContext('Badge');

  const NEW_TYPE_COLOR_MAP = {
    'info': 'infoBase',
    'error': 'errorBase',
    'warning': 'warningBase',
    'success': 'successBase',
    'neutral': 'tertiary',
    'recommendation': 'recommendationBase',
    'darkWash': 'darkWash',
    'lightWash': 'lightWash',
  };

  const TYPE_COLOR_MAP = {
    'info': 'infoBase',
    'error': 'errorBase',
    'warning': 'warningBase',
    'success': 'successBase',
    'neutral': 'tertiary',
    'recommendation': 'recommendationBase',
    'darkWash': 'washDark',
    'lightWash': 'washLight',
  };

  const inBadgeExp = useInExperiment({
    webExperimentName: 'web_gestalt_slim_badge',
    mwebExperimentName: 'mweb_gestalt_slim_badge',
  });

  const csBadge = cx(styles.Badge, styles[position], colors[TYPE_COLOR_MAP[type]], {
    [styles.darkWash]: type === 'darkWash',
    [styles.lightWash]: type === 'lightWash',
  });

  const csNewBadge = cx(styles.NewBadge, styles[position], {
    [styles.darkWash]: type === 'darkWash',
    [styles.lightWash]: type === 'lightWash',
    [styles.info]: type === 'info',
    [colors.errorBase]: type === 'error',
    [colors.warningBase]: type === 'warning',
    [colors.successBase]: type === 'success',
    [colors.tertiary]: type === 'neutral',
    [colors.recommendationBase]: type === 'recommendation',
    [colors.washDark]: type === 'darkWash',
    [colors.washLight]: type === 'lightWash',
  });

  if (inBadgeExp) {
    const badgeComponent = (
      <div className={csNewBadge}>
        <Flex alignItems="center" gap={1}>
          {type === 'info' ? (
            <Icon
              accessibilityLabel={accessibilityInfoLabel}
              color="inverse"
              icon="info-circle"
              inline
              size="14"
            />
          ) : null}
          <Box dangerouslySetInlineStyle={{ __style: { marginTop: '2px' } }} display="inlineBlock">
            {text}
          </Box>
        </Flex>
      </div>
    );

    return tooltip?.text ? (
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

  return <div className={csBadge}>{text}</div>;
}
