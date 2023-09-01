// @flow strict
import { type Node } from 'react';
import { IconButton, SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import PropTable from '../../docs-components/PropTable.js';
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
import roleButton from '../../examples/iconbutton/roleButton.js';
import roleLink from '../../examples/iconbutton/roleLink.js';
import selectedState from '../../examples/iconbutton/selectedState.js';
import tooltip from '../../examples/iconbutton/tooltip.js';
import tooltipVariant from '../../examples/iconbutton/tooltipVariant.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="error"
            iconAccessibilityLabel="Info"
            message={`IconButton role="link" is soon to be deprecated, use IconButtonLink instead.`}
            helperLink={{
              text: 'View IconButtonLink',
              accessibilityLabel: 'View IconButtonLink documentation page',
              href: '/web/iconbuttonlink',
              onClick: () => {},
            }}
          />
        }
      >
        <SandpackExample code={main} name="Main example" hideEditor />
      </PageHeader>
      <PropTable
        componentName={generatedDocGen?.displayName}
        id="IconButton"
        props={[
          {
            name: 'accessibilityLabel',
            type: 'string',
            required: true,
            description:
              'Label for screen readers to announce IconButton. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
          },
          {
            name: 'bgColor',
            type: '"transparent" | "darkGray" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "red"',
            defaultValue: 'transparent',
            description:
              'Primary colors to apply to the IconButton background. See [background color](#Background-color) variant to learn more.',
          },
          {
            name: 'dangerouslySetSvgPath',
            type: `{| __path: string |}`,
            description:
              'Defines a new icon different from the built-in Gestalt icons. See [custom icon](#Custom-icon) variant to learn more.',
          },
          {
            name: 'dataTestId',
            type: 'string',
            required: false,
            description: [
              'Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.',
            ],
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'When disabled, IconButton looks inactive and cannot be interacted with.',
          },
          {
            name: 'iconColor',
            type: `"darkGray" | "gray" | "red" | "white" | "brandPrimary"`,
            defaultValue: 'darkGray',
            description:
              'Primary color to apply to the [Icon](/web/icon). See [icon color](#Icon-color) variant to learn more.',
          },
          {
            name: 'icon',
            type: '$Keys<typeof icons>',
            description:
              'Icon displayed in IconButton to convey the behavior of the component. Refer to the [iconography](/foundations/iconography/library#Search-icon-library) guidelines regarding the available icon options.',
          },
          {
            name: 'name',
            type: 'string',
            description: [
              'The name attribute specifies the name of the <button> element.',

              'The name attribute is used to reference form-data after the form has been submitted.',
            ],
          },
          {
            name: 'onClick',
            type: '({| event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| dangerouslyDisableOnNavigation: () => void |}> |}) => void',
            description:
              'Callback fired when the component is clicked, pressed or tapped. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.',
          },
          {
            name: 'padding',
            type: `1 | 2 | 3 | 4 | 5`,
            description:
              'Sets a padding for the IconButton. See the [size](#Size) variant to learn more.',
          },
          {
            name: 'ref',
            type: `HTMLButtonElement | HTMLAnchorElement`,
            description:
              'Forward the ref to the underlying button or anchor element. See the [ARIA attributes guidelines](#ARIA-attributes) to learn more.',
          },
          {
            name: 'role',
            type: `'button' | 'link'`,
            defaultValue: 'button',
            description:
              'Defines the user interaction in the component. See the [role](#Role) variant to learn more.',
          },
          {
            name: 'size',
            type: `"xs" | "sm" | "md" | "lg" | "xl"`,
            defaultValue: 'lg',
            description:
              'The maximum height and width of IconButton. See the [size](#Size) variant to learn more.',
          },
          {
            name: 'tabIndex',
            type: `-1 | 0`,
            defaultValue: 0,
            description:
              'Removes IconButton from sequential keyboard navigation to improve accessibility. See the [Accessibility](#Keyboard-interaction) guidelines for details on proper usage.',
          },
          {
            name: 'tooltip',
            type: `{| text: string, accessibilityLabel?: string, inline?: boolean, idealDirection?: 'up' | 'right' | 'down' | 'left', zIndex?: Indexable, |}`,
            description: `Adds a [Tooltip](/web/tooltip) on hover/focus of the IconButton. See the [With Tooltip](#With-Tooltip) variant to learn more.`,
          },
        ]}
      />
      <PropTable
        componentName={generatedDocGen?.displayName}
        name='Additional role="button"'
        id="role_button"
        props={[
          {
            name: 'accessibilityControls',
            type: 'string',
            description:
              'Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by IconButton so that screen reader users can identify the relationship between elements. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
          },
          {
            name: 'accessibilityExpanded',
            type: 'boolean',
            description:
              'Indicates that IconButton hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
          },
          {
            name: 'accessibilityHaspopup',
            type: 'boolean',
            description:
              'Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
          },
          {
            name: 'accessibilityPopupRole',
            type: `'menu' | 'dialog'`,
            description:
              'Indicates whether this component displays a menu, such as Dropdown, or a dialog, like Popover, Modal or ModalAlert. See the [Accessibility](#ARIA-attributes) guidelines for details on proper usage.',
          },
          {
            name: 'role',
            type: 'button',
            description:
              'Sets button interaction in the component. See the [role](#Role) variant to learn more.',
          },
          {
            name: 'selected',
            type: 'boolean',
            description:
              'Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more.',
          },
          {
            name: 'type',
            type: `'submit' | 'button'`,
            required: false,
            defaultValue: 'button',
            description: 'Use "submit" if IconButton is used within or associated with a form.',
          },
        ]}
      />
      <PropTable
        componentName={generatedDocGen?.displayName}
        name='Additional role="link"'
        id="role_link"
        props={[
          {
            name: 'href',
            type: 'string',
            required: true,
            description: 'Specifies a link URL.',
          },
          {
            name: 'rel',
            type: `'none' | 'nofollow'`,
            description:
              'Specifies the relationship between the current document and the linked document. See the [role](#Role) variant to learn more.',
          },
          {
            name: 'role',
            type: 'link',
            required: true,
            description:
              'Sets link interaction in the component. See the [role](#Role) variant and [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.',
          },
          {
            name: 'target',
            type: `null | 'self' | 'blank'`,
            description: `Define the frame or window to open the anchor defined on \`href\`. See the [role](#Role) variant to learn more.`,
          },
        ]}
      />
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

IconButtons that act as links can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.`}
            sandpackExample={<SandpackExample code={roleLink} name="Role link example" />}
          />
          <MainSection.Card
            cardSize="md"
            title="role = button"
            description="If IconButton acts as a button, pass role-specific [props](#role_buttonProps)."
            sandpackExample={<SandpackExample code={roleButton} name="Role button example" />}
          />
        </MainSection.Subsection>
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
        <MainSection.Subsection
          title="External handlers"
          description={`IconButton consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when IconButton role="link" is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
        />
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

**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.

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
    props: { generatedDocGen: await docGen('IconButton') },
  };
}
