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
        defaultCode={`
<Box maxWidth="8em">
  <Heading size="sm">Heading small</Heading>
  <span lang="ja">
    <Heading size="sm">こんにちは</Heading>
  </span>

  <span>
    <Heading size="md">Heading medium</Heading>
  </span>{' '}
  <span lang="ja">
    <Heading size="md">こんにちは</Heading>
  </span>

  <Heading size="lg">Heading large</Heading>
  <span lang="ja">
    <Heading size="lg">こんにちは</Heading>
  </span>
</Box>
`}
      />
      <Example
        id="colors"
        name="Example: Colors"
        defaultCode={`
<Box>
  <Box margin={-1}>
    <Box color="gray" padding={1}>
      <Heading color="white" size="md">
        White
      </Heading>
    </Box>
  </Box>

  <Heading size="md">
    Dark gray (default)
  </Heading>

  <Heading color="gray" size="md">
    Gray
  </Heading>

  <Heading color="blue" size="md">
    Blue
  </Heading>

  <Heading color="red" size="md">
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
    <Heading size="sm" overflow="breakWord" >
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>

  <Box paddingY={2}>
    <Text>normal:</Text>
    <Heading size="sm" overflow="normal">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>

  <Box paddingY={2}>
    <Text>lineClamp:</Text>
    <Heading size="sm" lineClamp={2}>
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
<Box maxWidth="24em">
  <Heading align="start" size="sm">Start-aligned heading (default)</Heading>
  <Heading align="end" size="sm">End-aligned heading</Heading>
  <Heading align="center" size="sm">Center-aligned heading</Heading>
  <Heading align="justify" size="sm">Justify-aligned heading</Heading>
  <Heading align="forceLeft" size="sm">Forced-left-aligned heading</Heading>
  <Heading align="forceRight" size="sm">Forced-right-aligned heading</Heading>
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
  <Heading size="md" accessibilityLevel={2}>
    Medium heading level 2
  </Heading>
  <Heading size="sm" accessibilityLevel={3}>
    Small heading level 3
  </Heading>
  <Heading size="sm" accessibilityLevel="none">
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
