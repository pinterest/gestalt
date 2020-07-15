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
        type: `Array<{| text: React.Node, href: string, id?: string, indicator?: 'dot' |}>`,
        required: true,
      },
      {
        name: 'onChange',
        type: `({ +event: SyntheticMouseEvent<> | SyntheticKeyboardEvent<>, +activeTabIndex: number }) => void`,
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
    defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [wrap, setWrap] = React.useState(false);
  const handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveIndex(activeTabIndex)
  };
  const TABS = [
    { href: "https://pinterest.com", text: "Boards for You", indicator: "dot" },
    { href: "https://pinterest.com", text: "Pins for You" },
    { href: "https://pinterest.com", text: "1" },
    { href: "https://pinterest.com", text: "❤" },
    { href: "https://pinterest.com", text: "Following" },
    { href: "https://pinterest.com", text: "People to Follow" },
  ];
  return (
    <Stack gap={2}>
      <Row gap={2} padding={2}>
        <Label htmlFor="wrap">
          <Text>Wrap</Text>
        </Label>
        <Switch
          id="wrap"
          onChange={() => setWrap(!wrap)}
          switched={wrap}
        />
      </Row>
      {['md', 'lg'].map((size) => (
        <Box key={size}>
          <Heading size="sm">size = {size}</Heading>
          <Box maxWidth={500} overflow="auto" borderSize="sm" padding={1}>
            <Tabs
              activeTabIndex={activeIndex}
              onChange={handleChange}
              size={size}
              tabs={TABS}
              wrap={wrap}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
  `}
  />
);

export default cards;
