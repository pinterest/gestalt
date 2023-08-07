// @flow strict
import { Children, type Node } from 'react';
import slugify from 'slugify';
import { Badge, Box, Flex, Heading } from 'gestalt';
import CopyLinkButton from './buttons/CopyLinkButton.js';
import { copyToClipboard } from './Card.js';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts.js';
import Markdown from './Markdown.js';

type Props = {|
  badge?: 'alpha' | 'experimental',
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
                <Badge
                  text={badge === 'experimental' ? 'Experimental' : 'Alpha'}
                  position="middle"
                  tooltip={
                    badge === 'experimental'
                      ? { text: 'Experimental feature.  It could be removed in the future.' }
                      : { text: 'Alpha development state.' }
                  }
                />
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
          <Box maxWidth={DOCS_COPY_MAX_WIDTH_PX} marginTop={title ? 2 : 0} color="default">
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
