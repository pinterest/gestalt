// @flow strict
import * as React from 'react';
import { Tabs } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Tabs"
    description={`Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels please use a SegmentedControl.`}
  />
);

card(
  <PropTable
    Component={Tabs}
    props={[
      {
        name: 'activeTabIndex',
        type: 'number',
        required: true,
      },
      {
        name: 'tabs',
        type: `Array<{| text: React.Node, href: string, id?: string |}>`,
        required: true,
      },
      {
        name: 'onChange',
        type: `({ event: SyntheticMouseEvent<>, activeTabIndex: number }) => void`,
        required: true,
        description:
          'If your app uses a tool such as react-router to navigate between pages, be sure to use onChange to navigate instead of getting a full page refresh with href',
      },
      {
        name: 'size',
        type: '"md" | "lg"',
        required: false,
        description: 'md: 40px, lg: 48px',
        defaultValue: 'md',
      },
      {
        name: 'wrap',
        type: 'boolean',
        description: `By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.`,
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    direction="row"
    defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  }
  return (
    <Tabs
      tabs={[
        {
          text: "Boards",
          href: "#"
        },
        {
          text: "Pins",
          href: "#"
        },
        {
          text: "Topics",
          href: "#"
        }
      ]}
      activeTabIndex={activeIndex}
      onChange={handleChange}
    />
  );
}
  `}
  />
);

export default cards;

const navRoute = { section: 'components', group: 'Navigation' };
export { navRoute };
