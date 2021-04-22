// @flow strict
import { createElement, type Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Heading.css';
import typography from './Typography.css';

type Props = {|
  align?: 'left' | 'right' | 'center' | 'justify',
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 'none',
  children?: Node,
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

export default function Heading(props: Props): Node {
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
    truncate && typography.truncate,
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];
  let newProps = { className: cs };
  if (id) {
    newProps = { ...newProps, id };
  }
  if (truncate && typeof children === 'string') {
    newProps = { ...newProps, title: children };
  }
  return createElement(headingLevel === 'none' ? 'div' : `h${headingLevel}`, newProps, children);
}

Heading.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  accessibilityLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 'none']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  children: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
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
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  overflow: PropTypes.oneOf(['normal', 'breakWord']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  truncate: PropTypes.bool,
};
