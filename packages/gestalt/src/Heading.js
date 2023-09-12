// @flow strict
import { createElement, type Node } from 'react';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Heading.css';
import { semanticColors } from './textTypes.js';
import typography from './Typography.css';

function isNotNullish(val: ?number): boolean {
  return val !== null && val !== undefined;
}

const defaultHeadingLevels = {
  '100': 6,
  '200': 5,
  '300': 4,
  '400': 3,
  '500': 2,
  '600': 1,
};

type AccessibilityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 'none';
type Overflow = 'normal' | 'breakWord' | 'breakAll';
type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {|
  /**
   * Allows you to override the default heading level for the given `size`.
   */
  accessibilityLevel?: AccessibilityLevel,
  /**
   * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text. See [Alignment example](https://gestalt.pinterest.systems/web/heading#Alignment) for more details.
   */
  align?: 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight',
  /**
   *
   */
  children?: Node,
  /**
   * The color of the text. See [Text colors example](https://gestalt.pinterest.systems/foundations/design_tokens#Text-color) for more details.
   */
  color?:
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'inverse'
    | 'light'
    | 'dark',
  /**
   * A unique identifier for the element.
   */
  id?: string,
  /**
   * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See [Truncation example](https://gestalt.pinterest.systems/web/heading#Overflow-and-truncation) for more details.
   */
  lineClamp?: number,
  /**
   * How truncation is handled when text overflows the line. See [Truncation example](https://gestalt.pinterest.systems/web/heading#Overflow-and-truncation) for more details.
   */
  overflow?: Overflow,
  /**
   * The font size of the text. See [Sizes example](https://gestalt.pinterest.systems/web/heading#Size) for more details.
   * The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens#Font-size).
   */
  size?: Size,
|};

/**
 * [Heading](https://gestalt.pinterest.systems/web/heading) allows you to add H1–H6 level text on a page. They are generally placed underneath a PageHeader, and provide you with a way to create a logical text hierarchy.
 *
 * ![Heading light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Heading.spec.mjs-snapshots/Heading-chromium-darwin.png)
 * ![Heading dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Heading-dark.spec.mjs-snapshots/Heading-dark-chromium-darwin.png)
 *
 */
export default function Heading({
  accessibilityLevel,
  align = 'start',
  children,
  color = 'default',
  lineClamp,
  id,
  overflow = 'breakWord',
  size = '600',
}: Props): Node {
  const getWordBreakStyle = (): string | void => {
    if (overflow === 'breakAll') {
      return typography.breakAll;
    }

    // default to breakWord if lineClamp is set
    if (overflow === 'breakWord' || isNotNullish(lineClamp)) {
      return typography.breakWord;
    }

    return undefined;
  };

  const cs = cx(
    styles.Heading,
    typography[`fontSize${size}`],
    color && semanticColors.includes(color) && colors[`${color}Text`],
    align === 'center' && typography.alignCenter,
    align === 'justify' && typography.alignJustify,
    align === 'start' && typography.alignStart,
    align === 'end' && typography.alignEnd,
    align === 'forceLeft' && typography.alignForceLeft,
    align === 'forceRight' && typography.alignForceRight,
    getWordBreakStyle(),
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
