// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen, type DocType } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/buttonlink/main.js';
import relAndTargetExample from '../../examples/buttonlink/relAndTargetExample.js';

export default function DocsPage({ generatedDocGen }: DocType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main Button example" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines" description="See [Button](/web/button)." />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="rel and target"
          description={`
These optional props control the behavior of ButtonLink. External links commonly use \`target="_blank"\` to open the link in a new tab or window, and \`rel="nofollow"\` to provide hints for SEO.
`}
        >
          <SlimBanner
            iconAccessibilityLabel="Localize the default label"
            message="ButtonLink announces to assistive technologies that the link opens in a new tab. Localize the default label with DefaultLabelProvider."
            type="recommendationBare"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about DefaultLabelProvider',
              href: '/web/utilities/defaultlabelprovider',
              onClick: () => {},
            }}
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={relAndTargetExample} name="Rel and target example." />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="External handlers"
          description={`ButtonLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when ButtonLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/web/button)**
Use Button when an action is needed instead of a link.

**[ButtonGroup](/web/buttongroup)**
When displaying multiple Buttons in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.

**[IconButton](/web/iconbutton)**
Use IconButton when only an icon is needed instead of text.

**[TapArea](/web/taparea)**
Use TapArea to make non-button elements interactive, like an Image. This ensures the element interaction is accessible and uses Gestalt styles.

**[Tabs](/web/tabs)**
Tabs are intended for page-level navigation between multiple URLs.

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
    props: { generatedDocGen: await docGen('ButtonLink') },
  };
}
