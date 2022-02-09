// @flow strict
import type { Node } from 'react';

import { Children } from 'react';
import { Badge, Box, Flex, Heading, Tooltip } from 'gestalt';
import slugify from 'slugify';
import CopyLinkButton from './buttons/CopyLinkButton.js';
import Markdown from './Markdown.js';
import { copyToClipboard } from './Card.js';

export const MAX_WIDTH = 572;

type Props = {|
  badge?: 'beta' | 'alpha',
  children?: Node,
  columns?: 1 | 2,
  description?: string,
  title?: string,
|};

function MainSectionSubsection({ badge, children, columns = 1, description, title }: Props): Node {
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
              <Heading size="sm">{title}</Heading>
              {badge ? (
                <Tooltip
                  inline
                  text={
                    badge === 'beta'
                      ? 'This tool is in beta. We are still working on it! Have feedback? Reach out to us on Slack #gestalt-web!'
                      : 'This tool is under development. More components will be supported in the future! The team is currently working on it.'
                  }
                >
                  <Badge text={badge === 'beta' ? 'Beta' : 'Alpha'} position="top" />
                </Tooltip>
              ) : null}
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
          <Box maxWidth={MAX_WIDTH} marginTop={title ? 2 : 0} color="white">
            <Markdown text={description} />
          </Box>
        )}
      </Box>

      {arrayChildren &&
        (columns === 1 ? (
          <Flex direction="column" gap={4}>
            {arrayChildren.map((child, idx) => (
              <Flex.Item flex="grow" key={idx}>
                {child}
              </Flex.Item>
            ))}
          </Flex>
        ) : (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                display: 'grid',
                gridTemplateColumns: 'repeat( auto-fit, minmax(362px, 1fr) )',
                columnGap: '24px',
              },
            }}
          >
            {arrayChildren}
          </Box>
        ))}
    </Box>
  );
}

export default MainSectionSubsection;
