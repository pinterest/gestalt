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
import biaxialX from '../../examples/chart/biaxialX.js';
import biaxialY from '../../examples/chart/biaxialY.js';
import composed from '../../examples/chart/composed.js';
import decal from '../../examples/chart/decal.js';
import dimensions from '../../examples/chart/dimensions.js';
import line from '../../examples/chart/line.js';
import referenceArea from '../../examples/chart/referenceArea.js';
import stackedBar from '../../examples/chart/stackedBar.js';
import tooltip from '../../examples/chart/tooltip.js';
import verticalBar from '../../examples/chart/verticalBar.js';

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

        <MainSection.Subsection title="Stacked">
          <MainSection.Card
            sandpackExample={<SandpackExample code={stackedBar} name="Stacked" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Vertical">
          <MainSection.Card
            sandpackExample={<SandpackExample code={verticalBar} name="Vertical" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Line">
          <MainSection.Card sandpackExample={<SandpackExample code={line} name="Line" />} />
        </MainSection.Subsection>

        <MainSection.Subsection title="Composed">
          <MainSection.Card sandpackExample={<SandpackExample code={composed} name="Composed" />} />
        </MainSection.Subsection>

        <MainSection.Subsection title="Biaxial">
          <MainSection.Card sandpackExample={<SandpackExample code={biaxialY} name="Biaxial" />} />
          <MainSection.Card sandpackExample={<SandpackExample code={biaxialX} name="Biaxial" />} />
        </MainSection.Subsection>

        <MainSection.Subsection title="Tooltip">
          <MainSection.Card sandpackExample={<SandpackExample code={tooltip} name="Tooltip" />} />
        </MainSection.Subsection>

        <MainSection.Subsection title="ReferenceArea">
          <MainSection.Card
            sandpackExample={<SandpackExample code={referenceArea} name="ReferenceArea" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Dimensions">
          <MainSection.Card
            sandpackExample={<SandpackExample code={dimensions} name="Dimensions" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Decal patterns">
          <MainSection.Card
            sandpackExample={<SandpackExample code={decal} name="Decal patterns" />}
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
