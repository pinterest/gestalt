// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen, type DocType } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection.js';
import LocalizationSection from '../../docs-components/LocalizationSection.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import defaultStateExample from '../../examples/buttonlink/defaultStateExample.js';
import disabledStateExample from '../../examples/buttonlink/disabledStateExample.js';
import iconEndExample from '../../examples/buttonlink/iconEndExample.js';
import iconTooltipToExplainDo from '../../examples/buttonlink/iconTooltipToExplainDo.js';
import iconTooltipToExplainDont from '../../examples/buttonlink/iconTooltipToExplainDont.js';
import localizationLabels from '../../examples/buttonlink/localizationLabels.js';
import main from '../../examples/buttonlink/main.js';
import placePrimaryButtonDo from '../../examples/buttonlink/placePrimaryButtonDo.js';
import placePrimaryButtonDont from '../../examples/buttonlink/placePrimaryButtonDont.js';
import relAndTargetExample from '../../examples/buttonlink/relAndTargetExample.js';
import showFullTextDo from '../../examples/buttonlink/showFullTextDo.js';
import showFullTextDont from '../../examples/buttonlink/showFullTextDont.js';

const PREVIEW_HEIGHT = 300;

export default function DocsPage({ generatedDocGen }: DocType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        pdocsLink
      >
        <SandpackExample
          code={main}
          name="Main ButtonLink example"
          hideEditor
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Communicating a navigation that will occur.
          - Triggering or enabling a navigation, such as visiting another URL.
          - Progressing or regressing a user through a step in a flow in separate URLs.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Inlined in text. Instead, use [Link](/web/link).
          - Limited space available. Consider using an [IconButtonLink](/web/iconbuttonlink) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place primary ButtonLinks to the right or top of other ButtonLink styles."
            sandpackExample={
              <SandpackExample
                code={placePrimaryButtonDo}
                hideEditor
                name="Place primary ButtonLinks to the right or top of other ButtonLink styles."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place more than one primary ButtonLink per container/area."
            sandpackExample={
              <SandpackExample
                code={placePrimaryButtonDont}
                hideControls
                hideEditor
                name="Place primary ButtonLinks to the right or top of other ButtonLink styles."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Show the full text on ButtonLinks. ButtonLinks should be stacked when they cannot be displayed side by side."
            sandpackExample={
              <SandpackExample
                code={showFullTextDo}
                hideEditor
                name="Show the full text on ButtonLinks. ButtonLinks should be stacked when they cannot be displayed side by side."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Truncate the ButtonLink text. In rare instances where ButtonLinks must remain on one line, truncate the text on the secondary ButtonLink before truncating on the primary ButtonLink."
            sandpackExample={
              <SandpackExample
                code={showFullTextDont}
                hideEditor
                hideControls
                name="Truncate the ButtonLink text. In rare instances where ButtonLinks must remain on one line, truncate the text on the secondary ButtonLink before truncating on the primary ButtonLink."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use an IconButton + Tooltip next to the disabled ButtonLink if you need to explain why it is disabled."
            sandpackExample={
              <SandpackExample
                code={iconTooltipToExplainDo}
                hideEditor
                name="Use an IconButton + Tooltip next to the disabled ButtonLink if you need to explain why it is disabled."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use a Tooltip on disabled ButtonLink, as it is not accessible for keyboard and screen reader users."
            sandpackExample={
              <SandpackExample
                code={iconTooltipToExplainDont}
                hideEditor
                hideControls
                name="Use a Tooltip on disabled ButtonLink, as it is not accessible for keyboard and screen reader users."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <LocalizationSection name={generatedDocGen?.displayName} code={localizationLabels} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="External handlers"
          description={`ButtonLink consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when ButtonLink is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
        />
        <MainSection.Subsection
          title="Icons"
          description={`
\`iconEnd\` adds an icon after the ButtonLink text. Icons should only be used to visually reinforce a specific function or interaction of the ButtonLink. Menus and external links are a common use case. The icon \`visit\` is recommended for use with ButtonLink. Note that iconEnd on ButtonLink is not accessible to screen readers.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={iconEndExample}
                name="Icon end of ButtonLink example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          title="States"
          description={`
1. Default
    The typical state of a ButtonLink that represents it can be interacted with and is not in a selected state.
2. Disabled
Used to block user interaction such as hover, focus and click. Disabled Buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons.
`}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={defaultStateExample}
                name="Default state ButtonLink example."
                previewHeight={150}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={disabledStateExample}
                name="Disabled state ButtonLink example."
                previewHeight={150}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="rel and target"
          description={`
These optional props control the behavior of ButtonLink. External links commonly use \`target="_blank"\` to open the link in a new tab or window, and \`rel="nofollow"\` to provide hints for SEO.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={relAndTargetExample} name="Rel and target example." />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/link-navigation',
            text: 'Link navigation',
          },
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-ads-logging-extension#ads-logging-extension',
            text: 'Ads logging extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/web/button)**
Use Button when an action is needed instead of a link.

**[ButtonGroup](/web/buttongroup)**
When displaying multiple ButtonLinks in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.

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

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('ButtonLink') },
  };
}
