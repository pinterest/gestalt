import { createElement, ReactNode } from 'react';
import cx from 'classnames';
import styles from './Heading.css';
import colors from './Text.css';
import { semanticColors } from './textTypes';
import typographyStyle from './Typography.css';
import useInExperiment from './useInExperiment';

function isNotNullish(val?: number | null): boolean {
  return val !== null && val !== undefined;
}

const defaultHeadingLevels = {
  '100': 6,
  '200': 5,
  '300': 4,
  '400': 3,
  '500': 2,
  '600': 1,
} as const;

const defaultHeadingLevelsVR = {
  '100': 5,
  '200': 5,
  '300': 4,
  '400': 3,
  '500': 2,
  '600': 1,
} as const;

type AccessibilityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 'none';
type Overflow = 'normal' | 'breakWord' | 'breakAll';
type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {
  /**
   * Allows you to override the default heading level for the given `size`.
   */
  accessibilityLevel?: AccessibilityLevel;
  /**
   * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text. See [Alignment example](https://gestalt.pinterest.systems/web/heading#Alignment) for more details.
   */
  align?: 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight';
  /**
   *
   */
  children?: ReactNode;
  /**
   * The color of the text. See [Text colors example](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Text-color) for more details.
   */
  color?:
    | 'default'
    | 'disabled'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'inverse'
    | 'light'
    | 'dark';
  /**
   * A unique identifier for the element.
   */
  id?: string;
  /**
   * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See [Truncation example](https://gestalt.pinterest.systems/web/heading#Overflow-and-truncation) for more details.
   */
  lineClamp?: number;
  /**
   * How truncation is handled when text overflows the line. See [Truncation example](https://gestalt.pinterest.systems/web/heading#Overflow-and-truncation) for more details.
   */
  overflow?: Overflow;
  /**
   * The font size of the text. See [Sizes example](https://gestalt.pinterest.systems/web/heading#Size) for more details.
   * The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Font-size).
   */
  size?: Size;
};

/**
 * [Heading](https://gestalt.pinterest.systems/web/heading) allows you to add H1–H6 level text on a page. They are generally placed underneath a PageHeader, and provide you with a way to create a logical text hierarchy.
 *
 * ![Heading light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Heading.spec.ts-snapshots/Heading-chromium-darwin.png)
 * ![Heading dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Heading-dark.spec.ts-snapshots/Heading-dark-chromium-darwin.png)
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
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

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
    {
      [styles.Heading]: !isInVRExperiment,
      [styles.HeadingVR]: isInVRExperiment,
      [typographyStyle[`fontSize${size}`]]: !isInVRExperiment,
      [styles.lg]: isInVRExperiment && size === '600',
      [styles.md]: isInVRExperiment && size === '500',
      [styles.sm]: isInVRExperiment && size === '400',
      [styles.xs]: isInVRExperiment && size === '300',
      [styles.xxs]: isInVRExperiment && (size === '200' || size === '100'),
    },
    color && semanticColors.includes(color) && colors[color],
    align === 'center' && typographyStyle.alignCenter,
    // @ts-expect-error - TS2367 - This condition will always return 'false' since the types '"center" | "start" | "end" | "forceLeft" | "forceRight"' and '"justify"' have no overlap.
    align === 'justify' && typographyStyle.alignJustify,
    align === 'start' && typographyStyle.alignStart,
    align === 'end' && typographyStyle.alignEnd,
    align === 'forceLeft' && typographyStyle.alignForceLeft,
    align === 'forceRight' && typographyStyle.alignForceRight,
    getWordBreakStyle(),
    isNotNullish(lineClamp) && typographyStyle.lineClamp,
  );

  const headingLevel =
    accessibilityLevel ||
    (!isInVRExperiment ? defaultHeadingLevels[size] : defaultHeadingLevelsVR[size]);

  let newProps = { className: cs };
  if (id) {
    // @ts-expect-error - TS2322 - Type '{ id: string; className: string; }' is not assignable to type '{ className: string; }'.
    newProps = { ...newProps, id };
  }
  if (isNotNullish(lineClamp) && typeof children === 'string') {
    newProps = {
      ...newProps,
      // @ts-expect-error - TS2322 - Type '{ style: { WebkitLineClamp: number | undefined; }; title: string; className: string; }' is not assignable to type '{ className: string; }'.
      style: { WebkitLineClamp: lineClamp },
      title: children,
    };
  }

  return createElement(headingLevel === 'none' ? 'div' : `h${headingLevel}`, newProps, children);
}

Heading.displayName = 'Heading';
