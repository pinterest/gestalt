import colorpicker from 'docs/examples/buttontoggle/colorpicker';
import thumbnail from 'docs/examples/buttontoggle/thumbnail';
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
import changeLabelsDo from '../../examples/buttontoggle/changeLabelsDo';
import colors from '../../examples/buttontoggle/colors';
import confirmationDo from '../../examples/buttontoggle/confirmationDo';
import consistencyDo from '../../examples/buttontoggle/consistencyDo';
import defaultState from '../../examples/buttontoggle/default';
import disabled from '../../examples/buttontoggle/disabled';
import dropdown from '../../examples/buttontoggle/dropdown';
import icon from '../../examples/buttontoggle/icon';
import iconOnly from '../../examples/buttontoggle/iconOnly';
import localization from '../../examples/buttontoggle/localization';
import locationDo from '../../examples/buttontoggle/locationDo';
import main from '../../examples/buttontoggle/main';
import selected from '../../examples/buttontoggle/selected';

const PREVIEW_HEIGHT = 300;

export default function DocsPage({ generatedDocGen }: DocType) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name="Main ButtonToggle example"
          previewHeight={150}
        />
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
            description={`To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "Follow" to "Following."`}
            sandpackExample={<SandpackExample code={changeLabelsDo} hideEditor name="content" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Make sure that the ButtonToggle(s) in your application are consistently styled and placed. This should also apply to their sizing, maintaining uniformity throughout the experience."
            sandpackExample={
              <SandpackExample code={consistencyDo} hideEditor name="Do Consistency" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place the ButtonToggle(s) in a location where users would naturally expect to find them, taking into consideration the context. For instance, position it next to a related feature."
            sandpackExample={<SandpackExample code={locationDo} hideEditor name="Do Location" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="If the ButtonToggle(s) trigger a significant action or irreversible change, it is recommended to include a confirmation, such as a ModalAlert message."
            sandpackExample={
              <SandpackExample code={confirmationDo} hideEditor name="Do Confirmation" />
            }
            type="do"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
When ButtonToggle text does not provide sufficient context about the ButtonToggle’s behavior, supply a short, descriptive label for screen-readers using \`accessibilityLabel\`.

Texts like "Follow/ing" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the ButtonToggle text, like “Follow/ing Ryan”.

- \`accessibilityLabel\`: if present, read by screen readers read instead of the \`text\` prop. It populates [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).

If ButtonToggle is used as a control button to show/hide content, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that ButtonToggle controls the display of an interactive widget or element, or is used to modify another component.  It can be used to associate the corresponding element with the ButtonToggle. It populates [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls).

In the Color Picker variant, the ButtonToggle does not display the text given as a visible label, but the text prop is still used as a fallback accessiblity label, and is still required.

`}
          title="ARIA attributes"
        />

        <MainSection.Subsection
          description={`
Disabled ButtonToggles do not need to pass color contrast guidelines.

[From w3.org, 1.4.3 Contrast (Minimum)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html): Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

Our current disabled ButtonToggle implementation does fail to pass color contrast on accessibility integration tests. To exclude disabled buttontoggles from the integration tests we recomment conditionally setting a \`data-test-id={ isDisabled ? "disabled-button-<name>" : undefined }\` and excluding them from the integration test.

On [cypress-axe](https://www.npmjs.com/package/cypress-axe) that can be achieved with <code>cy.a11yCheck({ exclude: [['[data-test-id="disabled-button-submit"]']] })<code>`}
          title="Color contrast in disabled state"
        />
      </AccessibilitySection>

      <LocalizationSection
        code={localization}
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
                color="transparent"
                selected={false}
                size={size}
                text="Follow"
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
          title="Color"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={colors} name="Colors" previewHeight={150} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
The \`graphicSrc\` prop adds a thumbnail above the ButtonToggle text, whose source is the URL provided in the prop.

This variant also changes the shape of the ButtonToggle.
`}
          title="Thumbnail"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={thumbnail}
                name="Thumbnail buttontoggle example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
The ButtonToggle can be used as a dropdown trigger by setting the \`hasDropdown\` prop to \`true\`.
`}
          title="Dropdown"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={dropdown}
                name="Dropdown buttontoggle example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
If the \`color\` prop is an array of 4 skin tones, ButtonToggle is converted into a textless color picker.
The text prop is still used as a fallback accessiblity label, and is still required.

The colors in the array are displayed in a 4-quadrant pattern across the ButtonToggle.
The skin tones currently supported are:
<div style="display:flex">
  <div style="display:flex; flex-direction: column; flex: 10">
  skinTone1 <span style="background-color:#F0E3DC">#F0E3DC</span>
  skinTone2 <span style="background-color:#F8D7D8">#F8D7D8</span>
  skinTone3 <span style="background-color:#F2D7BE">#F2D7BE</span>
  skinTone4 <span style="background-color:#F7C3AF">#F7C3AF</span>
  skinTone5 <span style="background-color:#DEBAB0">#DEBAB0</span>
  skinTone6 <span style="background-color:#E0999A">#E0999A</span>
  skinTone7 <span style="background-color:#DDA67C">#DDA67C</span>
  skinTone8 <span style="background-color:#D98A64">#D98A64</span>
  </div>
  <div style="flex: 1"></div>
  <div style="display:flex; flex-direction: column; flex: 10">
  skinTone9 <span style="background-color:#9A6B52; color: white">#9A6B52</span>
  skinTone10 <span style="background-color:#A25847; color: white">#A25847</span>
  skinTone11 <span style="background-color:#B37143">#B37143</span>
  skinTone12 <span style="background-color:#BF6951">#BF6951</span>
  skinTone13 <span style="background-color:#683929; color: white">#683929</span>
  skinTone14 <span style="background-color:#34261F; color: white">#34261F</span>
  skinTone15 <span style="background-color:#64281B; color: white">#64281B</span>
  skinTone16 <span style="background-color:#4F2221; color: white">#4F2221</span>
  </div>
</div>
`}
          title="Color Picker"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={colorpicker}
                name="Color Picker buttontoggle example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
\`iconStart\` adds an icon before the ButtonToggle text.

Text can be ommited when using an icon to have an icon-only ButtonToggle, but in that case, accessibilityLabel is required. ButtonToggle will fail to render if both \`text\` and \`accessibilityLabel\` are unset.
`}
          title="Icons"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={icon}
                name="Icon start of buttontoggle example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />

          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={iconOnly}
                name="Icon start of buttontoggle example."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
1. Unselected
The initial state of a ButtonToggle that represents it is in a non-selected state.

2. Disabled
Used to block user interaction such as hover, focus and click. Disabled ButtonToggles are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled ButtonToggles.

3. Selected
When ButtonToggle is currently active or selected.
`}
          title="States"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={defaultState}
                layout="column"
                name="Unselected state buttontoggle example."
                previewHeight={150}
              />
            }
            title="Unselected"
          />

          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={selected}
                layout="column"
                name="Selected state buttontoggle example."
                previewHeight={150}
              />
            }
            title="Selected"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={disabled}
                layout="column"
                name="Disabled state buttontoggle example."
                previewHeight={150}
              />
            }
            title="Disabled"
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
**[RadioGroup](/web/radiogroup)**
Use when presenting a user with a list of choices for which there can only be one selection.

**[Checkbox](/web/checkbox)**
Used when presenting a user with a list of choices for which there can be multiple selections.

**[Switch](/web/switch)**
Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm Form submission.

**[TagData](/web/tagdata)**
TagData enables people to select multiple categories to compare with each other in a graph or chart.

**[TileData](/web/tiledata)**
TileData enables users to select multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points.
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
