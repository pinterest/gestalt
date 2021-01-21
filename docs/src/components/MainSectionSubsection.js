// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

type Props = {|
  description?: string,
  title?: string,
  children: Node,
|};

const MainSectionSubsection = ({
  children,
  description,
  title,
}: Props): Node => {
  return (
    <Box marginBottom={2}>
      {title && (
        <Box paddingY={1}>
          <Heading size="sm">{title}</Heading>
        </Box>
      )}
      {description && <Text>{description}</Text>}
      <Flex wrap gap={4}>
        {children}
      </Flex>
    </Box>
  );
};

export default MainSectionSubsection;
