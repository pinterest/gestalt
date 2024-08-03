import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import controlled from '../../examples/combobox/controlled';
import disabled from '../../examples/combobox/disabled';
import error from '../../examples/combobox/error';
import helperText from '../../examples/combobox/helperText';
import hiddenLabel from '../../examples/combobox/hiddenLabel';
import labelled from '../../examples/combobox/labelled';
import localizationLabels from '../../examples/combobox/localizationLabels';
import main from '../../examples/combobox/main';
import programmatic from '../../examples/combobox/programmatic';
import readOnly from '../../examples/combobox/readOnly';
import sizes from '../../examples/combobox/sizes';
import subtext from '../../examples/combobox/subtext';
import tags from '../../examples/combobox/tags';
import uncontrolled from '../../examples/combobox/uncontrolled';
import visibleLabel from '../../examples/combobox/visibleLabel';

const PREVIEW_HEIGHT = 320;

export default function ComboBoxPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
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
                code={hiddenLabel}
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
          columns={2}
          description={`
1. Enabled
The enabled state of Textfield that represents it can be interacted with.

2. Error
TextField can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextField will handle the rest. Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.

3. Read-only
Read-only TextFields are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit.

4. Disabled
TextFields cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use "readOnly" instead).
`}
          title="State"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizes} layout="column" name="Enabled example" />
            }
            title="Enabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={disabled} layout="column" name="Disabled example" />
            }
            title="Disabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={error} layout="column" name="Error message example" />
            }
            title="Error"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={readOnly} layout="column" name="Read-only example" />
            }
            title="Read-only"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`'label' is an optional prop; however, ComboBox should always be properly labelled. [Learn about accessibility best practices regarding labels](/web/textfield#Labels).

1. Built-in label. Preferred. Consistent ComboBox design and tested accessibility.

In some cases, the label for a ComboBox is represented in a different way visually, as demonstrated below. We can take 2 approaches in this case.

2. Labelled ComboBox (Label + ComboBox). This is the best approach when a custom label is needed. The label focuses the Textfield when pressed.

3. Hidden built-in label (Label + Textfield). This is the best approach when there's significant visual distance between the label and the input. You can set \`labelDisplay="hidden"\` to ensure ComboBox is properly labeled for screen readers while using a different element to represent the label visually. The 'visual' label doesn't focus the Textfield when pressed.`}
          title="Label"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={visibleLabel} layout="column" name="Built-in label example" />
            }
            title="Built-in label"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelled} layout="column" name="Labelled example" />
            }
            title="Label + ComboBox"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={hiddenLabel} layout="column" name="Hidden label example" />
            }
            title="Hidden label"
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
          description={`
    Include [Tag](/web/tag) elements in the input using the \`tags\` prop.

    Note that the \`ComboBox\` component doesn't internally manage tags; therefore, it must be a [controlled component](#Controlled-vs-Uncontrolled). A controlled ComboBox requires three value props: \`options\`,  \`inputValue\`,  and \`tags\`.

    To use ComboBox with [tags](/web/tag), it's recommended to create new tags on enter key presses, to remove them on backspaces when the cursor is in the beginning of the field and to filter out empty tags. These best practices are shown in the following example.`}
          title="Tags"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={tags} name="Tags example" previewHeight={820} />
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
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('ComboBox') },
  };
}
