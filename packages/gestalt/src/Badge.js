// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Badge.css';
import colors from './Colors.css';

type Props = {|
  position?: 'middle' | 'top',
  text: string,
  color?:
    | 'blue'
    | 'darkGray'
    | 'darkWash'
    | 'eggplant'
    | 'gray'
    | 'green'
    | 'lightGray'
    | 'lightWash'
    | 'maroon'
    | 'midnight'
    | 'navy'
    | 'olive'
    | 'orange'
    | 'orchid'
    | 'pine'
    | 'purple'
    | 'red'
    | 'transparent'
    | 'transparentDarkGray'
    | 'watermelon'
    | 'white',
|};

export default function Badge(props: Props) {
  const { position = 'middle', text, color = 'blue' } = props;

  const cs = cx(styles.Badge, styles[position], colors[`${color}Bg`]);

  return <span className={cs}>{text}</span>;
}

Badge.propTypes = {
  position: PropTypes.oneOf(['middle', 'top']),
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'blue',
    'darkGray',
    'darkWash',
    'eggplant',
    'gray',
    'green',
    'lightGray',
    'lightWash',
    'maroon',
    'midnight',
    'navy',
    'olive',
    'orange',
    'orchid',
    'pine',
    'purple',
    'red',
    'transparent',
    'transparentDarkGray',
    'watermelon',
    'white',
  ]),
};
