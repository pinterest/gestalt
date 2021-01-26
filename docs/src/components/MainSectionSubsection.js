// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading } from 'gestalt';
import Markdown from './Markdown.js';

type Props = {|
  children: Node,
  description?: string,
  title?: string,
|};

const MainSectionSubsection = ({
  children,
  description,
  title,
}: Props): Node => {
  return (
    <>
      {title && (
        <Box paddingY={1}>
          <Heading size="sm">{title}</Heading>
        </Box>
      )}
      {description && (
        <Box marginTop={-3}>
          <Markdown text={description} />
        </Box>
      )}
      <Flex wrap gap={4}>
        {children}
      </Flex>
    </>
  );
};

export default MainSectionSubsection;
