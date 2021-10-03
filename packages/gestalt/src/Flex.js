// @flow strict
import { Children, type Node } from 'react';
import FlexItem from './FlexItem.js';
import styles from './Flex.css';
import wrapWithComponent from './utils/wrapWithComponent.js';
import { buildStyles } from './boxTransforms.js';
import {
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type Dimension,
  type Direction,
  type Flex as FlexType,
  type Gap,
  type JustifyContent,
  type Overflow,
} from './boxTypes.js';

type Props = {|
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  children?: Node,
  direction?: Direction,
  flex?: FlexType,
  gap?: Gap,
  height?: Dimension,
  justifyContent?: JustifyContent,
  maxHeight?: Dimension,
  maxWidth?: Dimension,
  minHeight?: Dimension,
  minWidth?: Dimension,
  overflow?: Overflow,
  width?: Dimension,
  wrap?: boolean,
|};

const allowedProps = [
  'alignContent',
  'alignItems',
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
 * https://gestalt.pinterest.systems/Flex
 */
export default function Flex({
  alignItems,
  children: childrenProp,
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
          element: child,
          Component: FlexItem,
          props: {
            key: index,
          },
        });
      }).filter(Boolean)
    : childrenProp;

  const { passthroughProps, propsStyles } = buildStyles<Props>({
    baseStyles: `${styles.Flex} ${styles[`${direction}Gap${gap}`]}`,
    props: {
      ...rest,
      alignItems,
      children,
      direction,
      justifyContent,
    },
    allowlistProps: allowedProps,
  });

  return <div {...passthroughProps} {...propsStyles} />;
}

Flex.Item = FlexItem;

Flex.displayName = 'Flex';
