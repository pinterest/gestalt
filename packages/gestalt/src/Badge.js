// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';

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
|};

/**
 * [Badge](https://gestalt.pinterest.systems/badge) is used to label text.
 */
export default function Badge({ position = 'middle', text }: Props): Node {
  const { name: colorSchemeName } = useColorScheme();

  const cs = cx(styles.Badge, styles[position], colors.blueBg, {
    [colors.darkGray]: colorSchemeName === 'darkMode',
  });

  return <span className={cs}>{text}</span>;
}
