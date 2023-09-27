// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import defaultExample from '../../examples/segmentedcontrol/defaultExample.js';
import mainExample from '../../examples/segmentedcontrol/mainExample.js';
import responsiveExample from '../../examples/segmentedcontrol/responsiveExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="SegmentedControl">
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={mainExample} name="SegmentedControl Main Example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To switch between views within a small area of content, such as a [Popover](/web/popover).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To switch between views that represent the main content of a surface. Use [Tabs](/web/tabs) instead.
          - To act as a radio control within a form. Use [RadioGroup](/web/radiogroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Card
          cardSize="lg"
          description="Segmented Control is a naive component, meaning you need to wire any additional behavior when the user clicks on an item.

    If you'd like the tabs to control hiding or showing content, that state should
    live in a parent component.
    "
          title="Default"
          sandpackExample={<SandpackExample name="Default Example" code={defaultExample} />}
        />
        <MainSection.Card
          cardSize="lg"
          description="Segmented Control can have responsive widths where the width of an item is based on its content."
          title="Responsive"
          sandpackExample={<SandpackExample name="Responsive Example" code={responsiveExample} />}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('SegmentedControl') },
  };
}
