// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Provider"
    description="An app may optionally have a `Provider` to set up context for components further down the tree. The first usecase is setting the color scheme, but other uses such as right to left support will be added in the future."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'colorScheme',
        type: `"light" | "dark" | "userPreference"`,
        defaultValue: 'light',
        description:
          'The color scheme for components inside the provider. Specify "userPreference" to use "prefers-color-scheme" media query.',
        href: 'colorScheme',
      },
      {
        name: 'id',
        type: 'string',
        description:
          'An optional id for your provider. If not passed in, settings will be applied as globally as possible (example: it sets color scheme variables at :root).',
      },
    ]}
  />,
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
      value: "userPreference",
      label: "User Preference"
    }
  ];
  return (
    <Provider colorScheme={scheme} id="docsExample">
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
    </Provider>
  );
}`}
  />,
);

export default cards;
