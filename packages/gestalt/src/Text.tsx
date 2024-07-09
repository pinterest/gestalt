import { forwardRef, ReactElement, ReactNode } from 'react';
import cx from 'classnames';
import styles from './Text.css';
import { semanticColors } from './textTypes';
import typography from './Typography.css';

function isNotNullish(val?: number | null): boolean {
  return val !== null && val !== undefined;
}

type As = 'span' | 'div';
type Overflow = 'normal' | 'breakAll' | 'breakWord' | 'noWrap';
type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {
  /**
   * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text. See the [alignment variant](https://gestalt.pinterest.systems/web/text#Alignment) for more details.
   */
  align?: 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight';
  /**
   * The text content to be displayed.
   */
  children?: ReactNode;
  /**
   * The color of the text content. See the [colors variant](https://gestalt.pinterest.systems/web/text#Colors) for more details.
   */
  color?:
    | 'default'
    | 'disabled'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'link'
    | 'inverse'
    | 'light'
    | 'dark';
  /**
   * Indicates how the text should flow with the surrounding content. See the [block vs inline variant](https://gestalt.pinterest.systems/web/text#Block-vs.-inline) for more details.
   */
  inline?: boolean;
  /**
   * Indicates if the text should be displayed in italic. See the [styles variant](https://gestalt.pinterest.systems/web/text#Styles) for more details.
   */
  italic?: boolean;
  /**
   * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See the [overflow and truncation variant](https://gestalt.pinterest.systems/web/text#Overflow-and-truncation) for more details.
   */
  lineClamp?: number;
  /**
   * Indicates how the text content should handle overflowing its container. See the [overflow and truncation variant](https://gestalt.pinterest.systems/web/text#Overflow-and-truncation) for more details.
   */
  overflow?: Overflow;
  /**
   * Ref that is forwarded to the underlying element. See the [ref variant](https://gestalt.pinterest.systems/web/text#Refs) for more details.
   */
  ref?: HTMLDivElement | HTMLSpanElement;
  /**
   * The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Font-size). See the [sizes variant](https://gestalt.pinterest.systems/web/text#Sizes) for more details.
   */
  size?: Size;
  /**
   * This populates the `title` attribute of the element, which is visible on hover in most browsers. This is useful when truncating the text with `lineClamp` when `children` is a `React.Node`. See the [Title variant](https://gestalt.pinterest.systems/web/text#Title) for more details.
   */
  title?: string;
  /**
   * Indicates if the text content should be underlined. See the [styles variant](https://gestalt.pinterest.systems/web/text#Styles) for more details.
   */
  underline?: boolean;
  /**
   * Indicates the font weight for the text content. See the [styles variant](https://gestalt.pinterest.systems/web/text#Styles) for more details.
   */
  weight?: 'bold' | 'normal';
};

/**
 * [Text](https://gestalt.pinterest.systems/web/text) component is used for all non-heading text on all surfaces, whether inside of UI components or in long-form paragraph text.
 *
 * ![Text light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Text.spec.ts-snapshots/Text-chromium-darwin.png)
 * ![Text dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Text-dark.spec.ts-snapshots/Text-dark-chromium-darwin.png)
 */
const TextWithForwardRef = forwardRef<HTMLElement, Props>(function Text(
  {
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
  }: Props,
  ref,
): ReactElement {
  const colorClass = semanticColors.includes(color) && styles[color];

  const getWordBreakStyle = (): string | undefined => {
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
    styles.Text,
    typography[`fontSize${size}`],
    color && colorClass,
    align === 'center' && typography.alignCenter,
    // @ts-expect-error - TS2367 - This condition will always return 'false' since the types '"center" | "start" | "end" | "forceLeft" | "forceRight"' and '"justify"' have no overlap.
    align === 'justify' && typography.alignJustify,
    align === 'start' && typography.alignStart,
    align === 'end' && typography.alignEnd,
    align === 'forceLeft' && typography.alignForceLeft,
    align === 'forceRight' && typography.alignForceRight,
    getWordBreakStyle(),
    overflow === 'noWrap' && typography.noWrap,
    italic && typography.fontStyleItalic,
    underline && typography.underline,
    weight === 'bold' && typography.fontWeightSemiBold,
    weight === 'normal' && typography.fontWeightNormal,
    isNotNullish(lineClamp) && typography.lineClamp,
  );

  const Tag: As = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      title={
        title ?? (isNotNullish(lineClamp) && typeof children === 'string' ? children : undefined)
      }
      {...(lineClamp ? { style: { WebkitLineClamp: lineClamp } } : {})}
      // @ts-expect-error - TS2322 - Type 'ForwardedRef<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
      ref={ref}
    >
      {children}
    </Tag>
  );
});

TextWithForwardRef.displayName = 'Text';

export default TextWithForwardRef;
