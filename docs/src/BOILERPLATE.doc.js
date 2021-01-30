// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import CombinationNew from './components/CombinationNew.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<PageHeader name="Component Name" description="Brief description of this cmp" />);

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
<Text>
Code goes here
</Text>
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
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'display',
        type: `"none" | "flex" | "block" | "inlineBlock" | "visuallyHidden"`,
        defaultValue: 'block',
        responsive: true,
      },
      {
        name: 'direction',
        type: `"row" | "column"`,
        defaultValue: 'row',
        responsive: true,
        description:
          'Establishes the main-axis, thus defining the direction flex items are placed in the flex container.',
      },
      {
        name: 'alignContent',
        type: `"start" | "end" | "center" | "between" | "around" | "evenly" | "stretch"`,
        defaultValue: 'stretch',
        description:
          "Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.",
      },
      {
        name: 'alignItems',
        type: `"start" | "end" | "center" | "baseline" | "stretch"`,
        defaultValue: 'stretch',
        description:
          'Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
        href: 'Flex-Layout',
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
        description="Description about what you should Do"
        defaultCode={`
<Text>
  Code goes here
</Text>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`
          What not to do goes \`here\`. Using back-tics instead of quotes allows you to use [Markdown]("https://www.markdownguide.org/")
        `}
        defaultCode={`
<Text>
  Code goes here
</Text>
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Accessibility"
    description={`\`Accessibility\` guidelines go here. Can also include SubSections and Cards for detailed examples (see Box)`}
  />,
);

card(
  <MainSection
    name="Localization and Inclusion"
    description={`\`Localization and Inclusion\` guidelines go here. Can be examples in another language or truncation examples`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection description={`Description of this \`variant\`.`} title="Variant 1">
      <MainSection.Card
        cardSize="md"
        title="example title"
        defaultCode={`<Text>
        Code goes here
        </Text>`}
      />
      <MainSection.Card
        cardSize="md"
        title="example title"
        defaultCode={`<Text>
        Code goes here
        </Text>`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style.`}
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

card(<MainSection name="Writing" description={`Details about \`Writing Guidelines\` go here.`} />);

card(
  <MainSection
    name="Related"
    description={`
      [Component Name](/component-name)

      - Details about why to use this over current cmp.

      [Component Name](/component-name)

      - Details about why to use this over current cmp.
    `}
  />,
);

export default cards;
