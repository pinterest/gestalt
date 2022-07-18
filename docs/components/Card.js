// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Tooltip, Badge } from 'gestalt';
import slugify from 'slugify';
import Markdown from './Markdown.js';
import CopyLinkButton from './buttons/CopyLinkButton.js';

type Props = {|
  children?: Node,
  badge?: {| text: string, tooltipText: string |},
  description?: string,
  headingSize?: '400' | '500',
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
  badge,
  description,
  headingSize = '500',
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
            {badge ? (
              <Tooltip inline text={badge.tooltipText}>
                <Badge text={badge.text} position="middle" />
              </Tooltip>
            ) : null}
            <CopyLinkButton
              name={name}
              onClick={() => {
                copyToClipboard(slugifiedId);
              }}
            />

            {toggle}
          </Flex>
        </Box>
      )}

      <Box marginStart={-2} marginEnd={-2} display="flex" direction={stacked ? 'column' : 'row'}>
        <Box paddingX={2} column={12} color="default">
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
