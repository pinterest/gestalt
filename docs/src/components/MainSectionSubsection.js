// @flow strict
import React, { type Node, Children } from 'react';
import { Box, Flex, Heading } from 'gestalt';
import slugify from 'slugify';
import CopyLinkButton from './buttons/CopyLinkButton.js';
import Markdown from './Markdown.js';
import { copyToClipboard } from './Card.js';
import { convertToSentenceCase } from './utils.js';

type Props = {|
  children?: Node,
  description?: string,
  title?: string,
|};

const MainSectionSubsection = ({ children, description, title }: Props): Node => {
  const slugifiedId = slugify(title || '');
  const arrayChildren = Children.toArray(children);

  return (
    <Box marginTop={4}>
      <Box marginBottom={title || description ? 8 : 0}>
        {title && (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                scrollMarginTop: 60,
              },
            }}
            id={slugifiedId}
            data-anchor
          >
            <Flex alignItems="center" gap={2}>
              <Heading size="sm">{convertToSentenceCase(title)}</Heading>
              <CopyLinkButton
                name={title}
                onClick={() => {
                  copyToClipboard(slugifiedId);
                }}
              />
            </Flex>
          </Box>
        )}

        {description && (
          <Box maxWidth={572} marginTop={title ? 2 : 0} color="white">
            <Markdown text={description} />
          </Box>
        )}
      </Box>
      {arrayChildren && (
        <Flex wrap gap={4}>
          {arrayChildren.map((child, idx) => (
            <Flex.Item flex="grow" key={idx}>
              {child}
            </Flex.Item>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default MainSectionSubsection;
