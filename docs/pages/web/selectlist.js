// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import controlledComponentExample from '../../examples/selectlist/controlledComponentExample.js';
import customLabelVisibilityExample from '../../examples/selectlist/customLabelVisibilityExample.js';
import dontMixDropdownAndItemListInGroup from '../../examples/selectlist/dontMixDropdownAndItemListInGroup.js';
import dontUseIfAdditionalFeaturesNeeded from '../../examples/selectlist/dontUseIfAdditionalFeaturesNeeded.js';
import dontUseIfLessThanFourItems from '../../examples/selectlist/dontUseIfLessThanFourItems.js';
import errorMessageExample from '../../examples/selectlist/errorMessageExample.js';
import groupingRelatedOptionsExample from '../../examples/selectlist/groupingRelatedOptionsExample.js';
import helperTextExample from '../../examples/selectlist/helperTextExample.js';
import labelsWithBuiltInFeaturesExample from '../../examples/selectlist/labelsWithBuiltInFeaturesExample.js';
import largeSizeExample from '../../examples/selectlist/largeSizeExample.js';
import main from '../../examples/selectlist/main.js';
import maintainSelectionTypeForGroup from '../../examples/selectlist/maintainSelectionTypeForGroup.js';
import mediumSizeExample from '../../examples/selectlist/mediumSizeExample.js';
import orderItemsByAlphabetOrUsage from '../../examples/selectlist/orderItemsByAlphabetOrUsage.js';
import useForSimpleItemList from '../../examples/selectlist/useForSimpleItemList.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen?.SelectList?.displayName}>
      <PageHeader
        name={generatedDocGen?.SelectList?.displayName}
        description={generatedDocGen?.SelectList?.description}
      >
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.SelectList?.displayName} example`}
          previewHeight={150}
          layout="column"
          hideEditor
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.SelectList} />
      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.SelectListOption?.displayName}
          description={generatedDocGen?.SelectListOption?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SelectListOption}
            id="SelectList.Option"
            name="SelectList.Option"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title={generatedDocGen?.SelectListGroup?.displayName}
          description={generatedDocGen?.SelectListGroup?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.SelectListGroup}
            id="SelectList.Group"
            name="SelectList.Group"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - When presenting users with a list of options that utilizes the native select functionality of the browser or device.
          - When presenting users with a list of options to choose from, like display settings.
        `}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When more than 10 options are presented and the ability to filter the list would be beneficial. Use [ComboBox](/web/combobox) instead.
          - When extra functionality, like groups, subtext or badges, is needed. Use [Dropdown](/web/dropdown) instead.
          - When the options are links and navigate users to different places. Use [Dropdown](/web/dropdown) instead.
          `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use SelectList when the user needs to select from a simple list of items."
            sandpackExample={
              <SandpackExample
                name="Use For Simple Item List"
                code={useForSimpleItemList}
                layout="column"
                hideEditor
              />
            }
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SelectList when additional functionality such as subtext or images are needed. Use [Dropdown](/web/dropdown) instead."
            sandpackExample={
              <SandpackExample
                name="Don't Use If Additional Features Needed"
                code={dontUseIfAdditionalFeaturesNeeded}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Order the list items in SelectList either alphabetically or by usage."
            sandpackExample={
              <SandpackExample
                name="Order Items By Alphabet or Usage"
                code={orderItemsByAlphabetOrUsage}
                layout="column"
                hideEditor
              />
            }
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SelectList if there are fewer than 4 items in the list and there is space to display all options. Use [RadioGroup](/web/radiogroup) instead."
            sandpackExample={
              <SandpackExample
                name="Don't Use If Less Than Four Items"
                code={dontUseIfLessThanFourItems}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep the same type of selection for a group of items. An example of this might be a filter bar. If some items could use SelectList and some items need to use [Dropdown](/web/dropdown), use Dropdown for all the items in the group."
            sandpackExample={
              <SandpackExample
                name="Maintain Selection Type For Group"
                code={maintainSelectionTypeForGroup}
                layout="column"
                hideEditor
              />
            }
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mix [Dropdown](/web/dropdown) and SelectList in a group of items."
            sandpackExample={
              <SandpackExample
                name="Don't Mix Dropdown and Item List in Group"
                code={dontMixDropdownAndItemListInGroup}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.SelectList?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      SelectList comes with [Label](/web/label) built-in: just use the \`label\` prop. We strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct SelectList.

      If SelectList is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Labels with Built-in Features Example"
                code={labelsWithBuiltInFeaturesExample}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>
      <MainSection name="Variants">
        <MainSection.Subsection title="Size" columns={2}>
          <MainSection.Card
            cardSize="md"
            title="Large"
            description={`Use \`lg\` as the recommended size within Pinterest products.`}
            sandpackExample={
              <SandpackExample name="Large Size Example" code={largeSizeExample} layout="column" />
            }
          />

          <MainSection.Card
            cardSize="md"
            title="Medium"
            description={`Use \`md\` on denser surfaces, such as business products or internal tools.`}
            sandpackExample={
              <SandpackExample
                name="Medium Size Example"
                code={mediumSizeExample}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a SelectList is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure SelectList is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="CustomLabel Visibility Example"
                code={customLabelVisibilityExample}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Helper text"
          description="Helper text should be used when additional description may be required to understand the SelectList. Common examples include text that is legally required to be displayed, or instructions to fill out a form (e.g. proper formatting). If the text is optional, [Tooltip](/web/tooltip) could be used instead."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Helper Text Example" code={helperTextExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Controlled component"
          description="SelectList must be used as a controlled component when the `placeholder` or `value` props are needed. When used in this manner, `onChange` and `value` are required, while `placeholder` is optional."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Controlled Component Example"
                code={controlledComponentExample}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Error message"
          description="`errorMessage` should be used to denote an error state in SelectList and to provide a message for how the user can fix it."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Error Message Example" code={errorMessageExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Groups"
          description="SelectList.Group can be used to group related options. Note that disabling a group disables all of its options."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Grouping Related Options Example"
                code={groupingRelatedOptionsExample}
              />
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

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(['SelectList', 'SelectListOption', 'SelectListGroup']),
    },
  };
}
