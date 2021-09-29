// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ColorSchemeProvider"
    description="ColorSchemeProvider is an optional [React context provider](https://reactjs.org/docs/context.html#contextprovider) to enable dark mode"
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'colorScheme',
        type: `'light' | 'dark' | 'userPreference'`,
        defaultValue: 'light',
        description: `The color scheme for components inside the ColorSchemeProvider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](#Custom-navigation-context) variant for examples.`,
      },
      {
        name: 'id',
        type: 'string',
        description:
          'An optional id for your color scheme provider. If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root).',
      },
    ]}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Color scheme"
      description="Specify a light or dark color scheme for components"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example(props) {
  const [scheme, setScheme] = React.useState('light')
  const schemeOptions = [
    {
      value: 'light',
      label: 'Light'
    },
    {
      value: 'dark',
      label: 'Dark'
    },
    {
      value: 'userPreference',
      label: 'User Preference'
    }
  ];
  return (
    <ColorSchemeProvider colorScheme={scheme} id="docsExample">
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
        <Button text="Example button" /> <Button color="red" text="Red Button" />
      </Box>
    </ColorSchemeProvider>
  );
}`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
      **[Link](/Link)** / **[Button](/Button)** / **[IconButton](/IconButton)** / **[TapArea](/TapArea)**  / **[DropDown](/DropDown)** / **[Callout](/Callout)** / **[Upsell](/Upsell)** / **[ActivationCard](/ActivationCard)**
      If these components are under a ColorSchemeProvider, their link behavior defaults to the logic defined in ColorSchemeProvider. In order to disable the onNavigation logic, we can return "dangerouslyDisableOnNavigation" in the \`onClick\` callback. See each component page for more information.
    `}
    />
  </MainSection>,
);

export default function ColorSchemeProviderPage(): Node {
  return <CardPage cards={cards} page="ColorSchemeProvider" />;
}
