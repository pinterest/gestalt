// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, IconButton } from 'gestalt';
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
    <React.Fragment>
      {showHeading && (
        <Heading size={headingSize}>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                scrollMarginTop: 60,
              },
            }}
            id={slugifiedId}
            data-anchor
          >
            <Flex alignItems="baseline" gap={2}>
              <Box>{name}</Box>

              <IconButton
                dangerouslySetSvgPath={{
                  __path:
                    'M21.001 7.241l-4.053 4.052-1.06-1.06.672-.672a1.5 1.5 0 10-2.121-2.121l-.671.672-1.061-1.06L16.759 3l4.242 4.241zm-9.708 9.708l-4.052 4.052-4.242-4.241 4.053-4.053 1.059 1.06-.671.672a1.5 1.5 0 002.121 2.121l.671-.672 1.061 1.061zM14.639.879l-4.053 4.052a3 3 0 000 4.242l1.061 1.06-1.415 1.414-1.06-1.061a3 3 0 00-4.241 0L.879 14.638a2.998 2.998 0 000 4.242l4.241 4.242a3 3 0 004.241 0l4.053-4.052a3 3 0 000-4.242l-1.06-1.061 1.414-1.413 1.06 1.06a3 3 0 004.241 0l4.052-4.052a2.998 2.998 0 000-4.242L18.88.879a2.997 2.997 0 00-4.241 0z',
                }}
                accessibilityLabel={`${name} - Anchor tag`}
                onClick={() => {
                  copyToClipboard(slugifiedId);
                }}
                size="sm"
                href={`#${slugifiedId}`}
                role="link"
              />
              {toggle}
            </Flex>
          </Box>
        </Heading>
      )}
      <Box marginStart={-2} marginEnd={-2} display="flex" direction={stacked ? 'column' : 'row'}>
        <Box marginTop={2} paddingX={2} column={12} color="white">
          {description && (
            <Box marginBottom={4} maxWidth={572}>
              <Markdown text={description} />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </React.Fragment>
  );
}
