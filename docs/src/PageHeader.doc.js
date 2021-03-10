// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import CombinationNew from './components/CombinationNew.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Page Header"
    description="Brief description of this component"
    defaultCode={`
    function IntroMenuButtonDropdownExample() {
      const [selected, setSelected] = React.useState(null);
      const handleSelect = ({item}) => {
        setSelected(item);
      };

      return (
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        secondaryAction={<Button text="Promote" />}
        primaryAction={<Button color="red" text="Create product group" />}
        secondaryActionDropdown={<Dropdown onSelect={(event, item) => {console.log("Selecting", event, item);}} onDismiss={() => {}}>
        <Dropdown.Item
        index={20}
          handleSelect={handleSelect}
          selected={selected}
          option={{ value: "item 1", label: "Item 1" }}
        />
        <Dropdown.Item
          handleSelect={handleSelect}
          selected={selected}
          option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
        />
        <Dropdown.Item
          isExternal
          href="https://pinterest.com"
          option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
        />
        <Dropdown.Item
          handleSelect={handleSelect}
          selected={selected}
          badgeText="New"
          option={{ value: "item 4", label: "Item 4" }}
        />
        <Dropdown.Item
          isExternal
          badgeText="New"
          option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
          href="https://pinterest.com"
        />
        <Dropdown.Item
          option={{ value: "item 6", label: "Item 6 navigates internally" }}
          href="/typeahead"
        />
      </Dropdown>}
      />);}
    `}
  />,
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
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Description about what you should Do. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)"
        defaultCode={`
<PageHeader title="Settings"/>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`
          What not to do goes \`here\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)
        `}
        defaultCode={`
Code for this example goes here
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

    <MainSection.Subsection
      description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
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
    description={`Details about \`Writing Guidelines\` go here. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/). Can also use Do/Don't cards without any code (like Tooltip)`}
  />,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
      **[PageHeader](/PageHeader)**
      Details about why to use this over current component.

      **[PageHeader](/PageHeader)**
      Details about why to use this over current component.

    `}
    />
  </MainSection>,
);

export default cards;
