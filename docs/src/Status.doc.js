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
  />,
);

// Specifying Component gives auto warnings about missing props
card(
  <PropTable
    Component={Box}
    props={[
      {
        name: 'type',
        type: 'string',
        defaultValue: 'unstarted',
        description: '[Briefly describe the goal of this prop]',
        href: '[Name of the section demonstrating this prop]',
      },
      {
        name: 'accessibilityLabel',
        type: 'string',
        description: '[Briefly describe the goal of this prop]',
        href: '[Name of the section demonstrating this prop]',
      },
      {
        name: 'name',
        type: 'string',
        description: '[Briefly describe the goal of this prop]',
        href: '[Name of the section demonstrating this prop]',
      },
      {
        name: 'subText',
        type: 'string',
        description: '[Briefly describe the goal of this prop]',
        href: '[Name of the section demonstrating this prop]',
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Description about what you should Do. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)"
        defaultCode={`
<Status accessilbityLabel='Unstarted - Updated 2 days ago' type='unstarted'  name='Unstarted' subText='Updated 2 days ago' />
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`
          What not to do goes \`here\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)
        `}
        defaultCode={`
        <Status accessilbityLabel='Unstarted - Updated 2 days ago' type='unstarted'  name='Unstarted' />
`}
      />
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`
        Description about what you should Do. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)

        - You do not need code for these
        - You can instead use bulleted lists of Dos
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
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
      title="Variant name (sentence case)"
    >
      <MainSection.Card
        cardSize="md"
        title="Example title (optional)"
        defaultCode={`
Code for this example goes here
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Variant name (sentence case)"
    >
      <MainSection.Card
        cardSize="md"
        title="Example title (optional)"
        defaultCode={`
Code for this example goes here
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Writing"
    description={`Details about \`Writing Guidelines\` go here. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/). Can also use Do/Don't cards without any code (like Tooltip)`}
  />,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
      **[Status](/Status)**
      Details about why to use this over current component.

      **[Status](/Status)**
      Details about why to use this over current component.

    `}
    />
  </MainSection>,
);

export default cards;
