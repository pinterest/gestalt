// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import docGen, { type DocGen, type DocType } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/taparealink/main.js';

export default function DocsPage({ generatedDocGen }: DocType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
            message="Complete documentation for TapAreaLink coming soon."
            helperLink={{
              text: 'See TapArea documentation page',
              accessibilityLabel: 'View TapArea documentation page',
              href: '/web/taparea',
              onClick: () => {},
            }}
          />
        }
      >
        <SandpackExample code={main} name="Main TapAreaLink example" hideEditor />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines" description="See [TapArea](/web/taparea)." />
      <MainSection name="Variants" description="See [TapArea](/web/taparea) for more variants.">
        <MainSection.Subsection
          title="External handlers"
          description={`TapAreaLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when TapAreaLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.
See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('TapAreaLink') },
  };
}
