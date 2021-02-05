// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

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
        type: `"left" | "right" | "center" | "justify"`,
        defaultValue: 'left',
        href: 'align',
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
        name: 'truncate',
        type: 'boolean',
        description:
          'Truncate the text to a single line. Add the title attribute if `<Text>` only contains text.',
        href: 'overflow',
        defaultValue: false,
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
<Box maxWidth="8em">
  <Text align="left">Left (default)</Text>
  <Text align="right">Right</Text>
  <Text align="center">Center</Text>
  <Text align="justify">Justify</Text>
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
  <Box color="darkGray">
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
<Box maxWidth={180}>
  <Box marginBottom={2}>
    <Text weight="bold">normal:</Text>
    <Text overflow="normal">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉&#39;
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text weight="bold">breakWord:</Text>
    <Text>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text weight="bold">noWrap:</Text>
    <Text overflow="noWrap">
      This is a long and Supercalifragilisticexpialidocious sentence.
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text weight="bold">truncate:</Text>
    <Text truncate>
      This is a long and Supercalifragilisticexpialidocious sentence.
    </Text>
  </Box>
</Box>
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
<Box>
  <Box marginBottom={2}>
    <Text weight="bold">Bold</Text>
  </Box>
  <Box marginBottom={2}>
    <Text italic>Italic</Text>
  </Box>
  <Box marginBottom={2}>
    <Text underline>Underline</Text>
  </Box>
</Box>
`}
  />,
);

export default cards;
