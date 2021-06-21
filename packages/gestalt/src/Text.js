// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import isNotNullish from './utils/isNotNullish.js';
import styles from './Text.css';
import typography from './Typography.css';

const SIZE_SCALE = {
  sm: 1,
  md: 2,
  lg: 3,
};

type Align = 'start' | 'end' | 'center' | 'justify' | 'forceLeft' | 'forceRight';
type Color =
  | 'green'
  | 'pine'
  | 'olive'
  | 'blue'
  | 'navy'
  | 'midnight'
  | 'purple'
  | 'orchid'
  | 'eggplant'
  | 'maroon'
  | 'watermelon'
  | 'orange'
  | 'darkGray'
  | 'gray'
  | 'lightGray'
  | 'red'
  | 'white';
export type FontWeight = 'bold' | 'normal';
type Overflow = 'normal' | 'breakWord' | 'noWrap';
type Size = 'sm' | 'md' | 'lg';

type Props = {|
  align?: Align,
  children?: Node,
  color?: Color,
  inline?: boolean,
  italic?: boolean,
  // Undocumented prop for now.
  // Will replace `truncate` if experiment ships
  lineClamp?: number,
  overflow?: Overflow,
  size?: Size,
  truncate?: boolean,
  underline?: boolean,
  weight?: FontWeight,
|};

export default function Text({
  align = 'start',
  children,
  color = 'darkGray',
  inline = false,
  italic = false,
  lineClamp,
  overflow = 'breakWord',
  size = 'lg',
  truncate = false,
  underline = false,
  weight = 'normal',
}: Props): Node {
  const scale = SIZE_SCALE[size];

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    color && colors[color],
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'start' && typography.alignStart,
    align === 'end' && typography.alignEnd,
    align === 'forceLeft' && typography.alignForceLeft,
    align === 'forceRight' && typography.alignForceRight,
    overflow === 'breakWord' && typography.breakWord,
    overflow === 'noWrap' && typography.noWrap,
    italic && typography.fontStyleItalic,
    underline && typography.underline,
    weight === 'bold' && typography.fontWeightBold,
    weight === 'normal' && typography.fontWeightNormal,
    // `lineClamp` overrides `truncate`
    truncate && !isNotNullish(lineClamp) && typography.truncate,
    isNotNullish(lineClamp) && typography.lineClamp,
  );

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      style={{
        ...(lineClamp ? { WebkitLineClamp: lineClamp } : {}),
      }}
      title={
        (truncate || isNotNullish(lineClamp)) && typeof children === 'string' ? children : undefined
      }
    >
      {children}
    </Tag>
  );
}

Text.propTypes = {
  align: (PropTypes.oneOf([
    'start',
    'end',
    'center',
    'justify',
    'forceLeft',
    'forceRight',
  ]): React$PropType$Primitive<Align>),
  children: PropTypes.node,
  color: (PropTypes.oneOf([
    'green',
    'pine',
    'olive',
    'blue',
    'navy',
    'midnight',
    'purple',
    'orchid',
    'eggplant',
    'maroon',
    'watermelon',
    'orange',
    'darkGray',
    'gray',
    'lightGray',
    'red',
    'white',
  ]): React$PropType$Primitive<Color>),
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  lineClamp: PropTypes.number,
  overflow: (PropTypes.oneOf([
    'normal',
    'breakWord',
    'noWrap',
  ]): React$PropType$Primitive<Overflow>),
  size: (PropTypes.oneOf(['sm', 'md', 'lg']): React$PropType$Primitive<Size>),
  truncate: PropTypes.bool,
  weight: (PropTypes.oneOf(['bold', 'normal']): React$PropType$Primitive<FontWeight>),
};
