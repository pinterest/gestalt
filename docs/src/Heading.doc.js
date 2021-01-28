// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Heading"
    description={`
The \`Heading\` component allows you to show headings on the page & has a bigger line height than regular text.
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLevel',
        type: '1 | 2 | 3 | 4 | 5 | 6',
        description: 'Allows you to override the default heading level',
        href: 'levels',
      },
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
        href: 'colors',
      },
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'overflow',
        type: '"normal" | "breakWord"',
        defaultValue: 'breakWord',
        href: 'overflowTruncation',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        description: `sm: 20px, md: 28px, lg: 36px`,
        defaultValue: 'lg',
        href: 'sizes',
      },
      {
        name: 'truncate',
        type: 'boolean',
        defaultValue: false,
        href: 'overflowTruncation',
      },
    ]}
  />,
);

card(
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
  />,
);

card(
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
  />,
);

card(
  <Example
    id="overflowTruncation"
    name="Example: Overflow & truncation"
    defaultCode={`
<Box maxWidth={240} marginTop={-2} marginBottom={-2}>
  <Box paddingY={2}>
    <Heading size="sm">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>

  <Box paddingY={2}>
    <Heading size="sm" truncate>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>

  <Box paddingY={2}>
    <Heading size="sm" overflow="normal">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>
</Box>
`}
  />,
);

card(
  <Example
    id="align"
    name="Example: Alignment"
    defaultCode={`
<Box maxWidth="24em">
  <Heading align="left" size="sm">Left-aligned heading (default)</Heading>
  <Heading align="right" size="sm">Right-aligned heading</Heading>
  <Heading align="center" size="sm">Center-aligned heading</Heading>
  <Heading align="justify" size="sm">Justify-aligned heading</Heading>
</Box>
`}
  />,
);

card(
  <Example
    id="levels"
    description="
    For accessibility purposes, we allow you to override the heading level.

    We should have one level 1 per page & levels should be appropriately nested. E.g. level 1 followed by level 2 & level 2 followed by level 2 or level 3.
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
</Box>
`}
  />,
);

export default cards;
