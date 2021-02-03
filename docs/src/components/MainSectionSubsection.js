// @flow strict
import React, { Fragment, type Node } from 'react';
import { Box, Flex, Heading, IconButton } from 'gestalt';
import slugify from 'slugify';
import Markdown from './Markdown.js';

type Props = {|
  children: Node,
  description?: string,
  title?: string,
|};

const MainSectionSubsection = ({ children, description, title }: Props): Node => {
  const slugifiedId = slugify(title || '');
  return (
    <Fragment>
      {title && (
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              scrollMarginTop: 60,
            },
          }}
          id={slugifiedId}
          data-anchor
          paddingY={2}
        >
          <Flex alignItems="baseline" gap={2}>
            <Heading size="sm">{title}</Heading>
            <IconButton
              dangerouslySetSvgPath={{
                __path:
                  'M21.001 7.241l-4.053 4.052-1.06-1.06.672-.672a1.5 1.5 0 10-2.121-2.121l-.671.672-1.061-1.06L16.759 3l4.242 4.241zm-9.708 9.708l-4.052 4.052-4.242-4.241 4.053-4.053 1.059 1.06-.671.672a1.5 1.5 0 002.121 2.121l.671-.672 1.061 1.061zM14.639.879l-4.053 4.052a3 3 0 000 4.242l1.061 1.06-1.415 1.414-1.06-1.061a3 3 0 00-4.241 0L.879 14.638a2.998 2.998 0 000 4.242l4.241 4.242a3 3 0 004.241 0l4.053-4.052a3 3 0 000-4.242l-1.06-1.061 1.414-1.413 1.06 1.06a3 3 0 004.241 0l4.052-4.052a2.998 2.998 0 000-4.242L18.88.879a2.997 2.997 0 00-4.241 0z',
              }}
              accessibilityLabel={`${title} - Anchor tag`}
              size="xs"
              href={`#${slugifiedId}`}
              role="link"
            />
          </Flex>
        </Box>
      )}
      {description && (
        <Box width="80%" marginTop={-3}>
          <Markdown text={description} />
        </Box>
      )}
      <Flex wrap gap={4}>
        {children}
      </Flex>
    </Fragment>
  );
};

export default MainSectionSubsection;
