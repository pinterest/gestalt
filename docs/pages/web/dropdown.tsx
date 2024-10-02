import { BannerSlim } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import action from '../../examples/dropdown/action';
import badges from '../../examples/dropdown/badges';
import composability from '../../examples/dropdown/composability';
import customHeader from '../../examples/dropdown/customHeader';
import customItem from '../../examples/dropdown/customItem';
import disabled from '../../examples/dropdown/disabled';
import doFeatures from '../../examples/dropdown/doFeatures';
import doIcons from '../../examples/dropdown/doIcons';
import dontCustom from '../../examples/dropdown/dontCustom';
import dontSelectList from '../../examples/dropdown/dontSelectList';
import dontTooltips from '../../examples/dropdown/dontTooltips';
import doOrder from '../../examples/dropdown/doOrder';
import link from '../../examples/dropdown/link';
import localizationLabels from '../../examples/dropdown/localizationLabels';
import main from '../../examples/dropdown/main';
import mobile from '../../examples/dropdown/mobile';
import sections from '../../examples/dropdown/sections';
import subtext from '../../examples/dropdown/subtext';

const DOC_NAMES = ['Dropdown', 'DropdownItem', 'DropdownLink', 'DropdownSection'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function ComponentPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen.Dropdown?.displayName}>
      <PageHeader
        description={generatedDocGen?.Dropdown.description}
        name={generatedDocGen?.Dropdown.displayName}
      >
        <SandpackExample code={main} hideEditor name="Main Dropdown example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Dropdown} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Displaying a list of actions, options, or links. Usually displays 3 or more options.
- Allowing complex functionality that a [SelectList](/web/selectlist) can't accomplish.
- Taking immediate action or navigating users to another view.
            `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- In cases when there are less than 3 items in the list, and there is space to display all options. Consider [RadioGroup](/web/radiogroup) or [Checkboxes](/web/checkbox) instead.
- When it is desirable to filter a long list of options. Use [ComboBox](/web/combobox) instead.
- Displaying a list of actions or options using the browser's native select functionality. Use [SelectList](/web/selectlist) instead.
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
            description="Use Dropdown when features such as subtext, custom headers or badges are needed, since this functionality is not available in [SelectList](/web/selectlist)."
            sandpackExample={
              <SandpackExample
                code={doFeatures}
                hideEditor
                layout="column"
                name="simple list of items example"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Dropdown for a simple list of items. Use [SelectList](/web/selectlist) instead for the added native mobile functionality. The exception to this is multiple Dropdowns or SelectLists that could be grouped together to create visual inconsistency, such as filters. In this case, use Dropdowns for all."
            sandpackExample={
              <SandpackExample
                code={dontSelectList}
                hideControls
                hideEditor
                layout="column"
                name="Don't simple list of items"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Order the items in Dropdown either alphabetically or by usage. Place destructive actions at the bottom."
            sandpackExample={
              <SandpackExample code={doOrder} hideEditor layout="column" name="Do order items" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Attach Tooltips to menu items. Use the \`subtext\` property if additional explanation is needed."
            sandpackExample={
              <SandpackExample
                code={dontTooltips}
                hideControls
                hideEditor
                layout="column"
                name="Don't tooltips"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`Add an icon indicator when links are external using the \`isExternal\` prop. External links are either links outside of Pinterest or another sub-site of Pinterest.`}
            sandpackExample={
              <SandpackExample code={doIcons} hideEditor layout="column" name="Do icons" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Add custom elements within Dropdown. While some custom elements may be technically possible, it is best to avoid customization that becomes difficult to maintain."
            sandpackExample={
              <SandpackExample code={dontCustom} hideEditor layout="column" name="Don't custom" />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen.Dropdown?.displayName}>
        <MainSection.Subsection
          description={`
    Remember to include the following ARIA attributes on the element used for the \`anchor\` prop:

    * \`accessibilityControls\`: lets the screen reader know that this element controls the Dropdown menu (should match the \`id\` property passed to Dropdown). Populates the [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
    * \`accessibilityHaspopup\`: lets the screen reader know that there is a Dropdown menu linked to the trigger. Populates the [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
    * \`accessibilityExpanded\`: informs the screen reader whether the Dropdown menu is currently open or closed. Populates the [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) attribute.
          `}
          title="ARIA attributes"
        />
        <MainSection.Subsection
          description={`
    * Hitting \`Enter\` or \`Space\` key on the Dropdown's trigger opens the menu
    * \`Escape\` key closes the menu, while moving focus back on the Dropdown's trigger
    * Arrow keys are used to navigate items within the menu
    * \`Enter\` key selects an item within the Menu
    * \`Tab\` or \` Shift + Tab\` close the menu and move focus accordingly
          `}
          title="Keyboard interaction"
        />
        <MainSection.Subsection
          description={`
          If using custom content, do not include interactive elements, like a TextArea or Button. Because Dropdown.Item and Dropdown.Link already act as buttons and links respectively, they cannot include focusable elements as children. [Learn more about nested interactive controls](https://dequeuniversity.com/rules/axe/4.2/nested-interactive)
          `}
          title="Custom item content limitations"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={customItem} name="Custom item example" />}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.DropdownItem?.displayName}
        notes={`
When the text of the Dropdown.Item becomes longer than the width of the menu, either intentionally or through localization, the text will truncate at one line. Subtext will wrap as needed to display the full text.`}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.DropdownItem?.description}
          title={generatedDocGen?.DropdownItem?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.DropdownItem}
            id={generatedDocGen?.DropdownItem.displayName}
            name={generatedDocGen?.DropdownItem.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.DropdownLink?.description}
          title={generatedDocGen?.DropdownLink?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.DropdownLink}
            id={generatedDocGen?.DropdownLink.displayName}
            name={generatedDocGen?.DropdownLink.displayName}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={generatedDocGen?.DropdownSection?.description}
          title={generatedDocGen?.DropdownSection?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.DropdownSection}
            id={generatedDocGen?.DropdownSection.displayName}
            name={generatedDocGen?.DropdownSection.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection columns={2} title="Types of items">
          <MainSection.Card
            cardSize="md"
            description={`Typically a Dropdown item triggers an action, like “Hide a Pin”, or makes a selection, like “Cozy” for a layout setting. Use Dropdown.Item for these use cases. \`onSelect\` handles the user interaction, with the optional \`selected\` indicating the currently-selected item.`}
            sandpackExample={
              <SandpackExample code={action} layout="column" name="Action example" />
            }
            title="Action/Selection"
          />
          <MainSection.Card
            cardSize="md"
            description={`If an item navigates to a new page, use Dropdown.Link with the required \`href\` prop. If the item navigates to a page outside of the current context, (either a non-Pinterest site or a different Pinterest sub-site), the \`isExternal\` prop should also be specified to display the "up-right" icon. Optional additional actions to be taken on navigation are handled by \`onClick\`. Dropdown.Link can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
            `}
            sandpackExample={<SandpackExample code={link} layout="column" name="Link example" />}
            title="Link"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Dropdown items can be marked as `disabled`. They will not receive focus and will appear inactive."
          title="Disabled"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={disabled} name="Sections example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Dropdown can also be composed of Dropdown.Section(s), which simply require a label. Use Dropdown.Section(s) to create hierarchy within a single Dropdown. Dropdown.Sections, Dropdown.Items and Dropdown.Links can be mixed as needed."
          title="Sections"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={sections} name="Sections example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Dropdown can also contain a custom header by specifying \`headerContent\`, which always appears at the very top of the menu. It can be used instead of a section header if the menu contains only one type of content that needs additional description. It can contain anything, but most often will contain just text and/or a link.`}
          title="Custom header"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={customHeader} name="Custom header example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Each Dropdown item can also contain \`subtext\` below the label. This \`subtext\` will wrap if needed. Use this text to add an additional description of the Dropdown item.`}
          title="Subtext"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={subtext} name="Subtext example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`A [Badge](/web/badge) can be used to indicate a new product surface or feature within the Dropdown using \`badgeText\`. Multiple badges within a Dropdown should be avoided when possible.`}
          title="Badges"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={badges} name="Badges example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
      If needed, users can supply custom content to each Dropdown.Item or Dropdown.Link. This can be useful when extra functionality is needed, like showing an Avatar. However, please use with caution and only when absolutely necessary.

      To ensure the entire width of the item is clickable, you will likely need to surround your custom content with a full-width Box.
          `}
          title="Custom item content"
        >
          <BannerSlim
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about nested interactive elements',
              href: 'https://dequeuniversity.com/rules/axe/4.2/nested-interactive',
              onClick: () => {},
            }}
            iconAccessibilityLabel="Localize the default label"
            message="Accessibility note: custom content cannot include interactive elements, like a TextArea or Button. Because Dropdown.Item and Dropdown.Link already act as buttons and links respectively, they cannot include focusable elements as children."
            type="info"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={customItem} name="Composability example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Under the hood, Dropdown executes two actions: recognizing subcomponents by display name and sequencially indexing each subcomponent for keyboard navigation.

Dropdown requires its own subcomponents as children to build the list of actions.

When building a Dropdown, we might want to render different combinations of subcomponents conditionally. Dropdown supports simple conditional rendering of subcomponents lists wrapped in [React.Fragment](https://reactjs.org/docs/fragments.html) as well as consecutive arrays of subcomponent arrays. See the example below which illustrates both of these cases. More logic complexity might break the correct Dropdown behavior.
          `}
          title="Subcomponent composability"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={composability} name="Custom item example" />}
          />
        </MainSection.Subsection>

        <MainSection
          description={`Dropdown requires [DeviceTypeProvider](/web/utilities/devicetypeprovider) to enable its mobile user interface. The example below shows the mobile platform UI and its implementation.

SheetMobile has animation. To learn more about Dropdown.Link´s \`mobileOnDismissStart\`, see the [animation variant in SheetMobile](/web/sheetmobile#Animation). \`mobileOnDismissStart\` is the equivalent of \`onDismissStart\` in SheetMobile.
`}
          name="Mobile"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={mobile} layout="mobileRow" name="Mobile example" />
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
          `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  const docGen = await multipleDocGen(DOC_NAMES);

  docGen.Dropdown.props.children.tsType.raw = 'React.ChildrenArray<React.ReactElement>';
  docGen.DropdownSection.props.children.tsType.raw = 'React.ChildrenArray<React.ReactElement>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
