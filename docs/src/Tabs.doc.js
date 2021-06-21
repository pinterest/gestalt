// @flow strict
import type { Node } from 'react';
import { Tabs } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Tabs"
    description={`Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels please use [SegmentedControl](/SegmentedControl).`}
  />,
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
        type: `Array<{| href: string, text: React.Node, id?: string, indicator?: 'dot' | number, ref?: {| current: ?HTMLElement |} |}>`,
        required: true,
      },
      {
        name: 'onChange',
        type: `({| +event: SyntheticMouseEvent<> | SyntheticKeyboardEvent<>, +activeTabIndex: number, disableOnNavigation: () => void  |}) => void`,
        required: true,
        description:
          'If your app uses a tool such as react-router to navigate between pages, be sure to use onChange to navigate instead of getting a full page refresh with href',
      },
      {
        name: 'wrap',
        type: 'boolean',
        description: `By default, flex items will all try to fit onto one line. Use this prop to allow the items to wrap onto multiple lines, from top to bottom.`,
      },
    ]}
  />,
);

card(
  <Example
    name="Example"
    defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [wrap, setWrap] = React.useState(false);

  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };

  const tabs = [
    { href: "https://pinterest.com", text: "Boards for You", indicator: "dot" },
    { href: "https://pinterest.com", text: "Pins for You" },
    { href: "https://pinterest.com", text: "1" },
    { href: "https://pinterest.com", text: "❤" },
    { href: "https://pinterest.com", text: "Following" },
    { href: "https://pinterest.com", text: "People to Follow" },
  ];

  return (
    <Flex alignItems="start" direction="column" gap={4}>
      <Flex gap={4} padding={2}>
        <Label htmlFor="wrap">
          <Text>Wrap</Text>
        </Label>
        <Switch
          id="wrap"
          onChange={() => setWrap(!wrap)}
          switched={wrap}
        />
      </Flex>

      <Box borderStyle="sm" maxWidth={500} overflow="auto" padding={1}>
        <Tabs
          activeTabIndex={activeIndex}
          onChange={handleChange}
          tabs={tabs}
          wrap={wrap}
        />
      </Box>
    </Flex>
  );
}
  `}
  />,
);

export default cards;
