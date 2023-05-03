// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import color from '../../examples/tiledata/color.js';
import disabled from '../../examples/tiledata/disabled.js';
import group from '../../examples/tiledata/group.js';
import main from '../../examples/tiledata/main.js';
import tooltip from '../../examples/tiledata/tooltip.js';

export default function TileDataPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
function Example() {
  return (
    <TileData />
  );
}
        `}
      >
        <SandpackExample code={main} hideEditor name="Main TileData example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines" />

      <MainSection name="Best practices" />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization" />

      <MainSection name="Subcomponents" />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="TileData can be used with a tooltip to display clarifying information"
          title="Tooltip"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Removes interactivity from the element"
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use TileData's Data Visulization to display multiple colors`}
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={color} name="Colors Variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use checkboxes when enabling a multi-select experience. You can manage state by passing the \`selected\` prop`}
          title="Group"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={group} name="Checkbox Variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing" />

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[TileData](/TileData)**
      Details about why to use this over current component.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TileData' }) },
  };
}
