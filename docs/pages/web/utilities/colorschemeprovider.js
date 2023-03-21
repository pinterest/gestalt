// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="ColorSchemeProvider">
      <PageHeader
        name="ColorSchemeProvider"
        description={generatedDocGen?.description}
        type="utility"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

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
  return (
    <ColorSchemeProvider colorScheme={scheme} id="docsExample">
      <Box color="white" padding={2}>
        <SelectList
          id="scheme"
          name="scheme"
          onChange={({ value }) => setScheme(value)}
          placeholder="Select color scheme"
          label="Color scheme"
          value={scheme}
        >
          {[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'userPreference', label: 'User Preference' }
          ].map(({ label, value }) =>
            <SelectList.Option key={label} label={label} value={value} />
          )}
        </SelectList>
        <Box padding={2}>
          <Text>Some content</Text>
        </Box>
        <Button text="Example button"/>
        <Button color="red" text="Red Button" />
      </Box>
    </ColorSchemeProvider>
  );
}`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'ColorSchemeProvider',
      }),
    },
  };
}
