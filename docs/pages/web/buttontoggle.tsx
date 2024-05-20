import { ButtonToggle } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen, DocType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import colors from '../../examples/buttontoggle/colors';
import defaultStateExample from '../../examples/buttontoggle/defaultStateExample';
import disabledStateExample from '../../examples/buttontoggle/disabledStateExample';
import iconEndExample from '../../examples/buttontoggle/iconEndExample';
import iconTooltipToExplainDo from '../../examples/buttontoggle/iconTooltipToExplainDo';
import keepSimpleTextDo from '../../examples/buttontoggle/keepSimpleTextDo';
import main from '../../examples/buttontoggle/main';
import placePrimaryButtonDo from '../../examples/buttontoggle/placePrimaryButtonDo';
import selectedStateExample from '../../examples/buttontoggle/selectedStateExample';
import showFullTextDo from '../../examples/buttontoggle/showFullTextDo';

const PREVIEW_HEIGHT = 300;

export default function DocsPage({ generatedDocGen }: DocType) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="Main ButtonToggle example" previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - The ButtonToggle should be used when you require a binary component with distinct on/off states
            - To demonstrate that items are actively selected for filtering
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - Avoid using the ButtonToggle when a simpler Checkbox, RadioButton, or Switch can be used instead.
            - Do not use ButtonToggle in replacement of a Button, it should only be used for selected and unselected functionality
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
            description={`To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "follow" to "Following."`}
            sandpackExample={
              <SandpackExample
                code={placePrimaryButtonDo}
                hideEditor
                name={`To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "follow" to "Following."`}
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Make sure that the ButtonToggle(s) in your application are consistently styled and placed. This should also apply to their sizing, maintaining uniformity throughout the experience."
            sandpackExample={
              <SandpackExample
                code={showFullTextDo}
                hideEditor
                name="Make sure that the ButtonToggle(s) in your application are consistently styled and placed. This should also apply to their sizing, maintaining uniformity throughout the experience."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place the ButtonToggle(s) in a location where users would naturally expect to find them, taking into consideration the context. For instance, position it next to a related feature."
            sandpackExample={
              <SandpackExample
                code={keepSimpleTextDo}
                hideEditor
                name="Place the ButtonToggle(s) in a location where users would naturally expect to find them, taking into consideration the context. For instance, position it next to a related feature."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="If the ButtonToggle(s) trigger a significant action or irreversible change, it is recommended to include a confirmation, such as a toast message."
            sandpackExample={
              <SandpackExample
                code={iconTooltipToExplainDo}
                hideEditor
                name="If the ButtonToggle(s) trigger a significant action or irreversible change, it is recommended to include a confirmation, such as a toast message."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
When ButtonToggle text does not provide sufficient context about the Button’s behavior, supply a short, descriptive label for screen-readers using \`accessibilityLabel\`.
Texts like “Best“, “Views“, or “Save“ can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the ButtonToggle text, like “Follow Ryan” or “Shop Wedding Invitations”.

If ButtonToggle is used as a control button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:
- \`accessibilityLabel\`: if present, read by screen readers read instead of the \`text\` prop.
- \`accessibilityControls\`: informs the screen reader that ButtonToggle controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
          title="ARIA attributes"
        />

        <MainSection.Subsection
          description={`
Disabled Buttons do not need to pass color contrast guidelines.

[From w3.org, 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html): Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

Our current disabled ButtonToggle implementation does fail to pass color contrast on accessibility integration tests. To exclude disabled buttons from the integration tests we recomment conditionally setting a \`data-test-id={ isDisabled ? "disabled-button-<name>" : undefined }\` and excluding them from the integration test.

On [cypress-axe](https://www.npmjs.com/package/cypress-axe) that can be achieved with <code>cy.a11yCheck({ exclude: [['[data-test-id="disabled-button-submit"]']] })<code>`}
          title="Color contrast in disabled state"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="Avoid truncating ButtonToggle text whenever possible. Refer to the [ButtonToggle usage guidelines](#Usage-guidelines) for more information"
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`ButtonToggle is available in 3 fixed sizes. The ButtonToggle text has always a fixed size of 16px:
1. \`lg\` (48px)
    Large is the only size that should be used on Pinner surfaces.
2. \`md\` (40px)
    Medium is used on more dense UI such as business surfaces or internal tools.
3. \`sm\` (32px)
    Small should be used sparingly and only in places where the UI is very dense.`}
          title="Size"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew size={['sm', 'md', 'lg']}>
            {({ size }) => (
              <ButtonToggle
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
1. Red (Primary)
    High emphasis, used for the Save action.
2. Transparent
    Low emphasis when placed on dark/image backgrounds, used for actions in that context.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={colors} layout="column" name="Colors" previewHeight={500} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
\`iconStart\` adds an icon before the ButtonToggle text.
`}
          title="Icons"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
              // TODO: Fix this example to use iconStart instead of iconEnd
                code={iconEndExample}
                name="Icon start of button example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
1. Default
    The initial state of a ButtonToggle that represents it is in a non-selected state.
2. Disabled
Used to block user interaction such as hover, focus and click. Disabled Buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons.
3. Selected
  When ButtonToggle is currently active or selected.
`}
          title="States"
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
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use fewer than three words, ideally only one.
- Use clear and concise copy for labels, tooltips, and any supporting text.
- To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "follow" to "Following."
- Make sure that all text is easy to translate for localization purposes.
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


      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/web/button)**
Use ButtonToggle for a standard action button, like submitting a form.

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
    props: { generatedDocGen: await docGen('ButtonToggle') },
  };
}
