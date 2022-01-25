// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Text.css';
import typography from './Typography.css';
import { allowedColors } from './textTypes.js';

function isNotNullish(val): boolean {
  return val !== null && val !== undefined;
}

const SIZE_SCALE = {
  sm: 100,
  md: 200,
  lg: 300,
};

type Overflow = 'normal' | 'breakWord' | 'noWrap';
type Size = 'sm' | 'md' | 'lg';

type Props = {|
  /**
   * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text.
   *
   * Link: https://gestalt.pinterest.systems/text#align
   */
  align?: 'start' | 'end' | 'center' | 'justify' | 'forceLeft' | 'forceRight',
  children?: Node,
  /**
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
   * Link: https://gestalt.pinterest.systems/text#inline
   */
  inline?: boolean,
  /**
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
   * Link: https://gestalt.pinterest.systems/text#overflow
   */
  overflow?: Overflow,
  /**
   * sm: `12px`, md: `14px`, lg: `16px`
   *
   * Link: https://gestalt.pinterest.systems/text#size
   */
  size?: Size,
  /**
   * Link: https://gestalt.pinterest.systems/text#styles
   */
  underline?: boolean,
  /**
   * Link: https://gestalt.pinterest.systems/text#styles
   */
  weight?: 'bold' | 'normal',
|};

/**
 * The [Text](https://gestalt.pinterest.systems/text) component should be used for all text on the page.
 *
 * ![Text light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Text%20%230.png)
 * ![Text dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Text-dark%20%230.png)
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
