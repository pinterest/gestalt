// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading } from 'gestalt';
import Markdown from './Markdown.js';

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
    <Box>
      {title && (
        <Box paddingY={1}>
          <Heading size="sm">{title}</Heading>
        </Box>
      )}
      {description && (
        <Box>
          <Markdown text={description} />
        </Box>
      )}
      <Flex wrap gap={4}>
        {children}
      </Flex>
    </Box>
  );
};

export default MainSectionSubsection;
