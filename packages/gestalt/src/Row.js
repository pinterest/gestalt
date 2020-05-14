// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import FlexBox from './FlexBox.js';
import Box, {
  AlignContentPropType,
  AlignItemsPropType,
  AlignSelfPropType,
  FlexPropType,
  JustifyContentPropType,
  MarginPropType,
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type Flex,
  type JustifyContent,
  type Margin,
} from './Box.js';

type Props = {|
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  children?: React.Node,
  fit?: boolean,
  flex?: Flex,
  gap?: Margin,
  justifyContent?: JustifyContent,
  wrap?: boolean,
|};

export default function Row({
  alignItems,
  children,
  gap,
  justifyContent,
  ...rest
}: Props) {
  return (
    <FlexBox
      alignItems={alignItems ?? 'center'}
      direction="row"
      justifyContent={justifyContent ?? 'start'}
      {...rest}
    >
      {React.Children.map(children, (child, index) => (
        <Box
          marginStart={index === 0 ? 0 : gap}
          marginEnd={index === React.Children.count(children) - 1 ? 0 : gap}
        >
          {child}
        </Box>
      ))}
    </FlexBox>
  );
}

Row.propTypes = {
  alignContent: AlignContentPropType,
  alignItems: AlignItemsPropType,
  alignSelf: AlignSelfPropType,
  children: PropTypes.node,
  fit: PropTypes.bool,
  flex: FlexPropType,
  gap: MarginPropType,
  justifyContent: JustifyContentPropType,
  wrap: PropTypes.bool,
};
