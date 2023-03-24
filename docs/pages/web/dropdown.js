// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { multipledocgen, type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import customItem from '../../examples/dropdown/customItem.js';

export default function DropdownPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.Dropdown?.displayName}>
      <PageHeader
        name={generatedDocGen.Dropdown?.displayName}
        description={generatedDocGen.Dropdown?.description}
        defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex height="100%" justifyContent="center">
      <Button
        accessibilityControls="demo-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="demo-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'item 1', label: 'Item 1' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{
              value: 'item 2',
              label: 'Item 2 with a really long, detailed, complex name',
            }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{
              value: 'item 3',
              label: 'Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: 'item 4', label: 'Item 4' }}
            selected={selected}
          />
          <Dropdown.Link
            badge={{ text: 'New' }}
            href="https://pinterest.com"
            isExternal
            option={{ value: 'item 5', label: 'Item 5 with a really long, detailed name' }}
          />
          <Dropdown.Link
            href="/combobox"
            option={{ value: 'item 6', label: 'Item 6 navigates internally' }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}


        `}
      />

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
            defaultCode={`
      function BestPracticeDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const onSelect = ({ item }) => setSelected(item);

        return (
          <Flex justifyContent="center">
            <Button
              accessibilityControls="selectlist-dropdown-example1"
              accessibilityExpanded={open}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpen((prevVal) => !prevVal)}
              ref={anchorRef}
              selected={open}
              size="lg"
              text="Menu"
            />
            {open && (
              <Dropdown anchor={anchorRef.current} id="selectlist-dropdown-example1" onDismiss={() => setOpen(false)}>
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: "item 1", label: "Item 1" }}
                  selected={selected}
                />
                <Dropdown.Item
                  onSelect={onSelect}
                  option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
                  selected={selected}
                />
                <Dropdown.Link
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
                />
                <Dropdown.Item
                  badge={{ text: 'New' }}
                  onSelect={onSelect}
                  option={{ value: "item 4", label: "Item 4" }}
                  selected={selected}
                />
                <Dropdown.Link
                  badge={{ text: 'New' }}
                  href="https://pinterest.com"
                  isExternal
                  option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
                />
                <Dropdown.Link
                  href="/combobox"
                  option={{ value: "item 6", label: "Item 6 navigates internally" }}
                />
              </Dropdown>
            )}
          </Flex>
        );
      }`}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Dropdown for a simple list of items. Use [SelectList](/web/selectlist) instead for the added native mobile functionality. The exception to this is multiple Dropdowns or SelectLists that could be grouped together to create visual inconsistency, such as filters. In this case, use Dropdowns for all."
            defaultCode={`
    function SimpleListDropdownExample() {
      const [open, setOpen] = React.useState(false);
      const [selected, setSelected] = React.useState(null);
      const anchorRef = React.useRef(null);
      const onSelect = ({ item }) => setSelected(item);

      return (
        <Flex justifyContent="center">
          <Button
            accessibilityControls="selectlist-dropdown-example2"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
            text="Date range"
          />
          {open && (
            <Dropdown anchor={anchorRef.current} id="selectlist-dropdown-example2" onDismiss={() => setOpen(false)}>
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 1", label: "Last 7 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 2", label: "Last 14 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 3", label: "Last 21 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 4", label: "Last 30 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 5", label: "Last 60 days" }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={onSelect}
                option={{ value: "item 6", label: "Last 90 days" }}
                selected={selected}
              />
            </Dropdown>
          )}
        </Flex>
          );
        }`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Order the items in Dropdown either alphabetically or by usage. Place destructive actions at the bottom."
            defaultCode={`
function OrderDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="selectlist-dropdown-example3"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Menu"
        bgColor="lightGray"
        icon="ellipsis"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="selectlist-dropdown-example3" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Download image", label: "Download image" }}
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: "Hide Pin", label: "Hide Pin" }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{ value: "Report Pin", label: "Report Pin" }}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Delete Pin", label: "Delete Pin" }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Attach Tooltips to menu items. Use the \`subtext\` property if additional explanation is needed."
            defaultCode={`
function NoTooltipsDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="tooltips-dropdown-example"
        accessibilityHaspopup
        accessibilityExpanded={open}
        iconEnd="arrow-down"
        text="Menu"
        ref={anchorRef}
        selected={open}
        size="lg"
        onClick={ () => setOpen((prevVal) => !prevVal) }
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="tooltips-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Download image", label: "Download image" }}
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: "Hide Pin", label: "Hide Pin" }}
            selected={selected}
          >
            <Box width="100%">
              <Tooltip text="Hides this Pin for this account only">
                <Text>Hide Pin</Text>
              </Tooltip>
            </Box>
          </Dropdown.Item>
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{ value: "Report Pin", label: "Report Pin" }}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Delete Pin", label: "Delete Pin" }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`Add an icon indicator when links are external using the \`isExternal\` prop. External links are either links outside of Pinterest or another sub-site of Pinterest.`}
            defaultCode={`
function ExternalLinksDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="do-icon-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="do-icon-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Settings", label: "Settings" }}
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: "Report a bug", label: "Report a bug" }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: "Get help", label: "Get help" }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add custom elements within Dropdown. While some custom elements may be technically possible, it is best to avoid customization that becomes difficult to maintain."
            defaultCode={`
function CustomContentDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="dont-custom-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="dont-custom-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: "Settings", label: "Settings" }}
            selected={selected}
          />
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{ value: "Report a bug", label: "Report a bug" }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: "Get help", label: "Get help" }}
          >
            <Icon accessibilityLabel="Ad" color="default" icon="ad"/>
            <Text>Get help</Text>
          </Dropdown.Link>
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{ value: "See terms and privacy", label: "See terms and privacy" }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
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
            defaultCode={`
function TruncationDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item.value === (selected || {}).value ? null : item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="truncation-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="truncation-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{
              value: 'Homefeed anpassen',
              label: 'Homefeed anpassen',
              subtext:
                'Aktualisieren Sie Ihren Homefeed, um Ihre Vorlieben und Ideen besser widerzuspiegeln',
            }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            option={{ value: 'Hilfe anfordern', label: 'Hilfe anfordern' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{
              value: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
              label: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
            }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
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
            defaultCode={`
function ActionDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="action-variant-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text={selected ? selected.label : 'Display'}
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="action-variant-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Cozy', label: 'Cozy' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Comfy', label: 'Comfy' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
          <MainSection.Card
            cardSize="md"
            title="Link"
            description={`If an item navigates to a new page, use Dropdown.Link with the required \`href\` prop. If the item navigates to a page outside of the current context, (either a non-Pinterest site or a different Pinterest sub-site), the \`isExternal\` prop should also be specified to display the "up-right" icon. Optional additional actions to be taken on navigation are handled by \`onClick\`. Dropdown.Link can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider) to learn more about link navigation.
            `}
            defaultCode={`
function LinkDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="link-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="arrow-down"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="link-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Link
            href="https://pinterest.com"
            option={{ value: 'Create new board', label: 'Create new board' }}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            onClick={() => { /* log click here */ }}
            option={{ value: 'Get help', label: 'Get help' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            option={{ value: 'See terms and privacy', label: 'See terms and privacy' }}
          />
        </Dropdown>
      )}
    </Flex>
  );
}`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sections"
          description="Dropdown can also be composed of Dropdown.Section(s), which simply require a label. Use Dropdown.Section(s) to create hierarchy within a single Dropdown. Dropdown.Sections, Dropdown.Items and Dropdown.Links can be mixed as needed."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SectionsIconButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected((selected) => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="sections-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="sections-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Custom header"
          description={`Dropdown can also contain a custom header by specifying \`headerContent\`, which always appears at the very top of the menu. It can be used instead of a section header if the menu contains only one type of content that needs additional description. It can contain anything, but most often will contain just text and/or a link.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function CustomHeaderExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="header-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          headerContent={
            <Text align="start" size="100">
              This Pin was inspired by your{' '}
              <Text weight="bold" size="100">
                <Link href="https://pinterest.com">recent activity</Link>
              </Text>
            </Text>
          }
          id="header-dropdown-example"
          onDismiss={() => {
            setOpen(false);
          }}
        >
          <Dropdown.Item
            onSelect={() => alert('Pin has been hidden')}
            option={{ value: 'item 1', label: 'Hide Pin' }}
            selected={selected}
          />
          <Dropdown.Link
            href="https://pinterest.com"
            isExternal
            option={{
              value: 'item 2',
              label: 'Report Pin',
            }}
            selected={selected}
          />
          <Dropdown.Section label="View options">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'item 3', label: 'Default' }}
              selected={selected}
            />
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'item 4', label: 'Compact' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'item 5', label: 'List' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
            `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Subtext"
          description={`Each Dropdown item can also contain \`subtext\` below the label. This \`subtext\` will wrap if needed. Use this text to add an additional description of the Dropdown item.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SubtextDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({item}) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="subtext-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="arrow-down"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="subtext-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Section label="Accounts">
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Pepper the Pupper',
                label: 'Pepper the Pupper',
                subtext: 'pepper@thepupper.com',
              }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Mizu the Kitty',
                label: 'Mizu the Kitty',
                subtext: 'mizu@thekitty.com',
              }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="More options">
            <Dropdown.Item
              onSelect={onSelect}
              option={{
                value: 'Settings',
                label: 'Settings',
              }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Tune your home feed', label: 'Tune your home feed' }}
              selected={selected}
            />
            <Dropdown.Link
              href="https://pinterest.com"
              isExternal
              option={{ value: 'Get help', label: 'Get help' }}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
            `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Badges"
          description={`A [Badge](/web/badge) can be used to indicate a new product surface or feature within the Dropdown using \`badgeText\`. Multiple badges within a Dropdown should be avoided when possible.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function BadgesDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const onSelect = ({item}) => {
    if (selected.some(({ value }) => value === item.value )) {
      setSelected((selected) => selected.filter(({ value }) => value != item.value));
    } else {
      setSelected(selected => [...selected, item]);
    }
  };

  return (
    <Flex justifyContent="center">
      <IconButton
        accessibilityControls="badges-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="badges-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
            `}
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
            sandpackExample={<SandpackExample code={customItem} name="Custom item example" />}
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
            defaultCode={`
            function Example() {
  const [open, setOpen] = React.useState(false);
  const [switched, setSwitched] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center" direction="column" gap={4}>
      <Box display="flex" alignItems="center">
        <Box paddingX={2}>
          <Label htmlFor="dropdown-example">
            <Text>Toggle Dropdown subcomponents</Text>
          </Label>
        </Box>
        <Switch
          onChange={() => setSwitched((value) => !value)}
          id="dropdown-example"
          switched={switched}
        />
      </Box>
      <IconButton
        accessibilityControls="custom-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="More Options"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="custom-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          {switched ? (
            <React.Fragment>
              <Dropdown.Link isExternal option={{ value: 'item 1', label: 'Custom link 1' }}>
                <Box width="100%">
                  <Text>
                    <Link hoverStyle="none" href="https://pinterest.com" target="blank">
                      Custom link 1
                    </Link>
                  </Text>
                </Box>
              </Dropdown.Link>
              <Dropdown.Link isExternal option={{ value: 'item 2', label: 'Another custom link' }}>
                <Box width="100%">
                  <Text>
                    <Link hoverStyle="none" href="https://google.com" target="blank">
                      Another custom link
                    </Link>
                  </Text>
                </Box>
              </Dropdown.Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {[1, 2, 3, 4, 5, 6].map((x) => (
                <Dropdown.Item
                  key={x}
                  onSelect={() => {}}
                  option={{ value: x.toString(), label: x.toString() }}
                />
              ))}
              {[7, 8, 9, 10, 11, 12].map((x) => (
                <Dropdown.Item
                  key={x}
                  onSelect={() => {}}
                  option={{ value: x.toString(), label: x.toString() }}
                />
              ))}
            </React.Fragment>
          )}
        </Dropdown>
      )}
    </Flex>
  );
}

            `}
          />
        </MainSection.Subsection>
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

**[OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
          `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipledocgen({
    componentName: ['Dropdown', 'DropdownItem', 'DropdownLink', 'DropdownSection'],
  });

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
