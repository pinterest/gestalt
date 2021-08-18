// @flow strict
import { createElement, type Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Heading.css';
import typography from './Typography.css';
import { allowedColors, type Align, type Color } from './text-types.js';

function isNotNullish(val): boolean {
  return val !== null && val !== undefined;
}

type AccessibilityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 'none';
type Overflow = 'normal' | 'breakWord';
type Size = 'sm' | 'md' | 'lg';

type Props = {|
  align?: Align,
  accessibilityLevel?: AccessibilityLevel,
  children?: Node,
  color?: Color,
  id?: string,
  lineClamp?: number,
  overflow?: Overflow,
  size?: Size,
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

/**
 * https://gestalt.pinterest.systems/Heading
 */
export default function Heading({
  accessibilityLevel,
  align = 'start',
  children,
  color = 'darkGray',
  lineClamp,
  id,
  overflow = 'breakWord',
  size = 'lg',
}: Props): Node {
  const cs = cx(
    styles.Heading,
    styles[`fontSize${SIZE_SCALE[size]}`],
    color && allowedColors.includes(color) && colors[color],
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'start' && typography.alignStart,
    align === 'end' && typography.alignEnd,
    align === 'forceLeft' && typography.alignForceLeft,
    align === 'forceRight' && typography.alignForceRight,
    overflow === 'breakWord' && typography.breakWord,
    isNotNullish(lineClamp) && typography.lineClamp,
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];

  let newProps = { className: cs };
  if (id) {
    newProps = { ...newProps, id };
  }
  if (isNotNullish(lineClamp) && typeof children === 'string') {
    newProps = {
      ...newProps,
      style: { WebkitLineClamp: lineClamp },
      title: children,
    };
  }

  return createElement(headingLevel === 'none' ? 'div' : `h${headingLevel}`, newProps, children);
}

Heading.propTypes = {
  accessibilityLevel: (PropTypes.oneOf([
    1,
    2,
    3,
    4,
    5,
    6,
    'none',
  ]): React$PropType$Primitive<AccessibilityLevel>),
  align: (PropTypes.oneOf([
    'start',
    'end',
    'center',
    'justify',
    'forceLeft',
    'forceRight',
  ]): React$PropType$Primitive<Align>),
  children: PropTypes.node,
  color: (PropTypes.oneOf(allowedColors): React$PropType$Primitive<Color>),
  id: PropTypes.string,
  lineClamp: PropTypes.number,
  overflow: (PropTypes.oneOf(['normal', 'breakWord']): React$PropType$Primitive<Overflow>),
  size: (PropTypes.oneOf(['sm', 'md', 'lg']): React$PropType$Primitive<Size>),
};
