// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Badge, Box, Divider, Flex, Heading, Image, Mask, RadioGroup } from 'gestalt';
import { TOKEN_COLOR_WHITE_MOCHIMALIST_0 } from 'gestalt-design-tokens';
import blogPosts from './BlogPosts.json';
import MainSection from '../docs-components/MainSection';
import Markdown from '../docs-components/Markdown';
import Page from '../docs-components/Page';
import PageHeader from '../docs-components/PageHeader';

const POST_WIDTH_PX = 600;
const POST_IMAGE_HEIGHT_PX = 340;

const badges = {
  Design: <Badge key="design" text="Design" type="info" />,
  Engineering: <Badge key="engineering" text="Engineering" type="success" />,
};

export type Post = {
  +title: string,
  +audience: $ReadOnlyArray<'Design' | 'Engineering'>,
  +imageSrc: string,
  +imageAltText: string,
  +content: string,
  imageColor?: string,
};

function PostLayout({
  audience,
  content,
  imageAltText,
  imageSrc,
  title,
  imageColor,
}: Post): ReactNode {
  return (
    <Flex direction="column" gap={2} maxWidth={POST_WIDTH_PX}>
      <Flex direction="column" gap={1}>
        <Heading size="400">{title}</Heading>
        <Flex gap={2}>{audience.map((item) => badges[item])}</Flex>
      </Flex>

      {imageSrc && (
        <Box
          borderStyle="sm"
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: imageColor || TOKEN_COLOR_WHITE_MOCHIMALIST_0,
            },
          }}
          display="none"
          height={POST_IMAGE_HEIGHT_PX}
          lgMarginBottom={0}
          marginBottom={4}
          maxWidth={POST_WIDTH_PX}
          mdDisplay="block"
          rounding={2}
        >
          <Mask height={POST_IMAGE_HEIGHT_PX - 2} rounding={2}>
            <Image
              alt={imageAltText ?? ''}
              fit="contain"
              naturalHeight={900}
              naturalWidth={1600}
              src={imageSrc}
            />
          </Mask>
        </Box>
      )}
      <Flex>
        <Markdown text={content} />
      </Flex>
    </Flex>
  );
}

const radioButtons = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Design updates',
    value: 'Design',
  },
  {
    label: 'Engineering updates',
    value: 'Engineering',
  },
];

export default function Blog(): ReactNode {
  const [filter, setFilter] = useState<'All' | 'Design' | 'Engineering'>('All');

  // Get all digests across years
  // $FlowFixMe[missing-local-annot]
  const allDigests = blogPosts.reduce((acc, { digests }) => [...acc, ...digests], []);

  // We don't want to show empty digests, so remove if no posts for the current filter
  const filteredDigests = allDigests
    .map((digest) =>
      digest.posts.some(({ audience }) => filter === 'All' || audience.includes(filter))
        ? digest
        : null,
    )
    .filter(Boolean);

  return (
    <Page title="What's New Blog">
      <PageHeader
        description={`
    Follow along to learn about documentation updates, new components, events, and more!
    To get the full details for each version, view the [changelog in GitHub](https://github.com/pinterest/gestalt/blob/master/CHANGELOG.md).
    `}
        name="What's New"
        type="guidelines"
      />

      <RadioGroup direction="row" id="filter" legend="Filter posts by">
        {radioButtons.map(({ label, value }) => (
          <RadioGroup.RadioButton
            key={value}
            checked={filter === value}
            id={label}
            label={label}
            onChange={() => {
              setFilter(value);
            }}
            size="sm"
            value={value}
          />
        ))}
      </RadioGroup>

      <Flex direction="column" gap={12}>
        {filteredDigests.map(({ month, week, posts, summary }, i) => (
          <Flex key={`digest-${week ?? month ?? ''}`} direction="column" gap={12}>
            {i > 0 && <Divider />}

            <MainSection
              description={summary}
              name={week ? `Week of ${week}` : `Month of ${month ?? ''}`}
            >
              <Flex direction="column" gap={8}>
                {posts.map(
                  (post) =>
                    (filter === 'All' || post.audience.includes(filter)) && (
                      <PostLayout key={`post-${post.title}`} {...post} />
                    ),
                )}
              </Flex>
            </MainSection>
          </Flex>
        ))}
      </Flex>
    </Page>
  );
}
