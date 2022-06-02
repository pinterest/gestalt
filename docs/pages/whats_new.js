// @flow strict
import { type Node, useState } from 'react';
import { Badge, Box, Flex, Heading, Image, Mask, RadioGroup } from 'gestalt';
import Markdown from '../components/Markdown.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import MainSection from '../components/MainSection.js';

// $FlowExpectedError[untyped-import]
import blogPosts from './BlogPosts.json';

type PostProps = {|
  imageSrc?: string,
  imageAltText?: string,
  title: string,
  audience: Array<string>,
  content: string,
|};
function PostLayout({ imageSrc, imageAltText, title, audience, content }: PostProps): Node {
  return (
    <Flex direction="column" gap={3}>
      {imageSrc && (
        <Box
          height="252px"
          maxWidth="420px"
          display="none"
          mdDisplay="block"
          marginBottom={4}
          lgMarginBottom={0}
          borderStyle="sm"
          rounding={2}
        >
          <Mask rounding={2} height="250px">
            <Image
              src={imageSrc}
              alt={imageAltText || ''}
              naturalHeight={674}
              naturalWidth={1200}
              fit="cover"
            />
          </Mask>
        </Box>
      )}
      <Flex direction="column" gap={2} maxWidth="600px">
        <Flex direction="column" gap={1}>
          <Heading size="400">{title}</Heading>
          <Flex gap={2}>
            {audience.includes('Design') && <Badge type="info" text="Design" />}
            {audience.includes('Engineering') && <Badge type="success" text="Engineering" />}
          </Flex>
        </Flex>
        <Markdown text={content} />
      </Flex>
    </Flex>
  );
}

export default function Blog(): Node {
  const [filter, setFilter] = useState('All');
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
        <RadioGroup.RadioButton
          size="sm"
          id="all"
          value="All"
          label="All"
          checked={filter === 'All'}
          onChange={() => {
            setFilter('All');
          }}
        />
        <RadioGroup.RadioButton
          id="design"
          value="Design"
          label="Design updates"
          checked={filter === 'Design'}
          onChange={() => {
            setFilter('Design');
          }}
          size="sm"
        />
        <RadioGroup.RadioButton
          id="eng"
          value="Engineering"
          label="Engineering updates"
          checked={filter === 'Engineering'}
          onChange={() => {
            setFilter('Engineering');
          }}
          size="sm"
        />
      </RadioGroup>
      {blogPosts.digests.map((digest, idx) => (
        <MainSection key={`digest-${idx}`} name={`Week of ${digest.week}`}>
          <Flex direction="column" gap={12}>
            {digest.posts.map(
              (post, index) =>
                (filter === 'All' || post.audience.includes(filter)) && (
                  <PostLayout key={`post-${index}`} {...post} />
                ),
            )}
          </Flex>
        </MainSection>
      ))}
    </Page>
  );
}
