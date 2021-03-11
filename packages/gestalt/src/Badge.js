// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorScheme.js';

type Props = {|
  position?: 'middle' | 'top',
  text: string,
|};

export default function Badge(props: Props): Node {
  const { position = 'middle', text } = props;
  const { name: colorSchemeName } = useColorScheme();

  const cs = cx(styles.Badge, styles[position], colors.blueBg, {
    [colors.darkGray]: colorSchemeName === 'darkMode',
  });

  return <span className={cs}>{text}</span>;
}

Badge.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  position: PropTypes.oneOf(['middle', 'top']),
  text: PropTypes.string.isRequired,
};
