// @flow strict
import { type Node, Children } from 'react';
import { Badge, Box, Flex, Heading, Tooltip } from 'gestalt';
import slugify from 'slugify';
import { copyToClipboard } from './Card.js';
import Markdown from './Markdown.js';
import CopyLinkButton from './buttons/CopyLinkButton.js';

export const MAX_WIDTH = 572;

type Props = {|
  badge?: 'beta' | 'alpha',
  children?: Node,
  columns?: 1 | 2,
  description?: string,
  title?: string,
  marginBottom?: 'default' | 'compact',
|};

function MainSectionSubsection({
  badge,
  children,
  columns = 1,
  description,
  title,
  marginBottom = 'default',
}: Props): Node {
  const slugifiedId = slugify(title || '');
  const arrayChildren = Children.toArray<Node>(children);

  let defaultBottomMargin = title || description ? 8 : 0;

  // if we're rendering from MDX, decrease the bottom margin
  if (marginBottom === 'compact') {
    defaultBottomMargin = 5;
  }

  return (
    <Box marginTop={4}>
      <Box marginBottom={defaultBottomMargin}>
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
            <Flex
              alignItems="center"
              gap={{
                row: 2,
                column: 0,
              }}
            >
              <Heading size="400">{title}</Heading>
              {badge ? (
                <Tooltip
                  inline
                  text={
                    badge === 'beta'
                      ? 'This tool is in beta. We are still working on it! Have feedback? Reach out to us on Slack #gestalt-eng-web!'
                      : 'This tool is under development. More components will be supported in the future! The team is currently working on it.'
                  }
                >
                  <Badge text={badge === 'beta' ? 'Beta' : 'Alpha'} position="middle" />
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
          <Box maxWidth={MAX_WIDTH} marginTop={title ? 2 : 0} color="default">
            <Markdown text={description} />
          </Box>
        )}
      </Box>

      {arrayChildren &&
        (columns === 1 ? (
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 4,
            }}
          >
            {arrayChildren.map((child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Flex.Item flex="grow" key={index}>
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
