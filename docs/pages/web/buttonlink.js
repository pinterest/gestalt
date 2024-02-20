// @flow strict
import { type Node as ReactNode } from 'react';
import { ButtonLink } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { type DocGen, type DocType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import colors from '../../examples/buttonlink/colors';
import defaultStateExample from '../../examples/buttonlink/defaultStateExample';
import disabledStateExample from '../../examples/buttonlink/disabledStateExample';
import iconEndExample from '../../examples/buttonlink/iconEndExample';
import iconTooltipToExplainDo from '../../examples/buttonlink/iconTooltipToExplainDo';
import iconTooltipToExplainDont from '../../examples/buttonlink/iconTooltipToExplainDont';
import localizationLabels from '../../examples/buttonlink/localizationLabels';
import main from '../../examples/buttonlink/main';
import placePrimaryButtonDo from '../../examples/buttonlink/placePrimaryButtonDo';
import placePrimaryButtonDont from '../../examples/buttonlink/placePrimaryButtonDont';
import relAndTargetExample from '../../examples/buttonlink/relAndTargetExample';
import showFullTextDo from '../../examples/buttonlink/showFullTextDo';
import showFullTextDont from '../../examples/buttonlink/showFullTextDont';
import washColors from '../../examples/buttonlink/washColors';

const PREVIEW_HEIGHT = 300;

export default function DocsPage({ generatedDocGen }: DocType): ReactNode {
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

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Color contrast in disabled state"
          description={`
Disabled Buttons do not need to pass color contrast guidelines.

[From w3.org, 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html): Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

Our current disabled ButtonLink implementation does fail to pass color contrast on accessibility integration tests. To exclude disabled buttons from the integration tests we recomment conditionally setting a \`data-test-id={ isDisabled ? "disabled-button-<name>" : undefined }\` and excluding them from the integration test.

On [cypress-axe](https://www.npmjs.com/package/cypress-axe) that can be achieved with <code>cy.a11yCheck({ exclude: [['[data-test-id="disabled-button-submit"]']] })<code>`}
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} code={localizationLabels} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          description={`ButtonLink is available in 3 fixed sizes. The ButtonLink text has always a fixed size of 16px:
1. \`lg\` (48px)
    Large is the only size that should be used on Pinner surfaces.
2. \`md\` (40px)
    Medium is used on more dense UI such as business surfaces or internal tools.
3. \`sm\` (32px)
    Small should be used sparingly and only in places where the UI is very dense.`}
        >
          <CombinationNew size={['sm', 'md', 'lg']}>
            {({ size }) => (
              <ButtonLink
                href=""
                accessibilityLabel={`Example size ${size}`}
                color="red"
                text="Visit"
                size={size}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Width"
          description={`
1. Inline (default)
    Inline is our default ButtonLink width.  The width of an inline ButtonLink is based on the length of its text. Use in most cases where you need a ButtonLink.
2. Full-width (\`fullWidth\`)
    Full-width Buttons can be used in narrower content areas when the text in the ButtonLink is close to full width in the content area. This is especially common to see in components such as BannerCallout and BannerUpsell at their smaller breakpoints.`}
        >
          <CombinationNew fullwidth={[false, true]}>
            {({ fullwidth }) => (
              <ButtonLink
                href=""
                accessibilityLabel={`Example width ${fullwidth}`}
                color="red"
                text="Visit"
                fullWidth={fullwidth}
                size="lg"
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Color on white backgrounds"
          description={`
1. Red (Primary)
    High emphasis, used for primary actions.
2. Blue (Primary in shopping context)
    The blue ButtonLink is only intended for the shopping experience and is used for primary shopping actions.
3. Gray (Secondary)
    Medium emphasis, used for secondary actions.
4. Transparent (Tertiary)
    Low emphasis when placed on dark/image backgrounds, used for tertiary actions in that context. *Note, this treatment should be used with caution as it has potential color contrast issues.*
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={colors} name="Colors" previewHeight={500} layout="column" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          title="Color on color/image backgrounds"
          description={`
  1. White (Primary)
      High emphasis when placed on color/image backgrounds, used for primary actions in that context.
  2. Semi-transparent white (Secondary)
      Medium emphasis when placed on color/image backgrounds, used for secondary actions in that context.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={washColors}
                name="Color on color/image backgrounds"
                previewHeight={500}
                layout="column"
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
                name="Default state button example."
                previewHeight={150}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={disabledStateExample}
                name="Disabled state button example."
                previewHeight={150}
              />
            }
          />
        </MainSection.Subsection>

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
**[ButtonLink](/web/button)**
Use ButtonLink when an action is needed instead of a link.

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
