import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { DocGen, multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import controlled from '../../examples/selectlist/controlled';
import disabled from '../../examples/selectlist/disabled';
import dontFeatures from '../../examples/selectlist/dontFeatures';
import dontFourItems from '../../examples/selectlist/dontFourItems';
import dontMix from '../../examples/selectlist/dontMix';
import doOrder from '../../examples/selectlist/doOrder';
import doSelection from '../../examples/selectlist/doSelection';
import doSimple from '../../examples/selectlist/doSimple';
import enabled from '../../examples/selectlist/enabled';
import error from '../../examples/selectlist/error';
import grouping from '../../examples/selectlist/grouping';
import helperText from '../../examples/selectlist/helperText';
import labelHidden from '../../examples/selectlist/labelHidden';
import labelled from '../../examples/selectlist/labelled';
import labelVisible from '../../examples/selectlist/labelVisible';
import main from '../../examples/selectlist/main';
import size from '../../examples/selectlist/size';

const DOC_NAMES = ['SelectList', 'SelectListOption', 'SelectListGroup'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen?.SelectList?.displayName}>
      <PageHeader
        description={generatedDocGen?.SelectList?.description}
        name={generatedDocGen?.SelectList?.displayName}
      >
        <SandpackExample
          code={main}
          hideEditor
          layout="column"
          name={`Main ${generatedDocGen?.SelectList?.displayName} example`}
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.SelectList} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - When presenting users with a list of options that utilizes the native select functionality of the browser or device.
          - When presenting users with a list of options to choose from, like display settings.
        `}
            title="When to use"
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description={`
          - When more than 10 options are presented and the ability to filter the list would be beneficial. Use [ComboBox](/web/combobox) instead.
          - When extra functionality, like groups, subtext or badges, is needed. Use [Dropdown](/web/dropdown) instead.
          - When the options are links and navigate users to different places. Use [Dropdown](/web/dropdown) instead.
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
            description="Use SelectList when the user needs to select from a simple list of items."
            sandpackExample={
              <SandpackExample
                code={doSimple}
                hideEditor
                layout="column"
                name="Use For Simple Item List"
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Use SelectList when additional functionality such as subtext or images are needed. Use [Dropdown](/web/dropdown) instead."
            sandpackExample={
              <SandpackExample
                code={dontFeatures}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use If Additional Features Needed"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Order the list items in SelectList either alphabetically or by usage."
            sandpackExample={
              <SandpackExample
                code={doOrder}
                hideEditor
                layout="column"
                name="Order Items By Alphabet or Usage"
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Use SelectList if there are fewer than 4 items in the list and there is space to display all options. Use [RadioGroup](/web/radiogroup) instead."
            sandpackExample={
              <SandpackExample
                code={dontFourItems}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use If Less Than Four Items"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep the same type of selection for a group of items. An example of this might be a filter bar. If some items could use SelectList and some items need to use [Dropdown](/web/dropdown), use Dropdown for all the items in the group."
            sandpackExample={
              <SandpackExample
                code={doSelection}
                hideEditor
                layout="column"
                name="Maintain Selection Type For Group"
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Mix [Dropdown](/web/dropdown) and SelectList in a group of items."
            sandpackExample={
              <SandpackExample
                code={dontMix}
                hideControls
                hideEditor
                layout="column"
                name="Don't Mix Dropdown and Item List in Group"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.SelectList?.displayName}>
        <MainSection.Subsection
          description={`
      SelectList comes with [Label](/web/label) built-in: just use the \`label\` prop. We strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct SelectList.

      If SelectList is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.`}
          title="Labels"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={labelVisible} name="Labels with Built-in Features Example" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.SelectListOption?.description}
          title={generatedDocGen?.SelectListOption?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SelectListOption}
            id="SelectList.Option"
            name="SelectList.Option"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={generatedDocGen?.SelectListGroup?.description}
          title={generatedDocGen?.SelectListGroup?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SelectListGroup}
            id="SelectList.Group"
            name="SelectList.Group"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description="SelectList must be used as a controlled component when the `placeholder` or `value` props are needed. When used in this manner, `onChange` and `value` are required, while `placeholder` is optional."
          title="Controlled component"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={controlled} name="Controlled example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
              Use \`lg\` as the recommended size within Pinterest products.
              Use \`md\` on denser surfaces, such as business products or internal tools.`}
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={size} layout="row" name="Size example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
1. Enabled
The enabled state of Textfield that represents it can be interacted with.

2. Disabled
TextFields cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use "readOnly" instead).

3. Error
TextField can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextField will handle the rest. Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.x
`}
          title="State"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={enabled} layout="column" name="Enabled example" />
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
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`'label' is an optional prop; however, TextField should always be properly labelled. [Learn about accessibility best practices regarding labels](/web/textfield#Labels).

1. Built-in label. Preferred. Consistent Textfield design and tested accessibility.

In some cases, the label for a TextField is represented in a different way visually, as demonstrated below. We can take 2 approaches in this case.

2. Labelled Textfield (Label + Textfield). This is the best approach when a custom label is needed. The label focuses the Textfield when pressed.

3. Hidden built-in label (Label + Textfield). This is the best approach when there's significant visual distance between the label and the input. You can set \`labelDisplay="hidden"\` to ensure TextField is properly labeled for screen readers while using a different element to represent the label visually. The 'visual' label doesn't focus the Textfield when pressed.`}
          title="Label"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelVisible} layout="column" name="Built-in label example" />
            }
            title="Built-in label"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelled} layout="column" name="Labelled example" />
            }
            title="Label + Textfield"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelHidden} layout="column" name="Hidden label example" />
            }
            title="Hidden label"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Helper text should be used when additional description may be required to understand the SelectList. Common examples include text that is legally required to be displayed, or instructions to fill out a form (e.g. proper formatting). If the text is optional, [Tooltip](/web/tooltip) could be used instead."
          title="Helper text"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={helperText} name="Helper Text Example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="SelectList.Group can be used to group related options. Note that disabling a group disables all of its options."
          title="Grouping"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={grouping} name="Grouping Related Options Example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.SelectList?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Dropdown](/web/dropdown)**
If additional functionality is needed in the menu, such as subtext, headers or custom styling, use Dropdown.

**[ComboBox](/web/combobox)**
If users need the ability to choose an option by entering text to filter a long list of options, use ComboBox.

**[RadioGroup](/web/radiogroup)**
If users need the ability to choose between fewer than 4 options, use RadioButton.

**[Checkbox](/web/checkbox)**
If users need the ability to choose between a yes/no option, use Checkbox.
`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: {
      [key: string]: DocGen;
    };
  };
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(DOC_NAMES),
    },
  };
}
