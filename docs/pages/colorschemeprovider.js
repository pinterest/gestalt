// @flow strict
import type { Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="ColorSchemeProvider">
      <PageHeader name="ColorSchemeProvider" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

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
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Link](/link)** / **[Button](/button)** / **[IconButton](/iconbutton)** / **[TapArea](/taparea)**  / **[DropDown](/dropdown)** / **[Callout](/callout)** / **[Upsell](/upsell)** / **[ActivationCard](/activationcard)**
      If these components are under a ColorSchemeProvider, their link behavior defaults to the logic defined in ColorSchemeProvider. In order to disable the onNavigation logic, we can return "dangerouslyDisableOnNavigation" in the \`onClick\` callback. See each component page for more information.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'ColorSchemeProvider',
        alternativeSubdirectory: '/packages/gestalt/src/contexts/ColorSchemeProvider.js',
      }),
    },
  };
}
