// @flow strict
import { type Node } from 'react';
import { Icon, SlimBanner } from 'gestalt';
import docGen, { type DocGen, type DocType, overrideTypes } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/iconbuttonlink/main.js';

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
            message="Complete documentation for IconButtonLink coming soon."
            helperLink={{
              text: 'See IconButton documentation page',
              accessibilityLabel: 'View IconButton documentation page',
              href: '/web/iconbutton',
              onClick: () => {},
            }}
          />
        }
      >
        <SandpackExample code={main} name="Main IconButtonLink example" hideEditor />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection
        name="Usage guidelines"
        description="See [IconButton](/web/iconbutton) for usage guidelines."
      />
      <MainSection
        name="Variants"
        description="See [IconButton](/web/iconbutton) for more variants."
      >
        <MainSection.Subsection
          title="External handlers"
          description={`IconButtonLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when IconButtonLink is clicked

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
  const generatedDocGen = await docGen('IconButtonLink');
  const overriddenDocGen = overrideTypes(generatedDocGen, {
    icon: (Icon?.icons ?? []).map((icon) => `'${icon}'`).join(' | '),
  });

  return {
    props: { generatedDocGen: overriddenDocGen },
  };
}
