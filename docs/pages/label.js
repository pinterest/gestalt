// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Label">
      <PageHeader name="Label" description={generatedDocGen?.description} />
      <PropTable
        props={[
          {
            name: 'children',
            type: 'React.Node',
          },
          {
            name: 'htmlFor',
            type: 'string',
            required: true,
            description: 'Id of the element this label is describing',
          },
        ]}
      />
      <Example
        description={`
    Whenever you are using a [SelectList](/selectlist), [Switch](/switch), [TextField](/textfield) or [TextArea](/textarea) component, you should use a \`Label\`.
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
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Label' }) },
  };
}
