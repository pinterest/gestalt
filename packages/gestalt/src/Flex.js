// @flow strict
import { Children, type Node } from 'react';
import { buildStyles } from './boxTransforms.js';
import styles from './Flex.css';
import FlexItem from './FlexItem.js';
import wrapWithComponent from './utils/wrapWithComponent.js';

type Dimension = number | string;
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {|
  /**
   * Aligns the flex container's lines within when there is extra space in the cross axis, similar to how `justify-content` aligns individual items within the main axis.
   */
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch',
  /**
   * Defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the `justify-content` version for the cross axis (perpendicular to the main axis).
   *
   * Also available in responsive sizes: `smAlignItems`, `mdAlignItems`, `lgAlignItems`. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * The alignItems style in sm or larger viewports. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  smAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * The alignItems style in md or larger viewports. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  mdAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * The alignItems style in lg or larger viewports. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  lgAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items.
   */
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Note that each child will be automatically wrapped in [Flex.Item](https://gestalt.pinterest.systems/web/flex#Flex.Item) to apply various styles. If specific flex styles are needed on a child, you can manually wrap it in Flex.Item to apply those styles. See [the Applying flex properties to children example](https://gestalt.pinterest.systems/web/flex#Applying-flex-properties-to-children) to learn more.
   */
  children?: Node,
  /**
   * Used to identify the element for testing purposes.
   */
  dataTestId?: string,
  /**
   * Establishes the main axis, thus defining the direction flex items are placed in the flex container.
   */
  direction?: 'row' | 'column',
  /**
   * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size Flex relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows Flex to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves Flex's size based on child content regardless of its container's size.
   * Default: 'shrink'
   */
  flex?: 'grow' | 'shrink' | 'none',
  /**
   * Defines spacing between each child along the main and cross axes. Use an object to define different spacing for rows and columns. See the [Gap](https://gestalt.pinterest.systems/web/flex#Gap) variant to learn more.
   */
  gap?: Gap | {| row: Gap, column: Gap |},
  /**
   * Use numbers for pixels: `height={100}` and strings for percentages: `height="100%"`.
   */
  height?: Dimension,
  /**
   * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
   */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly',
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: Dimension,
  /**
   * Use numbers for pixels: `maxWidth={100}` and strings for percentages: `maxWidth="100%"`.
   */
  maxWidth?: Dimension,
  /**
   * Use numbers for pixels: `minHeight={100}` and strings for percentages: `minHeight="100%"`.
   */
  minHeight?: Dimension,
  /**
   * Use numbers for pixels: `minWidth={100}` and strings for percentages: `minWidth="100%"`.
   */
  minWidth?: Dimension,
  /**
   * Defines how to handle content that extends beyond the Flex container.
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto',
  /**
   * Use numbers for pixels: `width={100}` and strings for percentages: `width="100%"`.
   */
  width?: Dimension,
  /**
   * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: boolean,
|};

const allowedProps = [
  'alignContent',
  'alignItems',
  'smAlignItems',
  'mdAlignItems',
  'lgAlignItems',
  'alignSelf',
  'children',
  'direction',
  'flex',
  'height',
  'justifyContent',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'width',
  'wrap',
];

/**
 * [Flex](https://gestalt.pinterest.systems/web/flex) is a layout component with a very limited subset of the props available to [Box](https://gestalt.pinterest.systems/web/box) and a special prop of its own.

 * Use this component for flexbox layouts, especially when even spacing between elements is desired (see the `gap` prop!).
 *
 * ![Flex light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Flex.spec.mjs-snapshots/Flex-chromium-darwin.png)
 *
 */
export default function Flex({
  children: childrenProp,
  dataTestId,
  direction = 'row',
  gap = 0,
  justifyContent,
  ...rest
}: Props): Node {
  const children = gap
    ? Children.map(childrenProp, (child, index) => {
        if (child === null || child === undefined) {
          return null;
        }
        return wrapWithComponent({
          // $FlowFixMe[incompatible-call]
          element: child,
          Component: FlexItem,
          props: {
            key: index,
          },
        });
      }).filter(Boolean)
    : childrenProp;

  const gapStyles = `${styles[`rowGap${typeof gap === 'number' ? gap : gap.row}`]} ${
    styles[`columnGap${typeof gap === 'number' ? gap : gap.column}`]
  }`;

  const { passthroughProps, propsStyles } = buildStyles<Props>({
    baseStyles: `${styles.Flex} ${gapStyles}`,
    props: {
      ...rest,
      children,
      direction,
      justifyContent,
    },
    allowlistProps: allowedProps,
  });

  return <div {...passthroughProps} {...propsStyles} data-test-id={dataTestId} />;
}

Flex.Item = FlexItem;

Flex.displayName = 'Flex';
