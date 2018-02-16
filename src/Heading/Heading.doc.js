// @flow
import * as React from 'react';
import Heading from './Heading';
import { ns, card, md, PropTable } from '../../.corkboard/cards';
import Box from '../Box/Box';

ns(
  'Heading',
  `
The \`Heading\` component allows you to show headings on the page & has a bigger line height than regular text.
`
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
        type: 'any',
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
  />,
  { heading: false }
);

card(
  'Sizes',
  md`
    Comes in a variety of sizes:

    ~~~html
    <Heading size="xs">
      {'Heading extra small'}
    </Heading>
    <Heading size="sm">
      {'Heading small'}
    </Heading>
    <Heading size="md">
      {'Heading medium'}
    </Heading>
    <Heading size="lg">
      {'Heading large'}
    </Heading>
    <Heading size="xl">
      {'Heading extra large'}
    </Heading>
    ~~~

    ~~~jsx
    xs: 24px
    sm: 36px
    md: 48px
    lg: 64px
    xl: 96px
    ~~~
  `,
  <Box>
    <Heading size="xs">Heading extra small</Heading>{' '}
    <span lang="ja">
      <Heading size="xs">こんにちは</Heading>
    </span>
    <Heading size="sm">Heading small</Heading>{' '}
    <span lang="ja">
      <Heading size="sm">こんにちは</Heading>
    </span>
    <span>
      <Heading size="md">Heading medium</Heading>
    </span>{' '}
    <span lang="ja">
      <Heading size="md">こんにちは</Heading>
    </span>
    <Heading size="lg">Heading large</Heading>{' '}
    <span lang="ja">
      <Heading size="lg">こんにちは</Heading>
    </span>
    <Heading size="xl">Heading extra large</Heading>{' '}
    <span lang="ja">
      <Heading size="xl">こんにちは</Heading>
    </span>
  </Box>
);

card(
  'Colors',
  md`
    And a variety of colors:

    ~~~html
    <Heading color="white">
      {'White'}
    </Heading>
    <Heading>
      {'Dark gray (default)'}
    </Heading>
    <Heading color="gray">
      {'Gray'}
    </Heading>
    <Heading color="blue">
      {'Blue'}
    </Heading>
    <Heading color="red">
      {'Red'}
    </Heading>
    ~~~
  `,
  <Box>
    <Box color="darkGray">
      <Heading color="white" size="md">
        {'White'}
      </Heading>
    </Box>
    <Heading size="md">Dark gray (default)</Heading>
    <Heading color="gray" size="md">
      {'Gray'}
    </Heading>
    <Heading color="blue" size="md">
      {'Blue'}
    </Heading>
    <Heading color="red" size="md">
      {'Red'}
    </Heading>
  </Box>
);

card(
  'Overflow',
  md`
    ~~~jsx
    <Heading>Default</Heading>
    <Heading truncate>Truncated</Heading>
    <Heading overflow="normal">Normal overflow</Heading>
    ~~~
  `,
  <Box maxWidth="16em">
    <Heading size="xs">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
    <br />
    <Heading size="xs" truncate>
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
    <Heading size="xs" overflow="normal">
      This is a long and Supercalifragilisticexpialidocious sentence.
      次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </Box>
);

card(
  'Levels',
  md`
    For accessibility purposes, we allow you to override the heading level.

    We should have one level 1 per page & levels should be appropriately nested. E.g. level 1 followed by level 2 & level 2 followed by level 2 or level 3.

    ~~~html
    <Heading size="sm" accessibilityLevel={2}>
      {'Small heading level 2'}
    </Heading>
    <Heading size="xs" accessibilityLevel={3}>
      {'Extra small heading level 3'}
    </Heading>
    ~~~
  `,
  <Box>
    <Heading size="sm" accessibilityLevel={2}>
      {'Small heading level 2'}
    </Heading>
    <Heading size="xs" accessibilityLevel={3}>
      {'Extra small heading level 3'}
    </Heading>
  </Box>
);
