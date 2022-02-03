// @flow strict
import type { Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Heading">
      <PageHeader name="Heading" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <Example
        id="sizes"
        name="Example: Sizes"
        description="These font sizes follow those available through our [Design Tokens](/design_tokens#Font-size)."
        defaultCode={`
<Flex gap={4} direction="column">
  <Heading size="100">Heading size 100</Heading>
  <span lang="ja">
    <Heading size="100">こんにちは</Heading>
  </span>

  <span>
    <Heading size="200">Heading size 200</Heading>
  </span>
  <span lang="ja">
    <Heading size="200">こんにちは</Heading>
  </span>

  <Heading size="300">Heading size 300</Heading>
  <span lang="ja">
    <Heading size="300">こんにちは</Heading>
  </span>

  <Heading size="400">Heading size 400</Heading>
  <span lang="ja">
    <Heading size="400">こんにちは</Heading>
  </span>

  <Heading size="500">Heading size 500</Heading>
  <span lang="ja">
    <Heading size="500">こんにちは</Heading>
  </span>

  <Heading size="600">Heading size 600</Heading>
  <span lang="ja">
    <Heading size="600">こんにちは</Heading>
  </span>
</Flex>
`}
      />
      <Example
        id="colors"
        name="Example: Colors"
        defaultCode={`
<Box>
  <Box margin={-1}>
    <Box color="gray" padding={1}>
      <Heading color="white" size="500">
        White
      </Heading>
    </Box>
  </Box>

  <Heading size="500">
    Dark gray (default)
  </Heading>

  <Heading color="gray" size="500">
    Gray
  </Heading>

  <Heading color="blue" size="500">
    Blue
  </Heading>

  <Heading color="red" size="500">
    Red
  </Heading>
</Box>
`}
      />
      <Example
        id="overflowTruncation"
        name="Example: Overflow & truncation"
        defaultCode={`
<Box maxWidth={240} marginTop={-2} marginBottom={-2}>
  <Box paddingY={2}>
    <Text>breakWord (default):</Text>
    <Heading size="400" overflow="breakWord" >
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>

  <Box paddingY={2}>
    <Text>normal:</Text>
    <Heading size="400" overflow="normal">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>

  <Box paddingY={2}>
    <Text>lineClamp:</Text>
    <Heading size="400" lineClamp={2}>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>
</Box>
`}
      />
      <Example
        id="align"
        name="Example: Alignment"
        defaultCode={`
<Box>
  <Heading align="start" size="400">Start-aligned heading (default)</Heading>
  <Heading align="end" size="400">End-aligned heading</Heading>
  <Heading align="center" size="400">Center-aligned heading</Heading>
  <Heading align="justify" size="400">Justify-aligned heading</Heading>
  <Heading align="forceLeft" size="400">Forced-left-aligned heading</Heading>
  <Heading align="forceRight" size="400">Forced-right-aligned heading</Heading>
</Box>
`}
      />
      <Example
        id="levels"
        description="
    For accessibility purposes, we allow you to override the heading level.

    We should have one level 1 per page &amp; levels should be appropriately nested. E.g. level 1 followed by level 2 &amp; level 2 followed by level 2 or level 3. We also allow headings without an accessibility level.
  "
        name="Example: Levels"
        defaultCode={`
<Box>
  <Heading size="500" accessibilityLevel={2}>
    Medium heading level 2
  </Heading>
  <Heading size="400" accessibilityLevel={3}>
    Small heading level 3
  </Heading>
  <Heading size="400" accessibilityLevel="none">
    Small heading without a level
  </Heading>
</Box>
`}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Heading' }) },
  };
}
