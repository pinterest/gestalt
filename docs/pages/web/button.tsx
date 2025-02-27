import { BannerSlim, Button } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen, DocType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibilityDropdownExample from '../../examples/button/accessibilityDropdownExample';
import colors from '../../examples/button/colors';
import disabledStateExample from '../../examples/button/disabled';
import defaultStateExample from '../../examples/button/enabled';
import focus from '../../examples/button/focus';
import iconExample from '../../examples/button/iconExample';
import iconTooltipToExplainDo from '../../examples/button/iconTooltipToExplainDo';
import iconTooltipToExplainDont from '../../examples/button/iconTooltipToExplainDont';
import keepSimpleTextDo from '../../examples/button/keepSimpleTextDo';
import keepSimpleTextDont from '../../examples/button/keepSimpleTextDont';
import lineclamp from '../../examples/button/lineclamp';
import main from '../../examples/button/main';
import placePrimaryButtonDo from '../../examples/button/placePrimaryButtonDo';
import placePrimaryButtonDont from '../../examples/button/placePrimaryButtonDont';
import selectedStateExample from '../../examples/button/selectedStateExample';
import showFullTextDo from '../../examples/button/showFullTextDo';
import showFullTextDont from '../../examples/button/showFullTextDont';
import washColors from '../../examples/button/washColors';
import width from '../../examples/button/width';

const PREVIEW_HEIGHT = 300;

export default function DocsPage({ generatedDocGen }: DocType) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="Main Button example" previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Communicating an action that will occur.
          - Triggering or enabling an action, such as submitting requested information.
          - Progressing or regressing a user through a step in a flow.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Directing users to a new page or different part within the same page. Instead, use [Link](/web/link).
          - Limited space available. Consider using an [IconButton](/web/iconbutton) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place primary Buttons to the right or top of other Button styles."
            sandpackExample={
              <SandpackExample
                code={placePrimaryButtonDo}
                hideEditor
                name="Place primary Buttons to the right or top of other Button styles."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place more than one primary Button per container/area."
            sandpackExample={
              <SandpackExample
                code={placePrimaryButtonDont}
                hideControls
                hideEditor
                name="Place primary Buttons to the right or top of other Button styles."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Show the full text on Buttons. Buttons should be stacked when they cannot be displayed side by side."
            sandpackExample={
              <SandpackExample
                code={showFullTextDo}
                hideEditor
                name="Show the full text on Buttons. Buttons should be stacked when they cannot be displayed side by side."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Truncate the Button text. In rare instances where Buttons must remain on one line, truncate the text on the secondary Button before truncating on the primary Button."
            sandpackExample={
              <SandpackExample
                code={showFullTextDont}
                hideControls
                hideEditor
                name="Truncate the Button text. In rare instances where Buttons must remain on one line, truncate the text on the secondary Button before truncating on the primary Button."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep the Button text as simple and actionable as possible. Refer to the [Button writing guidelines](#Writing) for more detail. If text is not sufficient for accessibility, refer to [Accessibility guidelines](#Accessibility) for more detail."
            sandpackExample={
              <SandpackExample
                code={keepSimpleTextDo}
                hideEditor
                name="Keep the Button text as simple and actionable as possible. Refer to the [Button writing guidelines](#Writing) for more detail. If text is not sufficient for accessibility, refer to [Accessibility guidelines](#Accessibility) for more detail."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Do not add icons to a Button to reinforce the text."
            sandpackExample={
              <SandpackExample
                code={keepSimpleTextDont}
                hideControls
                hideEditor
                name="Do not add icons to a Button to reinforce the text."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use an IconButton + Tooltip next to the disabled Button if you need to explain why it is disabled."
            sandpackExample={
              <SandpackExample
                code={iconTooltipToExplainDo}
                hideEditor
                name="Use an IconButton + Tooltip next to the disabled Button if you need to explain why it is disabled."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use a Tooltip on disabled Button, as it is not accessible for keyboard and screen reader users."
            sandpackExample={
              <SandpackExample
                code={iconTooltipToExplainDont}
                hideControls
                hideEditor
                name="Use a Tooltip on disabled Button, as it is not accessible for keyboard and screen reader users."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
When Button text does not provide sufficient context about the Button’s behavior, supply a short, descriptive label for screen-readers using \`accessibilityLabel\`.
Texts like “Click here“, “Follow“, or “Shop“ can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the Button text, like “Follow Ryan” or “Shop Wedding Invitations”.

If Button is used as a control Button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:
- \`accessibilityLabel\`: if present, read by screen readers read instead of the \`text\` prop.
- \`accessibilityControls\`: informs the screen reader that Button controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to Button. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether the button-anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
          title="ARIA attributes"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={accessibilityDropdownExample}
                name="Accessibility dropdown example."
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Disabled Buttons do not need to pass color contrast guidelines.

[From w3.org, 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html): Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

Our current disabled Button implementation does fail to pass color contrast on accessibility integration tests. To exclude disabled buttons from the integration tests we recomment conditionally setting a \`data-test-id={ isDisabled ? "disabled-button-<name>" : undefined }\` and excluding them from the integration test.

On [cypress-axe](https://www.npmjs.com/package/cypress-axe) that can be achieved with <code>cy.a11yCheck({ exclude: [['[data-test-id="disabled-button-submit"]']] })<code>`}
          title="Color contrast in disabled state"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="Avoid truncating Button text whenever possible. Refer to the [Button usage guidelines](#Usage-guidelines) for more information"
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description={`
1. Default
    The typical state of a Button that represents it can be interacted with and is not in a selected state.
2. Disabled
Used to block user interaction such as hover, focus and click. Disabled Buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons.
3. Selected
  When Button is used to toggle a boolean state or control the visibility of other elements (e.g. Dropdown), use the \`selected\` prop to indicate the current state.
`}
          title="State"
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
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={selectedStateExample}
                name="Selected state button example."
                previewHeight={150}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Button is available in 3 fixed sizes. :
1. \`lg\` 
    Large is the only size that should be used on Pinner surfaces. 
2. \`md\` 
    Medium is used on more dense UI such as business surfaces or internal tools.
3. \`sm\` 
    Small should be used sparingly and only in places where the UI is very dense. `}
          title="Size"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew size={['sm', 'md', 'lg']}>
            {({ size }) => (
              <Button
                accessibilityLabel={`Example size ${size}`}
                color="red"
                size={size}
                text="Save"
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
#### On white backgrounds

1. Red (Primary)
    High emphasis, used for primary actions.
2. Gray (Secondary)
    Medium emphasis, used for secondary actions.
3. Transparent (Tertiary)
    Low emphasis when placed on dark/image backgrounds, used for tertiary actions in that context. *Note, this treatment should be used with caution as it has potential color contrast issues.*

#### On color/image backgrounds

1. White (Primary)
      High emphasis when placed on color/image backgrounds, used for primary actions in that context.
2. Semi-transparent white (Secondary)
      Medium emphasis when placed on color/image backgrounds, used for secondary actions in that context.

`}
          title="Color"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={colors} layout="column" name="Colors" previewHeight={500} />
            }
            title="On white backgrounds"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={washColors}
                layout="column"
                name="Color on color/image backgrounds"
                previewHeight={500}
              />
            }
            title="On color/image backgrounds"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
1. Inline (default)
    Inline is our default Button width.  The width of an inline Button is based on the length of its text. Use in most cases where you need a Button.
2. Full-width (\`fullWidth\`)
    Full-width Buttons can be used in narrower content areas when the text in the Button is close to full width in the content area. This is especially common to see in components such as BannerCallout and BannerUpsell at their smaller breakpoints.`}
          title="Width"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={width}
                layout="column"
                name="Width example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
\`iconEnd\` adds an icon after the Button text, and \`iconStart\` adds an icon before. Icons should only be used to visually reinforce a specific function or interaction of the Button. Menus and external links are a common use case. Use \`visit\` when linking to an external URL or \`arrow-down\` when displaying a Popover on click. Note that icons on Button are not accessible to screen readers.
`}
          title="Icons"
        >
          <BannerSlim
            helperLink={{
              accessibilityLabel: 'Learn more about the "button-icon-restrictions" rule',
              href: '/get_started/developers/eslint_plugin#gestaltbutton-icon-restrictions',
              text: 'Learn more about the "button-icon-restrictions" rule',
            }}
            iconAccessibilityLabel="Recommendation"
            message="Use Gestalt's ESLint rule to enforce the correct icons usage in Button."
            type="recommendationBare"
          />

          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={iconExample}
                name="Icon end of button example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Truncation">
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={lineclamp} layout="column" name="Truncation example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Focus style">
          <MainSection.Card
            sandpackExample={<SandpackExample code={focus} name="Focus example" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- If your object is already described on the screen, Buttons only need a verb (Example: Save).
- If your object isn’t described on the screen, Buttons need a verb + the object (Example: Create Pin).
- Use fewer than 3 words.
- Use sentence case.
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Do not use punctuation.
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#button',
            text: 'Button extension',
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
**[ButtonLink](/web/buttonlink)**
Use ButtonLink when a link is needed instead of an action.

**[ButtonGroup](/web/buttongroup)**
When displaying multiple Buttons in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.

**[IconButton](/web/iconbutton)**
Use IconButton when only an icon is needed instead of text.

**[TapArea](/web/taparea)**
Use TapArea to make non-button elements interactive, like an Image. This ensures the element interaction is accessible and uses Gestalt styles.

**[Tabs](/web/tabs)**
Tabs are intended for page-level navigation between multiple URLs.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Button') },
  };
}
