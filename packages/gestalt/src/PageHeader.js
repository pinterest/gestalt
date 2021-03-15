// @flow strict
import React, { type Node, Children, type Element } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import Tooltip from './Tooltip.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Text from './Text.js';
import { type Dimension } from './boxTypes.js';

type Props = {|
  title: string,
  maxWidth?: Dimension,
  primaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>,
  secondaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>,
  subtext?: string,
|};

export default function PageHeader({
  maxWidth = '100%',
  primaryAction,
  secondaryAction,
  subtext,
  title,
}: Props): Node {
  return (
    <Box color="white" paddingX={8} width="100%">
      <Flex flex="grow" justifyContent="center" maxWidth="100%">
        <Flex justifyContent="between" alignItems="center" width={maxWidth}>
          <Box marginEnd={4} minWidth={0} marginTop={2} marginBottom={2}>
            <Heading size="md" truncate accessibilityLevel={1}>
              {title}
            </Heading>
            {subtext && (
              <Box marginTop={2}>
                <Text truncate>{subtext}</Text>
              </Box>
            )}
          </Box>
          {primaryAction && (
            <Flex gap={2} flex="none" alignItems="center">
              {secondaryAction}
              <Box display="flex" alignItems="center" marginTop={4} marginBottom={4} height="48px">
                {primaryAction}
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
