// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from '../Colors.css';
import styles from './Heading.css';
import typography from '../Typography.css';

type Props = {|
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  children?: React.Node,
  color?:
    | 'blue'
    | 'darkGray'
    | 'eggplant'
    | 'gray'
    | 'green'
    | 'lightGray'
    | 'maroon'
    | 'midnight'
    | 'navy'
    | 'olive'
    | 'orange'
    | 'orchid'
    | 'pine'
    | 'purple'
    | 'red'
    | 'watermelon'
    | 'white',
  id?: string,
  lgSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  mdSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  overflow?: 'normal' | 'breakWord',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  smSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: boolean,
|};

const defaultHeadingLevels = {
  xs: 5,
  sm: 4,
  md: 3,
  lg: 2,
  xl: 1,
};

const SIZE_SCALE: { [size: ?string]: number } = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

export default function Heading(props: Props) {
  const {
    accessibilityLevel,
    children,
    color = 'darkGray',
    id = null,
    lgSize,
    mdSize,
    overflow = 'breakWord',
    size = 'md',
    smSize,
    truncate = false,
  } = props;

  const cs = cx(
    styles.Heading,
    styles[`fontSize${SIZE_SCALE[size]}`],
    smSize && styles[`smFontSize${SIZE_SCALE[smSize]}`],
    mdSize && styles[`mdFontSize${SIZE_SCALE[mdSize]}`],
    lgSize && styles[`lgFontSize${SIZE_SCALE[lgSize]}`],
    colors[color],
    overflow === 'breakWord' && typography.breakWord,
    truncate && typography.truncate
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];
  return React.createElement(
    `h${headingLevel}`,
    {
      className: cs,
      id,
      ...(truncate && typeof children === 'string'
        ? { title: children }
        : null),
    },
    children
  );
}

Heading.propTypes = {
  accessibilityLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'blue',
    'darkGray',
    'eggplant',
    'gray',
    'green',
    'lightGray',
    'maroon',
    'midnight',
    'navy',
    'olive',
    'orange',
    'orchid',
    'pine',
    'purple',
    'red',
    'watermelon',
    'white',
  ]),
  id: PropTypes.string,
  overflow: PropTypes.oneOf(['normal', 'breakWord']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  smSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  mdSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  lgSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  truncate: PropTypes.bool,
};
