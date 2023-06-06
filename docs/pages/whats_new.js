// @flow strict
import { type Node, useState } from 'react';
import { Badge, Box, Divider, Flex, Heading, Image, Mask, RadioGroup } from 'gestalt';
import MainSection from '../docs-components/MainSection.js';
import Markdown from '../docs-components/Markdown.js';
import Page from '../docs-components/Page.js';
import PageHeader from '../docs-components/PageHeader.js';
import blogPosts from './BlogPosts.json';

const POST_WIDTH_PX = 600;
const POST_IMAGE_HEIGHT_PX = 340;

const badges = {
  Design: <Badge key="design" type="info" text="Design" />,
  Engineering: <Badge key="engineering" type="success" text="Engineering" />,
};

export type Post = {|
  +title: string,
  +audience: $ReadOnlyArray<'Design' | 'Engineering'>,
  +imageSrc: string,
  +imageAltText: string,
  +content: string,
  imageColor?: string,
|};

function PostLayout({ audience, content, imageAltText, imageSrc, title, imageColor }: Post): Node {
  return (
    <Flex direction="column" gap={2} maxWidth={POST_WIDTH_PX}>
      <Flex direction="column" gap={1}>
        <Heading size="400">{title}</Heading>
        <Flex gap={2}>{audience.map((item) => badges[item])}</Flex>
      </Flex>

      {imageSrc && (
        <Box
          height={POST_IMAGE_HEIGHT_PX}
          maxWidth={POST_WIDTH_PX}
          display="none"
          mdDisplay="block"
          marginBottom={4}
          lgMarginBottom={0}
          borderStyle="sm"
          rounding={2}
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: imageColor ? `var(--color-${imageColor})` : 'white',
            },
          }}
        >
          <Mask rounding={2} height={POST_IMAGE_HEIGHT_PX - 2}>
            <Image
              src={imageSrc}
              alt={imageAltText ?? ''}
              naturalHeight={900}
              naturalWidth={1600}
              fit="contain"
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

export default function Blog(): Node {
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
        name="What's New"
        description={`
    Follow along to learn about documentation updates, new components, events, and more!
    To get the full details for each version, view the [changelog in GitHub](https://github.com/pinterest/gestalt/blob/master/CHANGELOG.md).
    `}
        type="guidelines"
      />

      <RadioGroup id="filter" legend="Filter posts by" direction="row">
        {radioButtons.map(({ label, value }) => (
          <RadioGroup.RadioButton
            checked={filter === value}
            id={label}
            key={value}
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
              name={week ? `Week of ${week}` : `Month of ${month ?? ''}`}
              description={summary}
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
