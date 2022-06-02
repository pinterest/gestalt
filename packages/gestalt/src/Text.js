// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import colors from './Colors.css';
import styles from './Text.css';
import typography from './Typography.css';
import { semanticColors } from './textTypes.js';
import useInExperiment from './useInExperiment.js';

function isNotNullish(val): boolean {
  return val !== null && val !== undefined;
}

const SIZE_SCALE = {
  '100': 100,
  '200': 200,
  '300': 300,
  '400': 400,
  '500': 500,
  '600': 600,
};

type Overflow = 'normal' | 'breakWord' | 'noWrap';
type Size = '100' | '200' | '300' | '400' | '500' | '600';

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
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'link'
    | 'inverse'
    | 'light'
    | 'dark',
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
   * The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/design_tokens#Font-size).
   *
   * Link: https://gestalt.pinterest.systems/text#size
   */
  size?: Size,
  /**
   * This populates the `title` attribute of the element, which is visible on hover in most browsers. This is useful when truncating the text with `lineClamp` when `children` is a `React.Node`. See the [Title variant](https://gestalt.pinterest.systems/text#Title) for more details.
   */
  title?: string,
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
 * ![Text light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Text.spec.mjs-snapshots/Text-chromium-darwin.png)
 * ![Text dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Text-dark.spec.mjs-snapshots/Text-dark-chromium-darwin.png)
 */
export default function Text({
  align = 'start',
  children,
  color = 'default',
  inline = false,
  italic = false,
  lineClamp,
  overflow = 'breakWord',
  size = '300',
  title,
  underline = false,
  weight = 'normal',
}: Props): Node {
  const colorClass = semanticColors.includes(color) && colors[`${color}Text`];

  const inSemiBoldExp = useInExperiment({
    webExperimentName: 'web_gestalt_semibold_weight',
    mwebExperimentName: 'mweb_gestalt_semibold_weight',
  });

  const fontWeightStyle = inSemiBoldExp ? typography.fontWeightSemiBold : typography.fontWeightBold;

  const cs = cx(
    styles.Text,
    typography[`fontSize${SIZE_SCALE[size]}`],
    color && colorClass,
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
    weight === 'bold' && fontWeightStyle,
    weight === 'normal' && typography.fontWeightNormal,
    isNotNullish(lineClamp) && typography.lineClamp,
  );

  const Tag = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      title={
        title ?? (isNotNullish(lineClamp) && typeof children === 'string' ? children : undefined)
      }
      {...(lineClamp ? { style: { WebkitLineClamp: lineClamp } } : {})}
    >
      {children}
    </Tag>
  );
}
