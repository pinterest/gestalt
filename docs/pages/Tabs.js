// @flow strict
import * as React from 'react';
import { basename, join } from 'path';
import fs from 'fs';
import * as ReactDocgen from 'react-docgen';
import { promisify } from 'util';
import Example from '../components/Example.js';
import Component from '../components/Component.js';

const COMPONENT_PATH = 'packages/gestalt/src/Tabs.js';

const asyncReadFile = promisify(fs.readFile);

export async function getStaticProps() {
  const dir = process.cwd();
  const root = join(dir, '..');
  const path = join(root, COMPONENT_PATH);
  const src = await asyncReadFile(path, 'utf8');
  const props = ReactDocgen.parse(
    src,
    ReactDocgen.resolver.findExportedComponentDefinition,
    ReactDocgen.defaultHandlers,
    { filename: basename(path), root }
  );
  return { props };
}

export default function TabsPage(props) {
  return (
    <>
      <Component {...props} />
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
    </>
  );
}
