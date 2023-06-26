// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Label">
      <PageHeader name="Label" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <Example
          description={`
    Whenever you are using a [SelectList](/web/selectlist), [Switch](/web/switch), [TextField](/web/textfield) or [TextArea](/web/textarea) component, you should use a \`Label\`.
  `}
          name="Example"
          defaultCode={`
function LabelExample() {
  const [switched, setSwitched] = React.useState(false);

  return (
    <Box>
      <Box paddingY={1}>
        <Label htmlFor="switchExample">
          <Text>Live example</Text>
        </Label>
      </Box>
      <Switch
        onChange={() => setSwitched(!switched)}
        id="switchExample"
        switched={switched}
      />
    </Box>
  );
}
`}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Label') },
  };
}
