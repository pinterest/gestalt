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
import bar from '../../examples/chart/bar.js';
import line from '../../examples/chart/line.js';
import referenceArea from '../../examples/chart/referenceArea.js';

export default function ChartPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines" />

      <MainSection name="Best practices" />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization" />

      <MainSection name="Subcomponents" />

      <MainSection name="Variants">
        <MainSection.Subsection title="Bar">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={bar} name="Bar" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Line">
          <MainSection.Card sandpackExample={<SandpackExample code={line} name="Line" />} />
        </MainSection.Subsection>
        <MainSection.Subsection title="ReferenceArea">
          <MainSection.Card
            sandpackExample={<SandpackExample code={referenceArea} name="ReferenceArea" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing" />

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Chart](/Chart)**
      Details about why to use this over current component.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Chart') },
  };
}
