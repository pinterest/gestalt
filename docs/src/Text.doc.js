// @flow
import * as React from 'react';
import { ns, card, md, PropTable, Example } from './cards';

ns('Text', `The Text component should be used for all text on the page.`);

card(
  <PropTable
    props={[
      {
        name: 'align',
        type: `"left" | "right" | "center" | "justify"`,
        defaultValue: 'left',
      },
      {
        name: 'bold',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white"`,
        defaultValue: 'darkGray',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'italic',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'overflow',
        type: `"normal" | "breakWord"`,
        defaultValue: 'breakWord',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 12px, sm: 14px, md: 16px, lg: 18px, xl: 21px`,
        defaultValue: 'md',
        responsive: true,
      },
      {
        name: 'truncate',
        type: 'boolean',
        defaultValue: false,
      },
    ]}
  />,
  { heading: false }
);

card(
  'Alignment',
  md`
    You can apply the following to adjust the positioning of text within wrapper elements.
  `,
  <Example
    defaultCode={`
<Box maxWidth="8em">
  <Text align="left">Left (default)</Text>
  <Text align="right">Right</Text>
  <Text align="center">Center</Text>
  <Text align="justify">Justify</Text>
</Box>`}
  />,
  {
    stacked: true,
  }
);

card(
  'Block vs inline',
  md`
    The Text component allows you to specifiy whether you want \`block\` or \`inline\` text.
  `,
  <Example
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
</Box>`}
  />,
  { stacked: true }
);

card(
  'Colors',
  md`
    You can specify which color you want for your text.
  `,
  <Example
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
</Box>`}
  />,
  { stacked: true }
);

card(
  'Overflow',
  md`
    Gestalt provides utility options to deal with text overflow.
  `,
  <Example
    defaultCode={`
<Box maxWidth={240}>
  <Box marginBottom={2}>
    <Text overflow="normal" leading="tall">
      <strong>normal:</strong>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text leading="tall">
      <strong>breakWord:</strong>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ
    </Text>
  </Box>
  <Box marginBottom={2}>
    <Text truncate leading="tall">
      <strong>truncate:</strong>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
      ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ
    </Text>
  </Box>
</Box>`}
  />,
  { stacked: true }
);
card(
  'Sizes',
  md`
    You can apply the following \`size\` options to define the size of the text.
  `,
  <Example
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
</Box>`}
  />,
  { stacked: true }
);
card(
  'Styles',
  md`
    There are multiple styles such as bold and italic that we can
    attach to the Text component.
  `,
  <Example
    defaultCode={`
<Box>
  <Box marginBottom={2}>
    <Text bold>Bold</Text>
  </Box>
  <Box marginBottom={2}>
    <Text italic>Italic</Text>
  </Box>
</Box>`}
  />,
  { stacked: true }
);
