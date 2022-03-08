// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';

type Position = 'middle' | 'top';

type Props = {|
  /**
   * Badge position relative to its parent element.
   */
  position?: Position,
  /**
   * Text displayed inside of the Badge. Sentence case is preferred.
   */
  text: string,
  /**
   * Determines the style of the badge.
   */
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

/**
 * [Badge](https://gestalt.pinterest.systems/badge) is used to label text.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Badge%20%230.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Badge-dark%20%230.png)
 *
 */
export default function Badge({ position = 'middle', text, type = 'info' }: Props): Node {
  const TYPE_COLOR_MAP = {
    'info': 'infoBase',
    'error': 'errorBase',
    'warning': 'warningBase',
    'success': 'successBase',
    'neutral': 'tertiary',
    'darkWash': 'washDark',
    'lightWash': 'washLight',
  };

  const cs = cx(styles.Badge, styles[position], colors[TYPE_COLOR_MAP[type]], {
    [styles.darkWash]: type === 'darkWash',
    [styles.lightWash]: type === 'lightWash',
  });

  return <div className={cs}>{text}</div>;
}
