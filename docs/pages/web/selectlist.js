// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import controlledComponentExample from '../../examples/selectlist/controlledComponentExample';
import customLabelVisibilityExample from '../../examples/selectlist/customLabelVisibilityExample';
import dontMixDropdownAndItemListInGroup from '../../examples/selectlist/dontMixDropdownAndItemListInGroup';
import dontUseIfAdditionalFeaturesNeeded from '../../examples/selectlist/dontUseIfAdditionalFeaturesNeeded';
import dontUseIfLessThanFourItems from '../../examples/selectlist/dontUseIfLessThanFourItems';
import errorMessageExample from '../../examples/selectlist/errorMessageExample';
import groupingRelatedOptionsExample from '../../examples/selectlist/groupingRelatedOptionsExample';
import helperTextExample from '../../examples/selectlist/helperTextExample';
import labelsWithBuiltInFeaturesExample from '../../examples/selectlist/labelsWithBuiltInFeaturesExample';
import largeSizeExample from '../../examples/selectlist/largeSizeExample';
import main from '../../examples/selectlist/main';
import maintainSelectionTypeForGroup from '../../examples/selectlist/maintainSelectionTypeForGroup';
import mediumSizeExample from '../../examples/selectlist/mediumSizeExample';
import orderItemsByAlphabetOrUsage from '../../examples/selectlist/orderItemsByAlphabetOrUsage';
import useForSimpleItemList from '../../examples/selectlist/useForSimpleItemList';

export default function DocsPage({
  generatedDocGen,
}: {
  generatedDocGen: { [string]: DocGen },
}): ReactNode {
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
                code={useForSimpleItemList}
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
                code={dontUseIfAdditionalFeaturesNeeded}
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
                code={orderItemsByAlphabetOrUsage}
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
                code={dontUseIfLessThanFourItems}
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
                code={maintainSelectionTypeForGroup}
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
                code={dontMixDropdownAndItemListInGroup}
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
              <SandpackExample
                code={labelsWithBuiltInFeaturesExample}
                name="Labels with Built-in Features Example"
              />
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
        <MainSection.Subsection columns={2} title="Size">
          <MainSection.Card
            cardSize="md"
            description={`Use \`lg\` as the recommended size within Pinterest products.`}
            sandpackExample={
              <SandpackExample code={largeSizeExample} layout="column" name="Large Size Example" />
            }
            title="Large"
          />

          <MainSection.Card
            cardSize="md"
            description={`Use \`md\` on denser surfaces, such as business products or internal tools.`}
            sandpackExample={
              <SandpackExample
                code={mediumSizeExample}
                layout="column"
                name="Medium Size Example"
              />
            }
            title="Medium"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`In some cases, the label for a SelectList is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure SelectList is properly labeled for screen readers while using a different element to represent the label visually.`}
          title="Label visibility"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={customLabelVisibilityExample}
                name="CustomLabel Visibility Example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Helper text should be used when additional description may be required to understand the SelectList. Common examples include text that is legally required to be displayed, or instructions to fill out a form (e.g. proper formatting). If the text is optional, [Tooltip](/web/tooltip) could be used instead."
          title="Helper text"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={helperTextExample} name="Helper Text Example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="SelectList must be used as a controlled component when the `placeholder` or `value` props are needed. When used in this manner, `onChange` and `value` are required, while `placeholder` is optional."
          title="Controlled component"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={controlledComponentExample}
                name="Controlled Component Example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="`errorMessage` should be used to denote an error state in SelectList and to provide a message for how the user can fix it."
          title="Error message"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={errorMessageExample} name="Error Message Example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="SelectList.Group can be used to group related options. Note that disabling a group disables all of its options."
          title="Groups"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={groupingRelatedOptionsExample}
                name="Grouping Related Options Example"
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

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: { [string]: DocGen } },
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(['SelectList', 'SelectListOption', 'SelectListGroup']),
    },
  };
}
