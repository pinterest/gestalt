import { forwardRef, ReactElement, ReactNode } from 'react';
import cx from 'classnames';
import stylesText from './Text.css';
import styles from './TextCompact.css';
import { semanticColors } from './textTypes';
import typographyStyle from './Typography.css';
import useInExperiment from './useInExperiment';

function isNotNullish(val?: number | null): boolean {
  return val !== null && val !== undefined;
}

type As = 'span' | 'div';
type Overflow = 'normal' | 'breakAll' | 'breakWord' | 'noWrap';

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
    | 'recommendation'
    | 'light'
    | 'dark';
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
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
   * This populates the `title` attribute of the element, which is visible on hover in most browsers. This is useful when truncating the text with `lineClamp` when `children` is a `React.Node`. See the [Title variant](https://gestalt.pinterest.systems/web/text#Title) for more details.
   */
  title?: string;
  /**
   * Indicates the font weight for the text content. See the [styles variant](https://gestalt.pinterest.systems/web/text#Styles) for more details.
   */
  weight?: 'emphasis' | 'default';
};

/**
 * [TextCompact](https://gestalt.pinterest.systems/web/textcompact) component is used for....
 *
 * ![Text light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextCompact.spec.ts-snapshots/TextCompact-chromium-darwin.png)
 * ![Text dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextUI-dark.spec.ts-snapshots/TextCompact-dark-chromium-darwin.png)
 */

const TextCompactWithForwardRef = forwardRef<HTMLDivElement, Props>(function Text(
  {
    align = 'start',
    children,
    color = 'default',
    dataTestId,
    inline = false,
    italic = false,
    lineClamp,
    overflow = 'breakWord',
    title,
    weight = 'default',
  }: Props,
  ref,
): ReactElement {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const colorClass = semanticColors.includes(color) && stylesText[color];

  const getWordBreakStyle = (): string | undefined => {
    if (overflow === 'breakAll') {
      return typographyStyle.breakAll;
    }

    // default to breakWord if lineClamp is set
    if (overflow === 'breakWord' || isNotNullish(lineClamp)) {
      return typographyStyle.breakWord;
    }

    return undefined;
  };

  const cs = cx(
    color && colorClass,
    align === 'center' && typographyStyle.alignCenter,
    // @ts-expect-error - TS2367 - This condition will always return 'false' since the types '"center" | "start" | "end" | "forceLeft" | "forceRight"' and '"justify"' have no overlap.
    align === 'justify' && typographyStyle.alignJustify,
    align === 'start' && typographyStyle.alignStart,
    align === 'end' && typographyStyle.alignEnd,
    align === 'forceLeft' && typographyStyle.alignForceLeft,
    align === 'forceRight' && typographyStyle.alignForceRight,
    getWordBreakStyle(),
    overflow === 'noWrap' && typographyStyle.noWrap,
    italic && typographyStyle.fontStyleItalic,
    isNotNullish(lineClamp) && typographyStyle.lineClamp,
    {
      [stylesText.Text]: !isInVRExperiment,
      [typographyStyle.fontSize100]: !isInVRExperiment,
      [typographyStyle.fontWeightSemiBold]: !isInVRExperiment && weight === 'emphasis',
      [typographyStyle.fontWeightNormal]: !isInVRExperiment && weight === 'default',
      [styles.textCompact]: isInVRExperiment,
      [styles.default]: isInVRExperiment && weight === 'default',
      [styles.emphasis]: isInVRExperiment && weight === 'emphasis',
    },
  );

  const Tag: As = inline ? 'span' : 'div';

  return (
    <Tag
      className={cs}
      data-test-id={dataTestId}
      title={
        title ?? (isNotNullish(lineClamp) && typeof children === 'string' ? children : undefined)
      }
      {...(lineClamp ? { style: { WebkitLineClamp: lineClamp } } : {})}
      ref={ref}
    >
      {children}
    </Tag>
  );
});

TextCompactWithForwardRef.displayName = 'TextCompact';

export default TextCompactWithForwardRef;
