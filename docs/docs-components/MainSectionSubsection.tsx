import { Children, ReactNode } from 'react';
import slugify from 'slugify';
import { Badge, Box, Flex, Heading } from 'gestalt';
import CopyLinkButton from './buttons/CopyLinkButton';
import { copyToClipboard } from './Card';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  badge?: 'alpha' | 'experimental';
  children?: ReactNode;
  columns?: 1 | 2;
  description?: string;
  title?: string;
  marginBottom?: 'default' | 'compact';
};

function MainSectionSubsection({
  badge,
  children,
  columns = 1,
  description,
  title,
  marginBottom = 'default',
}: Props) {
  const slugifiedId = slugify(title || '');
  // @ts-expect-error - TS2558 - Expected 0 type arguments, but got 1.
  const arrayChildren = Children.toArray<ReactNode>(children);

  let defaultBottomMargin = title || description ? 8 : 0;

  // if we're rendering from MDX, decrease the bottom margin
  if (marginBottom === 'compact') {
    defaultBottomMargin = 5;
  }

  return (
    <Box marginTop={4}>
      {/* @ts-expect-error - TS2322 - Type 'number' is not assignable to type '"auto" | SignedUpTo12 | undefined'. */}
      <Box marginBottom={defaultBottomMargin}>
        {title && (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                scrollMarginTop: 90,
              },
            }}
            data-anchor
            id={slugifiedId}
            maxWidth={DOCS_COPY_MAX_WIDTH_PX}
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
                  position="middle"
                  text={badge === 'experimental' ? 'Experimental' : 'Alpha'}
                  // @ts-expect-error - TS2322 - Type '{ position: "middle"; text: string; tooltip: { text: string; }; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
                  tooltip={
                    badge === 'experimental'
                      ? {
                          text: 'Experimental feature.  It could be removed in the future.',
                        }
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
          <Box color="default" marginTop={title ? 2 : 0} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
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
              <Flex.Item key={index} flex="grow">
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
