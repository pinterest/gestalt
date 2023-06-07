// @flow strict
import { type Node } from 'react';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import SheetMobileHandlers from '../../../examples/globaleventshandlerprovider/sheetMobileHandlers.js';

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
        <MainSection.Subsection title="GlobalEventsHandlerProvider in SheetMobile">
          <MainSection.Card
            cardSize="lg"
            description={`GlobalEventsHandlerProvider has one prop for each component subscribing to the provider.

GlobalEventsHandlerProvider's \`sheetMobileHandlers\` props only subscribes SheetMobile and those adaptive components that use SheetMobile in their mobile UI (Modal, Dropdown.)

In the example below, SheetMobile's logs when opens and closes.
`}
            sandpackExample={
              <SandpackExample
                code={SheetMobileHandlers}
                name="GlobalEventsHandlerProvider in SheetMobile"
              />
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
        componentName: 'GlobalEventsHandlerProvider',
      }),
    },
  };
}
