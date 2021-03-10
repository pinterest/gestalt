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
    name="DataPoint"
    description="Brief description of this component"
    defaultCode={`
    <Flex gap={4} direction="column">
    <Flex gap={6}>
    <DataPoint title="Datapoint title" value="1.23M" />
    <DataPoint title="Datapoint title" value="1.23M" valuePercentChange={0} />
    <DataPoint title="Datapoint title" value="1.23M" valuePercentChange={-30} valuePercentChangeIconAccessibilityLabel="Arrow down" helperText="Datapoint helper text" infoIconAccessibilityLabel="Info icon" />
    <DataPoint title="Datapoint title" value="1.23M" valuePercentChange={30} valuePercentChangeIconAccessibilityLabel="Arrow up" helperText="Datapoint helper text" infoIconAccessibilityLabel="Info icon" />
</Flex>
<Flex gap={6}>
<DataPoint size="lg" title="Datapoint title" value="1.23M" />
<DataPoint size="lg" title="Datapoint title" value="1.23M" valuePercentChange={0} />
<DataPoint size="lg" title="Datapoint title" value="1.23M" valuePercentChange={-30} valuePercentChangeIconAccessibilityLabel="Arrow down" helperText="Datapoint helper text" infoIconAccessibilityLabel="Info icon" />
<DataPoint size="lg" title="Datapoint title" value="1.23M" valuePercentChange={30} valuePercentChangeIconAccessibilityLabel="Arrow up" helperText="Datapoint helper text" infoIconAccessibilityLabel="Info icon" />
</Flex>
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
        name: 'valuePercentChangeIconAccessibilityLabel',
        type: 'string',
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
      },
      {
        name: 'infoIconAccessibilityLabel',
        type: 'string',
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
      },
      {
        name: 'title',
        type: 'string',
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
      },
      {
        name: 'size',
        type: `'sm' | 'lg'`,
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
      },
      {
        name: 'value',
        type: 'string',
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
      },
      {
        name: 'valuePercentChange',
        type: 'number',
        defaultValue: 'dummyDefault',
        description: '[Briefly describe the goal of this prop]',
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

    <MainSection.Subsection
      description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Variant using CombinationNew"
    />
  </MainSection>,
);

export default cards;
