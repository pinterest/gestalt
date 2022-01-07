// @flow strict
import { createElement, type Node } from 'react';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Heading.css';
import typography from './Typography.css';
import { allowedColors } from './textTypes.js';

function isNotNullish(val): boolean {
  return val !== null && val !== undefined;
}

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

type AccessibilityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 'none';
type Overflow = 'normal' | 'breakWord';
type Size = 'sm' | 'md' | 'lg';

type Props = {|
  /**
   * Allows you to override the default heading level for the given `size`.
   */
  accessibilityLevel?: AccessibilityLevel,
  /**
   * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text. See [Align example](https://gestalt.pinterest.systems#align) for more details.
   */
  align?: 'start' | 'end' | 'center' | 'justify' | 'forceLeft' | 'forceRight',
  /**
   *
   */
  children?: Node,
  /**
   * The color of the text. See [Colors example](https://gestalt.pinterest.systems#colors) for more details.
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
   * A unique identifier for the element.
   */
  id?: string,
  /**
   * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See [Truncation example](https://gestalt.pinterest.systems#overflowTruncation) for more details.
   */
  lineClamp?: number,
  /**
   * How truncation is handled when text overflows the line. See [Truncation example](https://gestalt.pinterest.systems#overflowTruncation) for more details.
   */
  overflow?: Overflow,
  /**
   * The font size of the text. See [Sizes example](https://gestalt.pinterest.systems#sizes) for more details.
   * sm: 20px, md: 28px, lg: 36px
   */
  size?: Size,
|};

/**
 * [Heading](https://gestalt.pinterest.systems/heading) allows you to show headings on the page & has a bigger line height than regular text.
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
