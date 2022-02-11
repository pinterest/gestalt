// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function TextPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Text">
      <PageHeader name="Text" description={generatedDocGen?.description} />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <Example
        description="Use this to adjust the positioning of text within wrapper elements."
        id="align"
        name="Alignment"
        defaultCode={`
<Box maxWidth="16em">
  <Text align="start">Start (default)</Text>
  <Text align="end">End</Text>
  <Text align="center">Center</Text>
  <Text align="justify">Justify</Text>
  <Text align="forceLeft">Force left</Text>
  <Text align="forceRight">Force right</Text>
</Box>
`}
      />
      <Example
        description={`
    The Text component allows you to specify whether you want \`block\` or \`inline\` text.
  `}
        id="inline"
        name="Block vs inline"
        defaultCode={`
<Flex alignItems="start" direction="column" gap={4}>
  <Text>Some content in a default block element. (default)</Text>
  <Box>
    <Text inline>Inline text with the inline prop.</Text>
    {' '}
    <Text inline>More inline text.</Text>
  </Box>
</Flex>
`}
      />
      <Example
        description="You can specify which color you want for your text."
        id="color"
        name="Colors"
        defaultCode={`
<Flex alignItems="start" direction="column" gap={4}>
  <Box color="darkGray" padding={1}>
    <Text color="white">White</Text>
  </Box>
  <Text color="gray">Gray</Text>
  <Text color="darkGray">Dark Gray (default)</Text>
  <Text color="blue">Blue</Text>
  <Text color="red">Red</Text>
</Flex>
`}
      />
      <Example
        description="Gestalt provides utility options to deal with text overflow."
        id="overflow"
        name="Overflow"
        defaultCode={`
<Flex direction="column" gap={2} maxWidth={180}>
  <Text weight="bold">breakWord (default):</Text>
  <Text>
    This is a long and Supercalifragilisticexpialidocious sentence.
    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
  </Text>

  <Text weight="bold">normal:</Text>
  <Text overflow="normal">
    This is a long and Supercalifragilisticexpialidocious sentence.
    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉&#39;
  </Text>

  <Text weight="bold">noWrap:</Text>
  <Text overflow="noWrap">
    This is a long and Supercalifragilisticexpialidocious sentence.
  </Text>

  <Text weight="bold">lineClamp:</Text>
  <Text lineClamp={2}>
    This is a long and Supercalifragilisticexpialidocious sentence.
  </Text>
</Flex>
`}
      />
      <Example
        description={`
    You can apply \`size\` options to define the size of the text. These font sizes follow those available through our [Design Tokens](/design_tokens#Font-size). If your text needs to be a [semantic heading (H1-H6)](/https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Heading](/heading) instead.

  `}
        id="size"
        name="Sizes"
        defaultCode={`
<Flex alignItems="start" direction="column" gap={2}>
  <Flex alignItems="center" gap={2}>
    <Text inline size="100">Size 100</Text>
    <span lang="ja">
      <Text inline size="100">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="200">Size 200</Text>
    <span lang="ja">
      <Text inline size="200">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="300">Size 300 (default size)</Text>
    <span lang="ja">
      <Text inline size="300">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="400">Size 400</Text>
    <span lang="ja">
      <Text inline size="400">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="500">Size 500</Text>
    <span lang="ja">
      <Text inline size="500">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="600">Size 600</Text>
    <span lang="ja">
      <Text inline size="600">
        こんにちは
      </Text>
    </span>
  </Flex>
</Flex>
`}
      />
      <Example
        description="
    There are multiple styles, such as bold and italic, that we can
    attach to the Text component.
  "
        id="styles"
        name="Styles"
        defaultCode={`
<Flex direction="column" gap={2}>
  <Text weight="bold">Bold</Text>
  <Text italic>Italic</Text>
  <Text underline>Underline</Text>
</Flex>
`}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Text' }) },
  };
}
