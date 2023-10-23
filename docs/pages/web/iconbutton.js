// @flow strict
import { type Node } from 'react';
import { IconButton } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection.js';
import LocalizationSection from '../../docs-components/LocalizationSection.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import aria from '../../examples/iconbutton/aria.js';
import customIcon from '../../examples/iconbutton/customIcon.js';
import gestaltIcon from '../../examples/iconbutton/gestaltIcon.js';
import grouping from '../../examples/iconbutton/grouping.js';
import highActions from '../../examples/iconbutton/highActions.js';
import image from '../../examples/iconbutton/image.js';
import keyboard from '../../examples/iconbutton/keyboard.js';
import lowActions from '../../examples/iconbutton/lowActions.js';
import main from '../../examples/iconbutton/main.js';
import noGrouping from '../../examples/iconbutton/noGrouping.js';
import selectedState from '../../examples/iconbutton/selectedState.js';
import tooltip from '../../examples/iconbutton/tooltip.js';
import tooltipVariant from '../../examples/iconbutton/tooltipVariant.js';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        pdocsLink
      >
        <SandpackExample code={main} name="IconButton example" hideEditor />
      </PageHeader>
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
            sandpackExample={
              <SandpackExample code={lowActions} name="Low-emphasis action example" hideEditor />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Pair IconButton with a regular button to perform a high-emphasis action. IconButton should be a secondary action among regular buttons."
            sandpackExample={
              <SandpackExample
                code={highActions}
                name="High-emphasis action example"
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
            description='Consider grouping multiple actions in an "ellipsis" IconButton to avoid distraction with an overload of icons.'
            sandpackExample={<SandpackExample code={grouping} name="Grouping example" hideEditor />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Display more than 4 icon buttons in a single row as it can cause cognitive load and usability issues."
            sandpackExample={
              <SandpackExample code={noGrouping} name="No Grouping example" hideEditor />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Display a [Tooltip](/web/tooltip) in conjunction with IconButton to provide context when the icon alone would be insufficient to convey the purpose of the button."
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip example" hideEditor />}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add an IconButton on top of images unless it has a background that ensures easy readability and accessible contrast. Check the [background color](#Color) variant to learn more."
            sandpackExample={
              <SandpackExample
                code={image}
                name="IconButton over image example"
                hideEditor
                hideControls
              />
            }
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
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={aria} name="ARIA attributes example" />}
          />
          <MainSection.Subsection
            title="Keyboard interaction"
            description={`
The default behaviour for IconButton is to be focusable in sequential keyboard navigation in the order defined by the document's source order.

Use \`tabIndex\` to remove IconButton from the sequential keyboard navigation to improve accessibility. The example below shows a common use case when two consecutive and visually different elements perform the same action. One of them, in this case IconButton, can be removed from keyboard navigation to prevent screen readers from announcing the same interaction twice.
If IconButton is disabled, it's also unreachable from keyboard navigation.`}
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={keyboard} name="Keyboard interaction example" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>
      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          description={`IconButton is available in 5 fixed sizes:

1. \`xl\` (56px)
    Extra large IconButtons should be used sparingly and only in places where the UI has a case for an extra-large IconButton. A common use case is [IconButtonFloating](/web/iconbuttonfloating).
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
5. Brand primary ("brandPrimary"). Used to represent the Pinterest brand.

`}
        >
          <CombinationNew iconColor={['red', 'darkGray', 'gray', 'white', 'brandPrimary']}>
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
        <MainSection.Subsection
          title="With Tooltip"
          description={`
            By specifying the \`tooltip\` property, a [Tooltip](/web/tooltip) will automatically be triggered when IconButton is hovered or focused. If the Tooltip \`text\` does not provide more information than the IconButton \`accessibilityLabel\`, set the tooltip prop's \`accessibilityLabel\` to an empty string, as seen below in the Edit example.
          `}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={tooltipVariant} name="Tooltip variant example example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Custom icon"
          columns={2}
          description="IconButton accepts both Gestalt [Icons](/web/icon) and custom icons, as shown in the second example. For custom icons, follow our [custom SVG icons](/foundations/iconography/library#Custom-SVG-icons) guidelines."
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={<SandpackExample code={gestaltIcon} name="Gestalt icon example" />}
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={<SandpackExample code={customIcon} name="Custom icon example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Selected state"
          description={`IconButton has a \`selected\` state to visually indicate that the element is selected, open, and/or active. If the selected state  controls the display of a Popover-based component (open/closed), use \`accessibilityExpanded\` to inform screen reader users. See the [Accessibility](#Keyboard-interaction) guidelines to learn more.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={selectedState} name="Selected state example" />}
          />
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
      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-ads-logging-extension#ads-logging-extension',
            text: 'Ads logging extension',
          },
        ]}
      />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[IconButtonLink](/web/iconbuttonlink)**
Use IconButtonLink when a link is needed instead of an action.

**[Button](/web/button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Icon](/web/icon)**
IconButtons use icons instead of text to convey available actions on a screen. Use an existing one from the Gestalt [Icon](/web/icon) library.

**[Dropdown](/web/dropdown)**
It's most common to anchor Dropdown to [Button](/web/button) or IconButton.
      `}
        />
      </MainSection>{' '}
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('IconButton') },
  };
}
