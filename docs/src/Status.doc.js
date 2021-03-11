// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Status"
    description="Brief description of this component"
    defaultCode={`
    <Flex gap={4}>
<Status type='unstarted' />
<Status type='in-progress' />
<Status type='halted' />
<Status type='ok' />
<Status type='problem' />
<Status type='warning' />
</Flex>
`}
    pilot
  />,
);

// Specifying Component gives auto warnings about missing props
card(
  <PropTable
    Component={Box}
    props={[
      {
        name: 'type',
        type: `'unstarted' | 'in-progress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning'`,
        defaultValue: 'unstarted',
        required: true,
        description: 'The type of status to display',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
        href: '[Name of the section demonstrating this prop]',
      },
      {
        name: 'name',
        type: 'string',
        description: 'A label to reinforce the meaning of the status icon',
      },
      {
        name: 'subtext',
        type: 'string',
        description: 'Additional contextual information around the status',
      },
    ]}
  />,
);

card(
  <MainSection
    name="Accessibility"
    description={`\`Accessibility\` guidelines go here. Can also include SubSections and Cards for detailed examples (see Box). Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
  />,
);

card(
  <MainSection
    name="Localization"
    description={`\`Localization\` guidelines go here. Can be examples in another language or truncation examples. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Text additions"
    >
      <MainSection.Card
        cardSize="md"
        title="Status name"
        defaultCode={`
        <Status type='ok' title='OK' />
`}
      />
      <MainSection.Card
        cardSize="md"
        title="Status subtext"
        defaultCode={`
        <Status type='warning' title='Warning' subtext='Updated 2 days ago' />
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
