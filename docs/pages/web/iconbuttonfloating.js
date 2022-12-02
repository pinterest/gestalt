// @flow strict
import { type Node } from 'react';

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
      function IconButtonFloatingExample() {
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
        selected={open}
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
            - To represent a primary or common action when it has to be visible all the time on the screen on top of everything.
            - Triggering a Modal or a Popover to complete a related task.
            - Only if it is the most suitable way to present a screen's high-emphasis action.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
            - There isn't a need for a fixed IconButtonFloating visible all the time on the screen.
            - To replace [IconButton](/web/iconbutton) established patterns, such as nav elements.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use when an action has to be visible at all times in a sticky way where content can scroll underneath."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Layer notification badges on top of IconButtonFloating. This pattern is typically used on IconButtons part of a nav component, and IconButtonFloating shouldn't contain notifications found elsewhere on a screen, as it can lead to cognitive and usability issues. Users with color-blinded vision could also miss it since it doesn't offer a visually supportive affordance besides color."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use IconButtonFloating for positive and supportive actions like Create, Help or Maximize."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use IconButtonFloating for negative and destructive actions like Delete or Remove. "
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the designated size and style."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Scale or style IconButtonFloating. Consistent button sizes promote a cohesive user experience."
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
IconButtonFloating conveys the component behavior using iconography. IconButtonFloating requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/web/icon). In the example below, the screen reader reads: "Create Pin menu". **The label should describe the intent of the action, not the Icon itself.** For example, use "Edit board" instead of "Pencil".

If IconButtonFloating is used as a control button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that IconButtonFloating controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to IconButtonFloating. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
        >
          <MainSection.Card cardSize="lg" />
          <MainSection.Subsection
            title="Keyboard interaction"
            description={`
IconButtonFloating should be contained within the \`role="contentinfo"\` container on a page. This gives screen reader users the ability to skip any main content and go directly to the action buttons. If there are multiple IconButtonFloatings, they should all be contained within the \`role="contentinfo"\` container.`}
          />
          <MainSection.Card cardSize="lg" />
        </MainSection.Subsection>
      </AccessibilitySection>
      <MainSection name="Localization" description="Be sure to localize `accessibilityLabel`." />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          columns={2}
          description="IconButtonFloating size is only available in a single size, 56px. Keeping the size consistent will promote a cohesive Pinner experience and avoid usability issues. "
        />
        <MainSection.Subsection
          title="Color"
          description={`
          IconButtonFloating is provided in two colors schemes. It can be presented in combinations of icon and background colors.

          - Dark Gray Icon ("darkGray") + White ("white") background + $elevation-floating
          Color combination in light-mode UI.

          -  White ("white") Icon + $color-background-elevation-floating
          Color combination in dark-mode UI.
          `}
        />
        <MainSection.Subsection
          title="Elevation"
          description={`
          **Floating**
          IconButtonFloating is lifted off of the background with shadows built-in ($elevation-floating). The floating elevation serves as an affordance for floating actions.

          In dark mode, the elevation is achieved with colors instead of shadows ($color-background-elevation-floating). See [elevation guidelines](/foundations/elevation) for reference. `}
        />
        <MainSection.Subsection
          title="Placement"
          description={`
          IconButtonFloating is always placed along the bottom of the screen. A consistent position improves discoverability when IconButtonFloating appears across a responsive range of surfaces. For example, an IconButtonFloating used to open resources should remain in the same spot on the page across surfaces. In most cases, only one IconButtonFloating should be present on a screen. The exception is using a centered IconButtonFloating as a primary action, like board creation.

          **Bottom edge placement**
          IconButtonFloating should typically be placed in the bottom edge of the screen (bottom right for LTR languages, and bottom left for RTL languages). This applies to supportive actions, such as opening related content and resources.

          **Centered placement**
          Use a centered placement when leading Pinners to an action or task that should remain present when scrolling, such as creating a new board.
`}
        />
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
            - Use a descriptive label to describe the IconButtonFloating action by beginning with a verb.`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`- Use the words "image" or "icon" in the description label; instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit".`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[IconButton](/web/iconbutton)**
Use IconButton when only an icon is needed instead of text, and the action does not float over other content.

**[Button](/web/button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Icon](/web/icon)**
IconButtonFloating uses icons instead of text to convey available actions on a screen. Use an existing Icon from the Gestalt [Icon](/web/icon) library.

**[Dropdown](/web/dropdown)**
It's most common to anchor Dropdown to [Button](/web/button), IconButton, or IconButtonFloating.
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
