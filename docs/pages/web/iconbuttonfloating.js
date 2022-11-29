// @flow strict
import { type Node } from 'react';
import { IconButton, SlimBanner } from 'gestalt';
import CombinationNew from '../../docs-components/CombinationNew.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Page from '../../docs-components/Page.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
      function FABExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);

  const onSelect = ({ item }) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButtonFloating
        accessibilityControls="sections-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Create Pin Menu"
        icon="add"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
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
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Interface space is limited. Prioritize using a [Button](/web/button) if space is available.
- Triggering a [Modal](/web/modal) to complete a related task.
- Creating visual separation of actions in text-heavy content.
- Lower-emphasis actions that don't impede users from completing a task.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Displaying icons that don't have actions associated with them. Use an [Icon](/web/icon) instead.
- Displaying multiple IconButtons on a surface that uses the same icon for different actions.
- Text is better suited to convey the action and/or the icon isn't quickly recognizable by users.
- Destructive, high-emphasis actions, e.g "delete", "remove".
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use IconButton to perform low-emphasis actions, such as opening a [Modal](/web/modal) to edit a board."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Pair IconButton with a regular button to perform a high-emphasis action. IconButton should be a secondary action among regular buttons."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description='Consider grouping multiple actions in an "ellipsis" IconButton to avoid distraction with an overload of icons.'
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Display more than 4 icon buttons in a single row as it can cause cognitive load and usability issues."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Display a [Tooltip](/web/tooltip) in conjunction with IconButton to provide context when the icon alone would be insufficient to convey the purpose of the button."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add an IconButton on top of images unless it has a background that ensures easy readability and accessible contrast. Check the [background color](#Color) variant to learn more."
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
IconButton conveys the component behavior using iconography. IconButton requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/web/icon). In the example below, the screen reader reads: "Create Pin menu". **The label should describe the intent of the action, not the Icon itself.** For example, use "Edit board" instead of "Pencil".

If IconButton is used as a control button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that IconButton controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to IconButton. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
        >
          <MainSection.Card cardSize="lg" />
          <MainSection.Subsection
            title="Keyboard interaction"
            description={`
The default behaviour for IconButton is to be focusable in sequential keyboard navigation in the order defined by the document's source order.

Use \`tabIndex\` to remove IconButton from the sequential keyboard navigation to improve accessibility. The example below shows a common use case when two consecutive and visually different elements perform the same action. One of them, in this case IconButton, can be removed from keyboard navigation to prevent screen readers from announcing the same interaction twice.
If IconButton is disabled, it's also unreachable from keyboard navigation.`}
          />
          <MainSection.Card cardSize="lg" />
        </MainSection.Subsection>
      </AccessibilitySection>
      <MainSection name="Localization" description="Be sure to localize `accessibilityLabel`.">
        <SlimBanner
          iconAccessibilityLabel="Localize the default label"
          message="IconButtons with link role announce to assistive technologies that the link opens in a new tab when setting target to 'blank'. Localize the default label with DefaultLabelProvider."
          type="recommendationBare"
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
        />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Role"
          columns={2}
          description="IconButton can be use for navigation or actions."
        >
          <MainSection.Card
            cardSize="md"
            title="role = link"
            description={`If IconButton acts as a link, set \`role = link\` and pass role-specific [props](#role_linkProps).

\`target\` is optional and defines the frame or window to open the anchor defined on href:
* "null" opens the anchor in the same window.
* "blank" opens the anchor in a new window. IconButtons announce to assistive technologies that the link opens in a new tab. Localize the default label with [DefaultLabelProvider](/web/utilities/defaultlabelprovider).
* "self" opens an anchor in the same frame.

\`rel\` is optional. Use "nofollow" for external links to specify to web crawlers not follow the link.

IconButtons that act as links can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider) to learn more about link navigation.`}
          />
          <MainSection.Card
            cardSize="md"
            title="role = button"
            description="If IconButton acts as a button, pass role-specific [props](#role_buttonProps)."
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Size"
          description={`IconButton is available in 5 fixed sizes:

1. \`xl\` (56px)
    Extra large IconButtons should be used sparingly and only in places where the UI has a case for an extra-large IconButton.
2. \`lg\` (48px)
    Large is the only size that should be used on Pinner surfaces.
3. \`md\` (40px)
    Medium is the size used on more dense UI such as business surfaces or internal tools.
4. \`sm\` (32px)
    Small IconButton should be used sparingly and only in places where the UI is very dense.
5. \`xs\` (24px)
    Use sparingly and only in places where the UI is very dense or has a case for an extra-small IconButton as they can be hard to see for people with visual impairments.

Use padding sparingly. The padding options are 1-5, which represents the padding in increments of 4 pixels (2 = 8px padding). Combine the \`padding\` with \`size\` options for custom icon/button size ratios. If omitted, padding is derived from the default padding for each \`size\` prop.`}
        >
          <CombinationNew size={['xl', 'lg', 'md', 'sm', 'xs']}>
            {({ size }) => (
              <IconButton
                accessibilityLabel={`Example size ${size}`}
                bgColor="lightGray"
                icon="add"
                iconColor="darkGray"
                size={size}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Icon color"
          description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`iconColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Dark Gray ("darkGray"). Medium emphasis, used for secondary actions.
3. Gray ("gray"). Low emphasis when placed on white backgrounds, used for tertiary actions. Medium emphasis when placed on dark backgrounds, used for secondary actions.
4. White ("white"). Used in a dark mode scheme or over a dark-colored background creating better visibility.
`}
        >
          <CombinationNew iconColor={['red', 'darkGray', 'gray', 'white']}>
            {({ iconColor }) => (
              <IconButton
                accessibilityLabel={`Example icon color ${iconColor}`}
                icon="add"
                iconColor={iconColor}
                size="md"
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Background color"
          description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`bgColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Light Gray ("lightGray"). Medium emphasis, used for secondary actions.
3. Transparent Dark Gray ("transparentDarkGray"). Medium emphasis, used for secondary actions, usually above a colored background.
4. Gray ("gray"). Used for tertiary actions or in cases where the primary "red" is not an option. Medium emphasis when placed on dark backgrounds, used for secondary actions.
5. White ("white"). Used when there is a need of an IconButton over an image or colored background to provide better contrast and visibility.
6. Transparent ("transparent"). Used when there is a need to have an IconButton over an image without a background.
7. Dark Gray ("darkGray"). Used as the [selected state](#Selected-state) for IconButton.

`}
        >
          <CombinationNew
            bgColor={[
              'red',
              'lightGray',
              'transparentDarkGray',
              'gray',
              'white',
              'transparent',
              'darkGray',
            ]}
          >
            {({ bgColor }) => (
              <IconButton
                accessibilityLabel={`Example background color ${bgColor}`}
                bgColor={bgColor}
                icon="add"
                size="md"
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Writing"
        description="When pairing IconButton with [Tooltip](/web/tooltip), refer to the Tooltip component for writing guidelines.

"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use a descriptive label to describe the IconButton action by beginning with a verb.
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`Use the words "image" or "icon" in the description label; instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit".`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Button](/web/button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Icon](/web/icon)**
IconButtons use icons instead of text to convey available actions on a screen. Use an existing one from the Gestalt [Icon](/web/icon) library.

**[OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

**[Dropdown](/web/dropdown)**
It's most common to anchor Dropdown to [Button](/web/button) or IconButton.
      `}
        />
      </MainSection>{' '}
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'IconButtonFloating' }) },
  };
}
