// @flow strict
import { type Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Text"
    description="The Text component should be used for all text on the page."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'align',
        type: `"start" | "end" | "center" | "justify" | "forceLeft" | "forceRight"`,
        defaultValue: 'start',
        href: 'align',
        description:
          '`"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text.',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white"`,
        defaultValue: 'darkGray',
        href: 'color',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
        href: 'inline',
      },
      {
        name: 'italic',
        type: 'boolean',
        defaultValue: false,
        href: 'styles',
      },
      {
        name: 'lineClamp',
        type: 'number',
        description:
          'Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers.',
        href: 'overflow',
      },
      {
        name: 'overflow',
        type: `"normal" | "breakWord" | "noWrap"`,
        defaultValue: 'breakWord',
        href: 'overflow',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        description: `sm: 12px, md: 14px, lg: 16px`,
        defaultValue: 'lg',
        href: 'size',
      },
      {
        name: 'underline',
        type: 'boolean',
        defaultValue: false,
        href: 'styles',
      },
      {
        name: 'weight',
        type: `"bold" | "normal"`,
        defaultValue: 'normal',
        href: 'styles',
      },
    ]}
  />,
);

card(
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
  />,
);

card(
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
  />,
);

card(
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
  />,
);

card(
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
  />,
);
card(
  <Example
    description={`
    You can apply \`size\` options to define the size of the text.
  `}
    id="size"
    name="Sizes"
    defaultCode={`
<Flex alignItems="start" direction="column" gap={2}>
  <Flex alignItems="center" gap={2}>
    <Text inline size="sm">Small</Text>
    <span lang="ja">
      <Text inline size="sm">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="md">Medium</Text>
    <span lang="ja">
      <Text inline size="md">
        こんにちは
      </Text>
    </span>
  </Flex>

  <Flex alignItems="center" gap={2}>
    <Text inline size="lg">Large (default size)</Text>
    <span lang="ja">
      <Text inline size="lg">
        こんにちは
      </Text>
    </span>
  </Flex>
</Flex>
`}
  />,
);

card(
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
  />,
);

export default function TextPage(): Node {
  return <CardPage cards={cards} page="Text" />;
}
