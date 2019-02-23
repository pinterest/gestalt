// @flow
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Text"
    description="The Text component should be used for all text on the page."
  />
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
        name: 'bold',
        type: 'boolean',
        defaultValue: false,
        href: 'styles',
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
        name: 'leading',
        type: `"short" | "tall"`,
        description: `short: line-height 1.2, tall: line-height 1.5, default: browser determines line-height based on language`,
      },
      {
        name: 'italic',
        type: 'boolean',
        defaultValue: false,
        href: 'styles',
      },
      {
        name: 'overflow',
        type: `"normal" | "breakWord"`,
        defaultValue: 'breakWord',
        href: 'overflow',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 12px, sm: 14px, md: 16px, lg: 18px, xl: 21px`,
        defaultValue: 'md',
        href: 'size',
        responsive: true,
      },
      {
        name: 'truncate',
        type: 'boolean',
        description:
          'Truncate the text to a single line. Add the title attribute if `<Text>` only contains text.',
        href: 'overflow',
        defaultValue: false,
      },
    ]}
  />
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
  />
);

card(
  <Example
    description={`
    The Text component allows you to specifiy whether you want \`block\` or \`inline\` text.
  `}
    id="inline"
    name="Block vs inline"
    defaultCode={`
<Box>
  <Box marginBottom={2}>
    <Text>Some content in a default block element. (default)</Text>
  </Box>
  <Box marginBottom={2}>
    <Text inline>Inline text with the inline prop.</Text>
    {' '}
    <Text inline>More inline text.</Text>
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description="You can specify which color you want for your text."
    id="color"
    name="Colors"
    defaultCode={`
<Box>
  <Box color="darkGray" marginBottom={2}>
    <Text color="white">White</Text>
  </Box>
  <Box marginBottom={2}>
    <Text color="gray">Gray</Text>
  </Box>
  <Box marginBottom={2}>
    <Text color="darkGray">Dark Gray (default)</Text>
  </Box>
  <Box marginBottom={2}>
    <Text color="blue">Blue</Text>
  </Box>
  <Box marginBottom={2}>
    <Text color="red">Red</Text>
  </Box>
</Box>
`}
  />
);

card(
  <Example
    description="Gestalt provides utility options to deal with text overflow."
    id="overflow"
    name="Overflow"
    defaultCode={`
<Box maxWidth={240}>
  <Box marginBottom={2}>
    <Text bold>normal:</Text>
    <Text overflow="normal" leading="tall">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉&#39;
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text bold>breakWord:</Text>
    <Text leading="tall">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text bold>truncate:</Text>
    <Text truncate leading="tall">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
    </Text>
  </Box>
</Box>
`}
  />
);
card(
  <Example
    description={`
    You can apply \`size\` options to define the size of the text.
  `}
    id="size"
    name="Sizes"
    defaultCode={`
<Box>
  <Box marginBottom={2}>
    <Text inline size="xs">
      {'Extra small'}
    </Text>{' '}
    <span lang="ja">
      <Text inline size="xs">
        こんにちは
      </Text>
    </span>
  </Box>
  <Box marginBottom={2}>
    <Text inline size="sm">
      {'Small'}
    </Text>{' '}
    <span lang="ja">
      <Text inline size="sm">
        こんにちは
      </Text>
    </span>
  </Box>
  <Box marginBottom={2}>
    <Text inline size="md">
      {'Medium (default size)'}
    </Text>{' '}
    <span lang="ja">
      <Text inline size="md">
        こんにちは
      </Text>
    </span>
  </Box>
  <Box marginBottom={2}>
    <Text inline size="lg">
      {'Large'}
    </Text>{' '}
    <span lang="ja">
      <Text inline size="lg">
        こんにちは
      </Text>
    </span>
  </Box>
  <Box marginBottom={2}>
    <Text inline size="xl">
      {'Extra Large'}
    </Text>{' '}
    <span lang="ja">
      <Text inline size="xl">
        こんにちは
      </Text>
    </span>
  </Box>
</Box>
`}
  />
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
    <Text bold>Bold</Text>
  </Box>
  <Box marginBottom={2}>
    <Text italic>Italic</Text>
  </Box>
</Box>
`}
  />
);

export default cards;
