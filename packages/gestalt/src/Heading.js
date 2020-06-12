// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Heading.css';
import typography from './Typography.css';

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
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
  overflow?: 'normal' | 'breakWord',
  size?: 'sm' | 'md' | 'lg',
  truncate?: boolean,
|};

const defaultHeadingLevels = {
  sm: 3,
  md: 2,
  lg: 1,
};

const SIZE_SCALE = {
  sm: 1,
  md: 2,
  lg: 3,
};

export default function Heading(props: Props) {
  const {
    accessibilityLevel,
    align = 'left',
    children,
    color = 'darkGray',
    id = null,
    overflow = 'breakWord',
    size = 'lg',
    truncate = false,
  } = props;

  const cs = cx(
    styles.Heading,
    styles[`fontSize${SIZE_SCALE[size]}`],
    colors[color],
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'left' && typography.alignLeft,
    align === 'right' && typography.alignRight,
    overflow === 'breakWord' && typography.breakWord,
    truncate && typography.truncate
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];
  let newProps = { className: cs };
  if (id) {
    newProps = { ...newProps, id };
  }
  if (truncate && typeof children === 'string') {
    newProps = { ...newProps, title: children };
  }
  return React.createElement(`h${headingLevel}`, newProps, children);
}

Heading.propTypes = {
  accessibilityLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  truncate: PropTypes.bool,
};
