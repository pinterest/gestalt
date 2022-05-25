// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';
import flexStyles from './Flex.css';
import useInExperiment from './useInExperiment.js';
import Icon from './Icon.js';
import Box from './Box.js';

type Position = 'middle' | 'top';

export type TypeOptions =
  | 'info'
  | 'error'
  | 'warning'
  | 'success'
  | 'neutral'
  | 'darkWash'
  | 'lightWash';

type Props = {|
  /**
   * Badge position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/badge#Positioning) variant to learn more.
   */
  position?: Position,
  /**
   * Text displayed inside of the Badge. Sentence case is preferred.
   */
  text: string,
  /**
   * Determines the style of the badge. See the [type](https://gestalt.pinterest.systems/badge#Type) variant to learn more.
   */
  type?: TypeOptions,
  icon?: boolean,
|};

/**
 * [Badge](https://gestalt.pinterest.systems/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.mjs-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.mjs-snapshots/Badge-dark-chromium-darwin.png)
 *
 */
export default function Badge({
  position = 'middle',
  text,
  type = 'info',
  icon = false,
}: Props): Node {
  const TYPE_COLOR_MAP = {
    'info': 'infoBase',
    'error': 'errorBase',
    'warning': 'warningBase',
    'success': 'successBase',
    'neutral': 'tertiary',
    'darkWash': 'washDark',
    'lightWash': 'washLight',
  };

  const inSemiBoldExp = useInExperiment({
    webExperimentName: 'web_gestalt_semibold_weight',
    mwebExperimentName: 'mweb_gestalt_semibold_weight',
  });

  const badgeStyle = inSemiBoldExp ? styles.BadgeSemiBold : styles.Badge;

  const cs = cx(badgeStyle, styles[position], flexStyles.Flex, colors[TYPE_COLOR_MAP[type]], {
    [styles.darkWash]: type === 'darkWash',
    [styles.lightWash]: type === 'lightWash',
  });

  return (
    <div className={cs}>
      {icon && <Icon icon="info-circle" accessibilityLabel="info" color="inverse" size="14" />}
      <Box marginStart={icon ? 1 : 0}>{text}</Box>
    </div>
  );
}
