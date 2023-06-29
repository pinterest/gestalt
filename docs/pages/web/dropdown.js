// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import action from '../../examples/dropdown/action.js';
import badges from '../../examples/dropdown/badges.js';
import composability from '../../examples/dropdown/composability.js';
import customHeader from '../../examples/dropdown/customHeader.js';
import customItem from '../../examples/dropdown/customItem.js';
import doFeatures from '../../examples/dropdown/doFeatures.js';
import doIcons from '../../examples/dropdown/doIcons.js';
import dontCustom from '../../examples/dropdown/dontCustom.js';
import dontSelectList from '../../examples/dropdown/dontSelectList.js';
import dontTooltips from '../../examples/dropdown/dontTooltips.js';
import doOrder from '../../examples/dropdown/doOrder.js';
import link from '../../examples/dropdown/link.js';
import main from '../../examples/dropdown/main.js';
import mobile from '../../examples/dropdown/mobile.js';
import sections from '../../examples/dropdown/sections.js';
import subtext from '../../examples/dropdown/subtext.js';
import truncation from '../../examples/dropdown/truncation.js';

export default function ComponentPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.Dropdown?.displayName}>
      <PageHeader
        name={generatedDocGen?.Dropdown.displayName}
        description={generatedDocGen?.Dropdown.description}
      >
        <SandpackExample code={main} hideEditor name="Main Dropdown example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Dropdown} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Displaying a list of actions, options, or links. Usually displays 3 or more options.
- Allowing complex functionality that a [SelectList](/web/selectlist) can't accomplish.
- Taking immediate action or navigating users to another view.
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- In cases when there are less than 3 items in the list, and there is space to display all options. Consider [RadioGroup](/web/radiogroup) or [Checkboxes](/web/checkbox) instead.
- When it is desirable to filter a long list of options. Use [ComboBox](/web/combobox) instead.
- Displaying a list of actions or options using the browser's native select functionality. Use [SelectList](/web/selectlist) instead.
            `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Dropdown when features such as subtext, custom headers or badges are needed, since this functionality is not available in [SelectList](/web/selectlist)."
            sandpackExample={
              <SandpackExample
                code={doFeatures}
                name="simple list of items example"
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Dropdown for a simple list of items. Use [SelectList](/web/selectlist) instead for the added native mobile functionality. The exception to this is multiple Dropdowns or SelectLists that could be grouped together to create visual inconsistency, such as filters. In this case, use Dropdowns for all."
            sandpackExample={
              <SandpackExample
                code={dontSelectList}
                name="Don't simple list of items"
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
            description="Order the items in Dropdown either alphabetically or by usage. Place destructive actions at the bottom."
            sandpackExample={
              <SandpackExample code={doOrder} name="Do order items" layout="column" hideEditor />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Attach Tooltips to menu items. Use the \`subtext\` property if additional explanation is needed."
            sandpackExample={
              <SandpackExample
                code={dontTooltips}
                name="Don't tooltips"
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
            description={`Add an icon indicator when links are external using the \`isExternal\` prop. External links are either links outside of Pinterest or another sub-site of Pinterest.`}
            sandpackExample={
              <SandpackExample code={doIcons} name="Do icons" layout="column" hideEditor />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add custom elements within Dropdown. While some custom elements may be technically possible, it is best to avoid customization that becomes difficult to maintain."
            sandpackExample={
              <SandpackExample code={dontCustom} name="Don't custom" layout="column" hideEditor />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen.Dropdown?.displayName}>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
    Remember to include the following ARIA attributes on the element used for the \`anchor\` prop:

    * \`accessibilityControls\`: lets the screen reader know that this element controls the Dropdown menu (should match the \`id\` property passed to Dropdown). Populates the [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
    * \`accessibilityHaspopup\`: lets the screen reader know that there is a Dropdown menu linked to the trigger. Populates the [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
    * \`accessibilityExpanded\`: informs the screen reader whether the Dropdown menu is currently open or closed. Populates the [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
          `}
        />
        <MainSection.Subsection
          title="Keyboard interaction"
          description={`
    * Hitting \`Enter\` or \`Space\` key on the Dropdown's trigger opens the menu
    * \`Escape\` key closes the menu, while moving focus back on the Dropdown's trigger
    * Arrow keys are used to navigate items within the menu
    * \`Enter\` key selects an item within the Menu
    * \`Tab\` or \` Shift + Tab\` close the menu and move focus accordingly
          `}
        />
        <MainSection.Subsection
          title="Custom item content limitations"
          description={`
          If using custom content, do not include interactive elements, like a TextArea or Button. Because Dropdown.Item and Dropdown.Link already act as buttons and links respectively, they cannot include focusable elements as children. [Learn more about nested interactive controls](https://dequeuniversity.com/rules/axe/4.2/nested-interactive)
          `}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={customItem} name="Custom item example" />}
          />
        </MainSection.Subsection>
      </AccessibilitySection>
      <MainSection name="Localization">
        <MainSection.Subsection
          title="Truncation"
          description={`
      When the text of the Dropdown.Item becomes longer than the width of the menu, either intentionally or through localization, the text will truncate at one line. Subtext will wrap as needed to display the full text.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={truncation} name="Truncation example" layout="row" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.DropdownItem?.displayName}
          description={generatedDocGen?.DropdownItem?.description}
        >
          <GeneratedPropTable
            name={generatedDocGen?.DropdownItem.displayName}
            id={generatedDocGen?.DropdownItem.displayName}
            generatedDocGen={generatedDocGen.DropdownItem}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.DropdownLink?.displayName}
          description={generatedDocGen?.DropdownLink?.description}
        >
          <GeneratedPropTable
            name={generatedDocGen?.DropdownLink.displayName}
            id={generatedDocGen?.DropdownLink.displayName}
            generatedDocGen={generatedDocGen.DropdownLink}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title={generatedDocGen?.DropdownSection?.displayName}
          description={generatedDocGen?.DropdownSection?.description}
        >
          <GeneratedPropTable
            name={generatedDocGen?.DropdownSection.displayName}
            id={generatedDocGen?.DropdownSection.displayName}
            generatedDocGen={generatedDocGen.DropdownSection}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection title="Types of items" columns={2}>
          <MainSection.Card
            cardSize="md"
            title="Action/Selection"
            description={`Typically a Dropdown item triggers an action, like “Hide a Pin”, or makes a selection, like “Cozy” for a layout setting. Use Dropdown.Item for these use cases. \`onSelect\` handles the user interaction, with the optional \`selected\` indicating the currently-selected item.`}
            sandpackExample={
              <SandpackExample code={action} name="Action example" layout="column" />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Link"
            description={`If an item navigates to a new page, use Dropdown.Link with the required \`href\` prop. If the item navigates to a page outside of the current context, (either a non-Pinterest site or a different Pinterest sub-site), the \`isExternal\` prop should also be specified to display the "up-right" icon. Optional additional actions to be taken on navigation are handled by \`onClick\`. Dropdown.Link can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
            `}
            sandpackExample={<SandpackExample code={link} name="Link example" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sections"
          description="Dropdown can also be composed of Dropdown.Section(s), which simply require a label. Use Dropdown.Section(s) to create hierarchy within a single Dropdown. Dropdown.Sections, Dropdown.Items and Dropdown.Links can be mixed as needed."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={sections} name="Sections example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Custom header"
          description={`Dropdown can also contain a custom header by specifying \`headerContent\`, which always appears at the very top of the menu. It can be used instead of a section header if the menu contains only one type of content that needs additional description. It can contain anything, but most often will contain just text and/or a link.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={customHeader} name="Custom header example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Subtext"
          description={`Each Dropdown item can also contain \`subtext\` below the label. This \`subtext\` will wrap if needed. Use this text to add an additional description of the Dropdown item.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={subtext} name="Subtext example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Badges"
          description={`A [Badge](/web/badge) can be used to indicate a new product surface or feature within the Dropdown using \`badgeText\`. Multiple badges within a Dropdown should be avoided when possible.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={badges} name="Badges example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Custom item content"
          description={`
      If needed, users can supply custom content to each Dropdown.Item or Dropdown.Link. This can be useful when extra functionality is needed, like showing an Avatar. However, please use with caution and only when absolutely necessary.

      To ensure the entire width of the item is clickable, you will likely need to surround your custom content with a full-width Box.
          `}
        >
          <SlimBanner
            iconAccessibilityLabel="Localize the default label"
            message="Accessibility note: custom content cannot include interactive elements, like a TextArea or Button. Because Dropdown.Item and Dropdown.Link already act as buttons and links respectively, they cannot include focusable elements as children."
            type="info"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about nested interactive elements',
              href: 'https://dequeuniversity.com/rules/axe/4.2/nested-interactive',
              onClick: () => {},
            }}
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={customItem} name="Composability example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Subcomponent composability"
          description={`
Under the hood, Dropdown executes two actions: recognizing subcomponents by display name and sequencially indexing each subcomponent for keyboard navigation.

Dropdown requires its own subcomponents as children to build the list of actions.

When building a Dropdown, we might want to render different combinations of subcomponents conditionally. Dropdown supports simple conditional rendering of subcomponents lists wrapped in [React.Fragment](https://reactjs.org/docs/fragments.html) as well as consecutive arrays of subcomponent arrays. See the example below which illustrates both of these cases. More logic complexity might break the correct Dropdown behavior.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={composability} name="Custom item example" />}
          />
        </MainSection.Subsection>

        <MainSection
          name="Mobile"
          description={`Dropdown requires [DeviceTypeProvider](/web/utilities/devicetypeprovider) to enable its mobile user interface. The example below shows the mobile platform UI and its implementation.

SheetMobile has animation. To learn more about Dropdown.Link´s \`mobileOnDismissStart\`, see the [animation variant in SheetMobile](https://deploy-preview-2879--gestalt.netlify.app/web/sheetmobile#Animation). \`mobileOnDismissStart\` is the equivalent of \`onDismissStart\` in SheetMobile.
`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={mobile} name="Mobile example" layout="mobileRow" />
            }
          />
        </MainSection>
      </MainSection>

      <QualityChecklist component={generatedDocGen.Dropdown?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/web/button), [IconButton](/web/iconbutton)**
It is most common to anchor Dropdown to Button or IconButton.

**[ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer)**
ScrollableContainer is needed for proper positioning when the Dropdown is located within a scrolling container. The use of ScrollableContainer ensures the Dropdown remains attached to its anchor when scrolling.

**[SelectList](/web/selectlist)**
If users need to select from a short, simple list (without needing sections, subtext details, or the ability to filter the list), use SelectList.

**[ComboBox](/web/combobox)**
If users need the ability to choose an option by typing in an input and filtering a long list of options, use ComboBox.

**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.
          `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipleDocGen([
    'Dropdown',
    'DropdownItem',
    'DropdownLink',
    'DropdownSection',
  ]);

  docGen.Dropdown.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof DropdownItem | typeof DropdownSection>>';
  docGen.DropdownSection.props.children.flowType.raw =
    'React.ChildrenArray<React.Element<typeof DropdownItem | typeof DropdownSection>>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
