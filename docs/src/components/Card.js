// @flow strict
import type { Node } from 'react';
import { Box, Flex, Heading, IconButton, Tooltip } from 'gestalt';
import slugify from 'slugify';
import Markdown from './Markdown.js';

type Props = {|
  children?: Node,
  description?: string,
  headingSize?: 'sm' | 'md',
  id?: string,
  name: string,
  toggle?: Node,
  stacked?: boolean,
  showHeading?: boolean,
|};

export const copyToClipboard = (hash: string): boolean => {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return false;
  }
  const url = window.location;
  url.hash = hash;

  try {
    navigator.clipboard.writeText(url);
  } catch (err) {
    return false;
  }
  return true;
};

export default function Card({
  children,
  description,
  headingSize = 'md',
  id,
  name,
  toggle,
  stacked = false,
  showHeading = true,
}: Props): Node {
  const slugifiedId = id ?? slugify(name);

  return (
    <Box>
      {showHeading && (
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              scrollMarginTop: 60,
            },
          }}
          id={slugifiedId}
          data-anchor
          marginBottom={description ? 2 : 4}
        >
          <Flex alignItems="center" gap={2}>
            <Heading size={headingSize}>{name}</Heading>
            <Tooltip inline text="Copy link">
              <IconButton
                accessibilityLabel={`Copy link to ${name}`}
                icon="link"
                onClick={() => {
                  copyToClipboard(slugifiedId);
                }}
                size="xs"
                iconColor="darkGray"
              />
            </Tooltip>

            {toggle}
          </Flex>
        </Box>
      )}
      <Box marginStart={-2} marginEnd={-2} display="flex" direction={stacked ? 'column' : 'row'}>
        <Box paddingX={2} column={12} color="white">
          {description && (
            <Box marginBottom={8} maxWidth={572}>
              <Markdown text={description} />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
