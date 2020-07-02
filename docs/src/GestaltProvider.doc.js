// @flow strict
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="GestaltProvider"
    description="An app may optionally have a `GestaltProvider` to set up context for components further down the tree. The first usecase is setting the color scheme, but other uses such as right to left support will be added in the future."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'colorScheme',
        type: `"light" | "dark" | "userPref"`,
        defaultValue: 'light',
        description:
          'The color scheme for components inside the provider. Specify "userPref" to use "prefers-color-scheme" media query.',
        href: 'colorScheme',
      },
    ]}
  />
);

card(
  <Example
    description="Specify a light or dark color scheme for components"
    name="Color scheme"
    id="colorScheme"
    defaultCode={`
function Example(props) {
  const [scheme, setScheme] = React.useState('light')
  const schemeOptions = [
    {
      value: "light",
      label: "Light"
    },
    {
      value: "dark",
      label: "Dark"
    },
    {
      value: "userPref",
      label: "User Preference"
    }
  ];
  return (
    <GestaltProvider colorScheme={scheme}>
      <Box color="white" padding={2}>
        <SelectList
          id="scheme"
          name="scheme"
          onChange={({ value }) => setScheme(value)}
          options={schemeOptions}
          placeholder="Select color scheme"
          label="Color scheme"
          value={scheme}
        />
        <Box padding={2}>
          <Text>Some content</Text>
        </Box>
        <Button text="Example button" inline /> <Button color="red" text="Red Button" inline />
      </Box>
    </GestaltProvider>
  );
}`}
  />
);

export default cards;
