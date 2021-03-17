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
    description="Status is an indicator with an icon that provides information to a user."
    defaultCode={`
<Flex>
  <Status type='ok' title="OK" subtext="Updated 2 days ago" />
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
        type: `'unstarted' | 'inProgress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning'`,
        required: true,
        description: 'The type of status to display',
      },
      {
        name: 'title',
        type: 'string',
        required: true,
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
    name="Localization"
    description={`Be sure to localize the \`title\` and \`subtext\` props. Note that localization can lengthen text by 20 to 30 percent.`}
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
<Flex direction="column" gap={4}>
  <Status type='unstarted' title='Unstarted' />
  <Status type='inProgress' title='In progress' />
  <Status type='halted' title='Halted' />
  <Status type='ok' title='OK' />
  <Status type='canceled' title='Canceled' />
  <Status type='warning' title='Warning' />
  <Status type='problem' title='Problem' />
</Flex>
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
