// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import defaultExample from '../../examples/buttongroup/defaultExample.js';

export default function BadgePage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={defaultExample} name="ButtonGroup Main Example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Arranging a group of buttons in a horizontal or vertical stack due to limited space.
          - Showing all the available options at one glance.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Grouping 4 or more actions, consider using an ellipses [IconButton](/web/iconbutton) after 3 options.
          - Switching between different views. Use [SegmentedControl](/web/segmentedcontrol) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        name="Example"
        id="example"
        defaultCode={`
<ButtonGroup>
  <Button text="Button 1" />
  <Button text="Button 2" />
</ButtonGroup>
`}
      />

      <Example
        name="Wrap"
        id="wrap"
        description={`When buttons don't fit within the container, they will automatically wrap to the next line.`}
        defaultCode={`
<Box width={150} borderStyle="sm">
  <ButtonGroup>
    <Button text="Button 1" />
    <Button text="Button 2" />
    <Button text="Button 3" />
  </ButtonGroup>
</Box>
`}
      />
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'ButtonGroup' }) },
  };
}
