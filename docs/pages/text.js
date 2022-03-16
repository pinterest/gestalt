// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import MainSection from '../components/MainSection.js';

export default function TextPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Alignment"
          description="Use this to adjust the positioning of text within wrapper elements."
        >
          <MainSection.Card
            defaultCode={`
<Flex direction="column" gap={2} width="100%">
  <Text align="start">Start (default)</Text>
  <Text align="end">End</Text>
  <Text align="center">Center</Text>
  <Text align="justify">Justify</Text>
  <Text align="forceLeft">Force left</Text>
  <Text align="forceRight">Force right</Text>
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Block vs. inline"
          description={`
          The Text component allows you to specify whether you want \`block\` or \`inline\` text.
        `}
        >
          <MainSection.Card
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
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Colors"
          description={`
        You can specify which color you want for your text. Most colors change in dark mode, but \`light\` and \`dark\` are available when no switch is desired.

        ⚠️ Note that the previous options ('red', 'white', 'lightGray', 'gray', 'darkGray', 'green', 'pine', 'olive', 'blue', 'navy', 'midnight', 'purple', 'orchid', 'eggplant', 'maroon', 'watermelon', 'orange') are still valid but will be deprecated soon.
        `}
        >
          <MainSection.Card
            defaultCode={`
  <Flex alignItems="start" direction="column" gap={3}>
    <Box color="inverse" padding={1}>
      <Text color="inverse" size="400">Inverse</Text>
    </Box>
    <Text color="subtle" size="400">Subtle</Text>
    <Text color="default" size="400">Default</Text>
    <Text color="success" size="400">Success</Text>
    <Text color="warning" size="400">Warning</Text>
    <Text color="error" size="400">Error</Text>
    <Text color="shopping" size="400">Shopping</Text>
    <Box color="primary" padding={1}>
      <Text color="light" size="400">Light</Text>
    </Box>
    <Box color="infoWeak" padding={1}>
      <Text color="dark" size="400">Dark</Text>
    </Box>
  </Flex>
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Overflow"
          description="Gestalt provides utility options to deal with text overflow."
        >
          <Example
            name="overflow"
            showHeading={false}
            defaultCode={`
<Box borderStyle="sm" maxWidth={200} padding={1}>
  <Flex gap={2} direction="column">

    <Text weight="bold">breakWord (default):</Text>
    <Text>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Text>

    <Text weight="bold">normal:</Text>
    <Text overflow="normal">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Text>

    <Text weight="bold">noWrap:</Text>
    <Text overflow="noWrap">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Text>

    <Text weight="bold">lineClamp:</Text>
    <Text lineClamp={2}>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Text>
  </Flex>
</Box>
        `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sizes"
          description={`
          You can apply \`size\` options to define the size of the text. These font sizes follow those available through our [Design Tokens](/design_tokens#Font-size). If your text needs to be a [semantic heading (H1-H6)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Heading](/heading) instead.

        `}
        >
          <MainSection.Card
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
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Styles"
          description="There are multiple styles, such as bold and italic, that we can attach to the Text component."
        >
          <MainSection.Card
            defaultCode={`
<Flex direction="column" gap={2}>
  <Text weight="bold">Bold</Text>
  <Text italic>Italic</Text>
  <Text underline>Underline</Text>
</Flex>
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Title"
          description={`The \`title\` attribute on a \`<div>\` can be used to show the full text of a truncated string on hover. That attribute is populated automatically when the text is truncated using \`lineClamp\`, as long as \`children\` is a string.
           If \`children\` is a \`React.Node\` (e.g. [when using Link](/link#Link-and-Text)), use the \`title\` prop to manually set the \`title\` attribute.`}
        >
          <MainSection.Card
            defaultCode={`
<Flex alignItems="center" direction="column" gap={2}>
  <Text size="200" weight="bold">
  Hover over the examples below for a few seconds to see the title text:
  </Text>

  <Box borderStyle="sm" maxWidth={400} padding={1}>
  <Flex direction="column" gap={3}>
  <Flex direction="column" gap={1}>
  <Text italic size="100">
  This title attribute is automatically added because lineClamp is used and children is a string.
  </Text>
  <Text lineClamp={1}>
  This is a long and Supercalifragilisticexpialidocious sentence.
  次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
  </Text>
  </Flex>

  <Flex direction="column" gap={1}>
  <Text italic size="100">
  This example uses lineClamp but has no title attribute, because children is a React.Node.
  </Text>
  <Text lineClamp={1}>
  <Link href="#">
  This is a long and Supercalifragilisticexpialidocious sentence.
  次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
  </Link>
  </Text>
  </Flex>

  <Flex direction="column" gap={1}>
  <Text italic size="100">
  This example uses lineClamp and children is a React.Node, but uses the title prop.
  </Text>
  <Text
  lineClamp={1}
  title="This is a long and Supercalifragilisticexpialidocious sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉"
  >
  <Link href="#">
  This is a long and Supercalifragilisticexpialidocious sentence.
  次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
  </Link>
  </Text>
  </Flex>
  </Flex>
  </Box>
</Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Text' }) },
  };
}
