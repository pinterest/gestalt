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
   * Text displayed inside of the Badge. Sentence case is preferred.
   */
  color?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
|};

/**
 * [Badge](https://gestalt.pinterest.systems/badge) is used to label text.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Badge%20%230.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Badge-dark%20%230.png)
 *
 */
export default function Badge({ position = 'middle', text, color = 'info' }: Props): Node {
  const COLOR_MAP = {
    'info': 'infoBase',
    'error': 'errorBase',
    'warning': 'warningBase',
    'success': 'successBase',
    'neutral': 'tertiary',
    'darkWash': 'washDark',
    'lightWash': 'washLight',
  };

  const cs = cx(styles.Badge, styles[position], colors[COLOR_MAP[color]]);

  return <div className={cs}>{text}</div>;
}
