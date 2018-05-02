// @flow
import * as React from 'react';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

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
      },
      {
        name: 'bold',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'children',
        type: 'React.Node',
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
        description:
          'Truncate the text to a single line. Add the title attribute if `<Text>` only contains text.',
        defaultValue: false,
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    description="
    You can apply the following to adjust the positioning of text within wrapper elements.
  "
    name="Alignment"
    defaultCode={`
<Box maxWidth="8em">
<Text align="left">Left (default)</Text>
<Text align="right">Right</Text>
<Text align="center">Center</Text>
<Text align="justify">Justify</Text>
</Box>`}
  />
);

card(
  <Example
    description={`
    The Text component allows you to specifiy whether you want \`block\` or \`inline\` text.
  `}
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
</Box>`}
  />
);

card(
  <Example
    description="
    You can specify which color you want for your text.
  "
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
</Box>`}
  />
);

card(
  <Example
    description="
    Gestalt provides utility options to deal with text overflow.
  "
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
</Box>`}
  />
);
card(
  <Example
    description={`
    You can apply the following \`size\` options to define the size of the text.
  `}
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
</Box>`}
  />
);
card(
  <Example
    description="
    There are multiple styles such as bold and italic that we can
    attach to the Text component.
  "
    name="Styles"
    defaultCode={`
<Box>
<Box marginBottom={2}>
  <Text bold>Bold</Text>
</Box>
<Box marginBottom={2}>
  <Text italic>Italic</Text>
</Box>
</Box>`}
  />
);

export default () => <CardPage cards={cards} />;
