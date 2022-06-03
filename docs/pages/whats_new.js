// @flow strict
import { type Node, useState } from 'react';
import { Badge, Box, Flex, Heading, Image, Mask, RadioGroup } from 'gestalt';
import MainSection from '../components/MainSection.js';
import Markdown from '../components/Markdown.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
// $FlowExpectedError[untyped-import]
import blogPosts from './BlogPosts.json';

const POST_WIDTH = '600px';

type PostProps = {|
  audience: Array<string>,
  content: string,
  imageAltText?: string,
  imageSrc?: string,
  title: string,
|};

function PostLayout({ audience, content, imageAltText, imageSrc, title }: PostProps): Node {
  return (
    <Flex direction="column" gap={4}>
      <Flex direction="column" gap={1}>
        <Heading size="400">{title}</Heading>
        <Flex gap={2}>
          {audience.includes('Design') && <Badge type="info" text="Design" />}
          {audience.includes('Engineering') && <Badge type="success" text="Engineering" />}
        </Flex>
      </Flex>

      {imageSrc && (
        <Box
          height="340px"
          maxWidth={POST_WIDTH}
          display="none"
          mdDisplay="block"
          marginBottom={4}
          lgMarginBottom={0}
          borderStyle="sm"
          rounding={2}
        >
          <Mask rounding={2} height="338px">
            <Image
              src={imageSrc}
              alt={imageAltText ?? ''}
              naturalHeight={900}
              naturalWidth={1600}
              fit="cover"
            />
          </Mask>
        </Box>
      )}
      <Flex maxWidth={POST_WIDTH}>
        <Markdown text={content} />
      </Flex>
    </Flex>
  );
}

export default function Blog(): Node {
  const [filter, setFilter] = useState<'All' | 'Design' | 'Engineering'>('All');

  return (
    <Page title="What's New Blog">
      <PageHeader
        name="What's New"
        description={`
    Follow along to learn about documentation updates, new components, events, and more!
    To get the full details for each version, view the [changelog in GitHub](https://github.com/pinterest/gestalt/blob/master/CHANGELOG.md).
    `}
        showSourceLink={false}
      />

      <RadioGroup id="filter" legend="Filter posts by" direction="row">
        {[
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
        ].map(({ label, value }) => (
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

      {blogPosts.digests.map((digest) => (
        <MainSection key={`digest-${digest.week}`} name={`Week of ${digest.week}`}>
          <Flex direction="column" gap={12}>
            {digest.posts.map(
              (post) =>
                (filter === 'All' || post.audience.includes(filter)) && (
                  <PostLayout key={`post-${post.title}`} {...post} />
                ),
            )}
          </Flex>
        </MainSection>
      ))}
    </Page>
  );
}
