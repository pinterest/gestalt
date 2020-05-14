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
  PaddingPropType,
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type Flex,
  type JustifyContent,
  type Padding,
} from './Box.js';

type Props = {|
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  children?: React.Node,
  fit?: boolean,
  flex?: Flex,
  gap?: Padding,
  justifyContent?: JustifyContent,
  wrap?: boolean,
|};

export default function Row({
  alignItems = 'center',
  children,
  gap = 0,
  justifyContent = 'start',
  ...rest
}: Props) {
  return (
    <Box
      height="100%"
      marginStart={gap ? -gap : 0}
      marginEnd={gap ? -gap : 0}
      width="100%"
    >
      <FlexBox
        alignItems={alignItems}
        direction="row"
        height="100%"
        justifyContent={justifyContent}
        width="100%"
        {...rest}
      >
        {React.Children.map(children, child => (
          <Box paddingX={gap}>{child}</Box>
        ))}
      </FlexBox>
    </Box>
  );
}

Row.propTypes = {
  alignContent: AlignContentPropType,
  alignItems: AlignItemsPropType,
  alignSelf: AlignSelfPropType,
  children: PropTypes.node,
  fit: PropTypes.bool,
  flex: FlexPropType,
  gap: PaddingPropType,
  justifyContent: JustifyContentPropType,
  wrap: PropTypes.bool,
};
