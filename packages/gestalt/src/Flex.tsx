import { Children, forwardRef, ForwardRefExoticComponent, ReactNode } from 'react';
import { buildStyles } from './boxTransforms';
import styles from './Flex.css';
import FlexItem from './FlexItem';
import wrapWithComponent from './utils/wrapWithComponent';

type Dimension = number | string;
type Gap =
  | 0
  | 0.25
  | 0.5
  | 1
  | 1.5
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16;

type Props = {
  /**
   * Aligns the flex container's lines within when there is extra space in the cross axis, similar to how `justify-content` aligns individual items within the main axis.
   */
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /**
   * Defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the `justify-content` version for the cross axis (perpendicular to the main axis).
   *
   * Also available in responsive sizes: `smAlignItems`, `mdAlignItems`, `lgAlignItems`, `xlAlignItems`, `xxlAlignItems`, `xxxlAlignItems`. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  smAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  mdAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  lgAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  xlAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  xxlAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  xxxlAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /**
   * Allows the default alignment (or the one specified by `align-items`) to be overridden for individual flex items.
   */
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /**
   * Note that each child will be automatically wrapped in [Flex.Item](https://gestalt.pinterest.systems/web/flex#Flex.Item) to apply various styles. If specific flex styles are needed on a child, you can manually wrap it in Flex.Item to apply those styles. See [the Applying flex properties to children example](https://gestalt.pinterest.systems/web/flex#Applying-flex-properties-to-children) to learn more.
   */
  children?: ReactNode;
  /**
   * Used to identify the element for testing purposes.
   */
  dataTestId?: string;
  /**
   * Establishes the main axis, thus defining the direction flex items are placed in the flex container.
   */
  direction?: 'row' | 'column';
  /**
   * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size Flex relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows Flex to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves Flex's size based on child content regardless of its container's size.
   * Default: 'shrink'
   */
  flex?: 'grow' | 'shrink' | 'none';
  /**
   * Defines spacing between each child along the main and cross axes. Use an object to define different spacing for rows and columns. See the [Gap](https://gestalt.pinterest.systems/web/flex#Gap) variant to learn more.
   */
  gap?:
    | Gap
    | {
        row: Gap;
        column: Gap;
      };
  /**
   * Use numbers for pixels: `height={100}` and strings for percentages: `height="100%"`.
   */
  height?: Dimension;
  /**
   * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
   */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: Dimension;
  /**
   * Use numbers for pixels: `maxWidth={100}` and strings for percentages: `maxWidth="100%"`.
   */
  maxWidth?: Dimension;
  /**
   * Use numbers for pixels: `minHeight={100}` and strings for percentages: `minHeight="100%"`.
   */
  minHeight?: Dimension;
  /**
   * Use numbers for pixels: `minWidth={100}` and strings for percentages: `minWidth="100%"`.
   */
  minWidth?: Dimension;
  /**
   * Defines how to handle content that extends beyond the Flex container.
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto';
  /**
   * Ref that is forwarded to the underlying div element.
   */
  ref?: HTMLDivElement;
  /**
   * Use numbers for pixels: `width={100}` and strings for percentages: `width="100%"`.
   */
  width?: Dimension;
  /**
   * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: boolean;
};

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
 * ![Flex light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Flex.spec.ts-snapshots/Flex-chromium-darwin.png)
 *
 */
const FlexWithForwardRef = forwardRef<HTMLDivElement, Props>(
  (
    {
      children: childrenProp,
      dataTestId,
      direction = 'row',
      gap = 0,
      justifyContent,
      ...rest
    }: Props,
    ref,
  ) => {
    const children = gap
      ? // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
        Children.map(childrenProp, (child, index) => {
          if (child === null || child === undefined) {
            return null;
          }
          return wrapWithComponent({
            element: child,
            Component: FlexItem,
            props: {},
            index,
          });
        }).filter(Boolean)
      : childrenProp;

    const gapStyles = `${styles[`rowGap${typeof gap === 'number' ? gap * 100 : gap.row * 100}`]} ${
      styles[`columnGap${typeof gap === 'number' ? gap * 100 : gap.column * 100}`]
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

    // @ts-expect-error - TS2322 - Type '{ "data-test-id": string | undefined; className: string | null | undefined; style: InlineStyle | null | undefined; alignContent?: "center" | "start" | "end" | "stretch" | "between" | "around" | "evenly" | undefined; ... 18 more ...; wrap?: boolean | undefined; }' is not assignable to type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
    return <div ref={ref} {...passthroughProps} {...propsStyles} data-test-id={dataTestId} />;
  },
);

// Define the type for FlexWithForwardRef to include the subcomponent, otherwise typescript does not recognize Flex.Item
interface FlexWithSubComponents
  extends ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>> {
  Item: typeof FlexItem;
}

// Attach the subcomponent to the main component
(FlexWithForwardRef as FlexWithSubComponents).Item = FlexItem;

FlexWithForwardRef.displayName = 'Flex';

export default FlexWithForwardRef as FlexWithSubComponents;
