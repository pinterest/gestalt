// @flow strict
import { type Node } from 'react';
import Example from '../../../docs-components/Example.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';
import MainSection from '../../../docs-components/MainSection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Label">
      <PageHeader name="Label" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <Example
          description={`
    Whenever you are using a [SelectList](/components/web/form_fields/selectlist), [Switch](/components/web/switch), [TextField](/components/web/form_fields/textfield) or [TextArea](/components/web/form_fields/textarea) component, you should use a \`Label\`.
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
    props: { generatedDocGen: await docgen({ componentName: 'Label' }) },
  };
}
