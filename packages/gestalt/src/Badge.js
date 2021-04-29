// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorScheme.js';

type Position = 'middle' | 'top';

type Props = {|
  position?: Position,
  text: string,
|};

export default function Badge({ position = 'middle', text }: Props): Node {
  const { name: colorSchemeName } = useColorScheme();

  const cs = cx(styles.Badge, styles[position], colors.blueBg, {
    [colors.darkGray]: colorSchemeName === 'darkMode',
  });

  return <span className={cs}>{text}</span>;
}

Badge.propTypes = {
  position: (PropTypes.oneOf(['middle', 'top']): React$PropType$Primitive<Position>),
  text: PropTypes.string.isRequired,
};
