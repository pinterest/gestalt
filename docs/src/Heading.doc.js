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
    name="Heading"
    description={`
The \`Heading\` component allows you to show headings on the page & has a bigger line height than regular text.
`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLevel',
        type: '1 | 2 | 3 | 4 | 5 | 6',
        description: 'Allows you to override the default heading level',
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
        name: 'id',
        type: 'string',
      },
      {
        name: 'overflow',
        type: '"normal" | "breakWord"',
        defaultValue: 'breakWord',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 24px, sm: 36px, md: 48px, lg: 64px, xl: 96px`,
        responsive: true,
        default: 'md',
      },
      {
        name: 'truncate',
        type: 'boolean',
        defaultValue: false,
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    defaultCode={`
<Box>
<Heading size="xs">Heading extra small</Heading>
<span lang="ja">
  <Heading size="xs">こんにちは</Heading>
</span>
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
<Heading size="xl">Heading extra large</Heading>
<span lang="ja">
  <Heading size="xl">こんにちは</Heading>
</span>
</Box>
`}
  />
);

card(
  <Example
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

<Heading size="md">Dark gray (default)</Heading>
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
);

card(
  <Example
    name="Example: Overflow & truncation"
    defaultCode={`
<Box maxWidth={240} marginTop={-2} marginBottom={-2}>
<Box paddingY={2}>
  <Heading size="xs">
    This is a long and Supercalifragilisticexpialidocious sentence.
    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
  </Heading>
</Box>

<Box paddingY={2}>
  <Heading size="xs" truncate>
    This is a long and Supercalifragilisticexpialidocious sentence.
    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
  </Heading>
</Box>

<Box paddingY={2}>
  <Heading size="xs" overflow="normal">
    This is a long and Supercalifragilisticexpialidocious sentence.
    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
  </Heading>
</Box>
</Box>
`}
  />
);

card(
  <Example
    description="
    For accessibility purposes, we allow you to override the heading level.

    We should have one level 1 per page & levels should be appropriately nested. E.g. level 1 followed by level 2 & level 2 followed by level 2 or level 3.
  "
    name="Example: Levels"
    defaultCode={`
<Box>
<Heading size="sm" accessibilityLevel={2}>
  Small heading level 2
</Heading>
<Heading size="xs" accessibilityLevel={3}>
  Extra small heading level 3
</Heading>
</Box>
`}
  />
);

export default () => <CardPage cards={cards} />;
