// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Text.css';
import typography from './Typography.css';
import { allowedColors, type Align, type Color, type FontWeight } from './textTypes.js';

function isNotNullish(val): boolean {
  return val !== null && val !== undefined;
}

const SIZE_SCALE = {
  sm: 1,
  md: 2,
  lg: 3,
};

type Overflow = 'normal' | 'breakWord' | 'noWrap';
type Size = 'sm' | 'md' | 'lg';

type Props = {|
  /**
   * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text.
   *
   * Default: 'start'
   * Link: https://gestalt.pinterest.systems/text#align
   */
  align?: 'start' | 'end' | 'center' | 'justify' | 'forceLeft' | 'forceRight',
  children?: Node,
  /**
   * Default: 'darkGray'
   * Link: https://gestalt.pinterest.systems/text#color
   */
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
  /**
   * Default: false
   * Link: https://gestalt.pinterest.systems/text#inline
   */
  inline?: boolean,
  /**
   * Default: false
   * Link: https://gestalt.pinterest.systems/text#styles
   */
  italic?: boolean,
  /**
   * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers.
   *
   * Link: https://gestalt.pinterest.systems/text#overflow
   */
  lineClamp?: number,
  /**
   * Default: 'breakWord'
   * Link: https://gestalt.pinterest.systems/text#overflow
   */
  overflow?: Overflow,
  /**
   * sm: `12px`, md: `14px`, lg: `16px`
   *
   * Default: 'lg'
   * Link: https://gestalt.pinterest.systems/text#size
   */
  size?: Size,
  /**
   * Default: 'false'
   * Link: https://gestalt.pinterest.systems/text#styles
   */
  underline?: boolean,
  /**
   * Default: 'normal'
   * Link: https://gestalt.pinterest.systems/text#styles
   */
  weight?: 'bold' | 'normal',
|};

/**
 * https://gestalt.pinterest.systems/Text
 */
export default function Text({
  align = 'start',
  children,
  color = 'darkGray',
  inline = false,
  italic = false,
  lineClamp,
  overflow = 'breakWord',
  size = 'lg',
  underline = false,
  weight = 'normal',
}: Props): Node {
  const scale = SIZE_SCALE[size];

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    color && allowedColors.includes(color) && colors[color],
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
    isNotNullish(lineClamp) && typography.lineClamp,
  );

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      title={isNotNullish(lineClamp) && typeof children === 'string' ? children : undefined}
      {...(lineClamp ? { style: { WebkitLineClamp: lineClamp } } : {})}
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
  color: (PropTypes.oneOf(allowedColors): React$PropType$Primitive<Color>),
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  lineClamp: PropTypes.number,
  overflow: (PropTypes.oneOf([
    'normal',
    'breakWord',
    'noWrap',
  ]): React$PropType$Primitive<Overflow>),
  size: (PropTypes.oneOf(['sm', 'md', 'lg']): React$PropType$Primitive<Size>),
  weight: (PropTypes.oneOf(['bold', 'normal']): React$PropType$Primitive<FontWeight>),
};
