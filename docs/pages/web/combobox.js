// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { BannerSlimExperiment } from '../../docs-components/BannerSlimExperiment';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import controlled from '../../examples/combobox/controlled';
import error from '../../examples/combobox/error';
import helperText from '../../examples/combobox/helperText';
import labels from '../../examples/combobox/labels';
import localizationLabels from '../../examples/combobox/localizationLabels';
import main from '../../examples/combobox/main';
import programmatic from '../../examples/combobox/programmatic';
import ref from '../../examples/combobox/ref';
import sizes from '../../examples/combobox/sizes';
import subtext from '../../examples/combobox/subtext';
import tags from '../../examples/combobox/tags';
import uncontrolled from '../../examples/combobox/uncontrolled';

const PREVIEW_HEIGHT = 320;

export default function ComboBoxPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        bannerSlimExperiment={
          <BannerSlimExperiment
            componentName="ComboBox"
            description="fix and improve underlying Popover component behavior. No visual updates"
            pullRequest={3244}
          />
        }
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
      >
        <SandpackExample
          code={main}
          hideEditor
          name="Main Combobox example"
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Presenting users with a long list of options (typically 10 or more) that can be filtered by typing in the text field.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - For shorter lists of items where filtering is not needed, typically under 10 items.
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
            description="Use ComboBox to allow the user to edit or copy the textfield input values to select and/or narrow down from a given list of options."
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use ComboBox for a simple list of items. Use [SelectList](/web/selectlist) instead for the added native mobile functionality."
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
      ComboBox requires both \`label\` and \`accessibilityClearButtonLabel\`. By default, the \`label\` is visible above TextField. However, if the form items are labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.

      In the example below, the "Discover this week's top searched trends across all categories" text is acting as a heading, so instead of repeating another label, we visually hide the label. When a user focuses on the ComboBox, a screen reader will announce "Choose a category to display top search trends, Select category".
      `}
          title="Labels"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={labels}
                name="Example with accessibility labels"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
          <MainSection.Subsection
            description={`
    * Hitting \`Enter\` or \`Space\` key on the ComboBox's trigger opens the options list
    * Once an item is selected, hitting \`Enter\` or \`Space\` on the clear button clears the selection and returns focus to the input textfield
    * \`Escape\` key closes the options list, while moving focus back on the ComboBox's trigger
    * Arrow keys are used to navigate items within the options list
    * \`Enter\` key selects an item within the options list
    * \`Tab\` or \` Shift + Tab\` close the options list and move focus accordingly
  `}
            title="Keyboard interaction"
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`Note that \`accessibilityClearButtonLabel\` and \`noResultText\` are optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="ComboBox can be used as a controlled or an uncontrolled component. An uncontrolled ComboBox stores its own state internally and updates it based on the user input. On the other side, a controlled ComboBox's state is managed by a parent component. The parent component's state passes new values through props to the controlled component which notifies changes through event callbacks."
          title="Controlled vs Uncontrolled"
        >
          <MainSection.Card
            cardSize="lg"
            description={`An uncontrolled ComboBox should be used for basic cases where no default value or tags are required. Don't pass \`inputValue\` or \`selectedOptions\` props to keep the component uncontrolled. By passing \`inputValue\` to ComboBox, the component fully manages its internal state: any value different from \`null\` and \`undefined\` makes Combobox controlled.`}
            sandpackExample={
              <SandpackExample
                code={uncontrolled}
                name="Uncontrolled component example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Uncontrolled ComboBox"
          />
          <MainSection.Card
            cardSize="lg"
            description={` A controlled ComboBox is required if a selected value is set, as shown in the first example. In the second example, values are set programatically. Controlled Comboboxes with [tags](#Tags) are also controlled components. A controlled ComboBox requires three value props: \`options\`,  \`inputValue\`,  and \`selectedOptions\`. ComboBox is notified of changes via the \`onChange\`, \`onSelect\`, \`onBlur\`, \`onFocus\`, \`onKeyDown\`, and \`onClear\` props. All values displayed by ComboBox at any time are controlled externally. To clear \`inputValue\`, set the value to an empty string \`inputValue\` = \` "" \`, \`null\`  or \` undefined\` values turn ComboBox into an uncontrolled component.`}
            sandpackExample={
              <SandpackExample
                code={controlled}
                name="Controlled component example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Controlled ComboBox"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={programmatic}
                name="programmatic"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    Include [Tag](/web/tag) elements in the input using the \`tags\` prop.

    Note that the \`ComboBox\` component doesn't internally manage tags; therefore, it must be a [controlled component](#Controlled-vs-Uncontrolled). A controlled ComboBox requires three value props: \`options\`,  \`inputValue\`,  and \`tags\`.

    To use ComboBox with [tags](/web/tag), it's recommended to create new tags on enter key presses, to remove them on backspaces when the cursor is in the beginning of the field and to filter out empty tags. These best practices are shown in the following example.`}
          title="Tags"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={tags} name="Tags example" previewHeight={PREVIEW_HEIGHT} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`To control focus or position and anchor components to ComboBox, use \`ref\` as shown in the examples below.`}
          title="Ref"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={ref} name="ref" previewHeight={PREVIEW_HEIGHT} />
            }
            title="Focus management with ref example"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Display `subtext` under each selection option"
          title="Subtext"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={subtext} name="subtext" previewHeight={PREVIEW_HEIGHT} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="ComboBox can have different sizes. The default size is `md` (40px). The `lg` size is 48px. For a dense variant, use the `sm` (32px) variant."
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizes} name="ComboBox Sizes" previewHeight={PREVIEW_HEIGHT} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Whenever you want to provide more information about a form field, you should use `helperText`."
          title="Helper text"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={helperText}
                name="Helper text example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in [Link](/web/link) or [TapArea](/web/taparea)"
          title="Error message"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={error} name="Error example" previewHeight={PREVIEW_HEIGHT} />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[SelectList](/web/selectlist)**
If users need to select from a short, simple list (without needing sections, subtext details, or the ability to filter the list), use SelectList.

**[Dropdown](/web/dropdown)**
Dropdown is an element constructed using Popover as its container. Use Dropdown to display a list of actions or options in a Popover.

**[Fieldset](/web/fieldset)**
Use Fieldset to group related form items.
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
    props: { generatedDocGen: await docGen('ComboBox') },
  };
}
