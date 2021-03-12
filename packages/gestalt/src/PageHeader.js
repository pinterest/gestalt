// @flow strict
import React, { type Node, Children } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Text from './Text.js';
import { type Dimension } from './boxTypes.js';

type Props = {|
  title: string,
  maxWidth?: Dimension,
  primaryAction?: Node,
  secondaryAction?: Node,
  subtext?: string,
|};

export default function PageHeader({
  maxWidth = '100%',
  primaryAction,
  secondaryAction,
  subtext,
  title,
}: Props): Node {
  const renderAction = (action?: Node): Node => {
    // This is technically all temporary, until we create a proper Menu component
    // Then, we could type check using Flow for Buttons, Links, or Menus
    let allowedChildFound = false;
    if (
      action.type?.displayName &&
      ['IconButton', 'Button', 'Link', 'Tooltip'].includes(action.type.displayName)
    ) {
      allowedChildFound = true;
    } else if (action.props?.children) {
      const actionChildrenArray = Children.toArray(action.props.children);
      actionChildrenArray.forEach((child) => {
        if (
          child.type &&
          ['IconButton', 'Button', 'Link', 'Tooltip'].includes(child.type.displayName)
        ) {
          allowedChildFound = true;
        }
      });
    }
    if (!allowedChildFound) {
      throw new Error('PageHeader actions must be of type Button, IconButton, Link, or Tooltip.');
    }

    return allowedChildFound ? action : <div />;
  };
  return (
    <Flex flex="grow" justifyContent="center" maxWidth="100%">
      <Flex justifyContent="between" alignItems="center" width={maxWidth}>
        <Flex direction="column" gap={subtext ? 2 : 0} minWidth={0}>
          <Box marginEnd={4}>
            <Heading truncate>{title}</Heading>
          </Box>
          {subtext && (
            <Box marginEnd={4}>
              <Text truncate>{subtext}</Text>
            </Box>
          )}
        </Flex>
        {primaryAction && (
          <Flex gap={2} flex="none">
            {secondaryAction && renderAction(secondaryAction)}
            {renderAction(primaryAction)}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
