// @flow strict
import { type Node } from 'react';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import SheetMobileEffects from '../../../examples/effectsprovider/sheetMobileEffects.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        type="utility"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection title="EffectsProvider in SheetMobile">
          <MainSection.Card
            cardSize="lg"
            description={`EffectsProvider has one prop for each component subscribing to the provider.

The effects passed down to SheetMobile must be wrapped in a custom component. Inside the custom component, use the React's useEffect hook to build the effects needed for your component to synchronize with shared external systems.

EffectsProvider's \`sheetMobile\` props only subscribes SheetMobile and those adaptive components that use SheetMobile in their mobile UI (Modal, Dropdown.)

In the example below, SheetMobile's header announced the state reduce motion ("on"/"off"). useEffect synchronizes all SheetMobiles with the reduced motion OS settings. If we change the reduced motion OS settings, the changes will be reflected in the header. The useEffect clear method logs "Unmounted".
`}
            sandpackExample={
              <SandpackExample code={SheetMobileEffects} name="EffectsProvider in SheetMobile" />
            }
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'EffectsProvider',
      }),
    },
  };
}
