// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import CombinationNew from './components/CombinationNew.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<PageHeader name="Component Name" description="Brief description of this component" />);

card(
  <MainSection name="Examples" showHeading={false}>
    <MainSection.Subsection>
      <MainSection.Card
        title="Optional Card Title"
        description={`
           Optional description about this \`Example\`
        `}
        cardSize="lg"
        defaultCode={`
Code for this example goes here
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

// Specifying Component gives auto warnings about missing props
card(
  <PropTable
    Component={Box}
    props={[
      {
        name: 'dummyProp',
        type: 'dummyType',
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
        href: '[Name of the section demonstrating this prop]',
      },
    ]}
  />,
);

card(
  <MainSection name="Best Practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`Description about what you should Do. Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")`}
        defaultCode={`
Code for this example goes here
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`
          What not to do goes \`here\`. Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")
        `}
        defaultCode={`
Code for this example goes here
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Accessibility"
    description={`\`Accessibility\` guidelines go here. Can also include SubSections and Cards for detailed examples (see Box). Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")`}
  />,
);

card(
  <MainSection
    name="Localization"
    description={`\`Localization\` guidelines go here. Can be examples in another language or truncation examples. Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")`}
      title="Variant 1"
    >
      <MainSection.Card
        cardSize="md"
        title="example title"
        defaultCode={`
Code for this example goes here
`}
      />
      <MainSection.Card
        cardSize="md"
        title="example title"
        defaultCode={`
Code for this example goes here
`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style. Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")`}
      title="Variant using CombinationNew"
    >
      <CombinationNew
        color={[
          'red',
          'white',
          'lightGray',
          'gray',
          'darkGray',
          'green',
          'pine',
          'olive',
          'blue',
          'navy',
          'midnight',
          'purple',
          'orchid',
          'eggplant',
          'maroon',
          'watermelon',
          'orange',
          'transparent',
          'transparentDarkGray',
          'lightWash',
          'darkWash',
        ]}
      >
        {(props) => <Box width={60} height={60} rounding="circle" {...props} />}
      </CombinationNew>
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Writing"
    description={`Details about \`Writing Guidelines\` go here. Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")`}
  />,
);

card(
  <MainSection
    name="Related"
    description={`
      [Component Name](/component-name)

      - Details about why to use this over current component.

      [Component Name](/component-name)

      - Details about why to use this over current component.

      Using backticks instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")
    `}
  />,
);

export default cards;
