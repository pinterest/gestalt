import defaultStateExample from 'docs/examples/iconbutton/defaultStateExample';
import disabledStateExample from 'docs/examples/iconbutton/disabledStateExample';
import focusOnDarkBackground from 'docs/examples/iconbutton/focusOnDarkBackground';
import selectedStateExample from 'docs/examples/iconbutton/selectedStateExample';
import { IconButton, Pog, useDangerouslyInGestaltExperiment } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import aria from '../../examples/iconbutton/aria';
import customIcon from '../../examples/iconbutton/customIcon';
import gestaltIcon from '../../examples/iconbutton/gestaltIcon';
import grouping from '../../examples/iconbutton/grouping';
import highActions from '../../examples/iconbutton/highActions';
import image from '../../examples/iconbutton/image';
import keyboard from '../../examples/iconbutton/keyboard';
import label from '../../examples/iconbutton/label';
import lowActions from '../../examples/iconbutton/lowActions';
import main from '../../examples/iconbutton/main';
import noGrouping from '../../examples/iconbutton/noGrouping';
import selectedState from '../../examples/iconbutton/selectedState';
import tooltip from '../../examples/iconbutton/tooltip';
import tooltipVariant from '../../examples/iconbutton/tooltipVariant';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  const isInExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="IconButton example" />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Interface space is limited. Prioritize using a [Button](/web/button) if space is available.
- Triggering a [Modal](/web/modal) to complete a related task.
- Creating visual separation of actions in text-heavy content.
- Lower-emphasis actions that don't impede users from completing a task.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Displaying icons that don't have actions associated with them. Use an [Icon](/web/icon) instead.
- Displaying multiple IconButtons on a surface that uses the same icon for different actions.
- Text is better suited to convey the action and/or the icon isn't quickly recognizable by users.
- Destructive, high-emphasis actions, e.g "delete", "remove".
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
            description="Use IconButton to perform low-emphasis actions, such as opening a [Modal](/web/modal) to edit a board."
            sandpackExample={
              <SandpackExample code={lowActions} hideEditor name="Low-emphasis action example" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Pair IconButton with a regular button to perform a high-emphasis action. IconButton should be a secondary action among regular buttons."
            sandpackExample={
              <SandpackExample
                code={highActions}
                hideControls
                hideEditor
                name="High-emphasis action example"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description='Consider grouping multiple actions in an "ellipsis" IconButton to avoid distraction with an overload of icons.'
            sandpackExample={<SandpackExample code={grouping} hideEditor name="Grouping example" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Display more than 4 icon buttons in a single row as it can cause cognitive load and usability issues."
            sandpackExample={
              <SandpackExample code={noGrouping} hideEditor name="No Grouping example" />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Display a [Tooltip](/web/tooltip) in conjunction with IconButton to provide context when the icon alone would be insufficient to convey the purpose of the button."
            sandpackExample={<SandpackExample code={tooltip} hideEditor name="Tooltip example" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Add an IconButton on top of images unless it has a background that ensures easy readability and accessible contrast. Check the [background color](#Color) variant to learn more."
            sandpackExample={
              <SandpackExample
                code={image}
                hideControls
                hideEditor
                name="IconButton over image example"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
IconButton conveys the component behavior using iconography. IconButton requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/web/icon). In the example below, the screen reader reads: "Create Pin menu". **The label should describe the intent of the action, not the Icon itself.** For example, use "Edit board" instead of "Pencil".

If IconButton is used as a control button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that IconButton controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to IconButton. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
          title="ARIA attributes"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={aria} name="ARIA attributes example" />}
          />
          <MainSection.Subsection
            description={`
The default behaviour for IconButton is to be focusable in sequential keyboard navigation in the order defined by the document's source order.

Use \`tabIndex\` to remove IconButton from the sequential keyboard navigation to improve accessibility. The example below shows a common use case when two consecutive and visually different elements perform the same action. One of them, in this case IconButton, can be removed from keyboard navigation to prevent screen readers from announcing the same interaction twice.
If IconButton is disabled, it's also unreachable from keyboard navigation.`}
            title="Keyboard interaction"
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
          title="Size"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
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
          description={`IconButton's appearance can be modified by the following states:

1. \`default\`
    The default, enabled and unselected state.
2. \`selected\`
    Selected state, used to indicate that the button and associated elements are selected, open, and/or active.
3. \`disabled\`
    Disabled state, used to indicate that the button is not currently available for interaction.
`}
          title="States"
        >
          <SandpackExample code={defaultStateExample} name="Default state example" />
          <SandpackExample code={disabledStateExample} name="Disabled state example" />
          <SandpackExample code={selectedStateExample} name="Selected state example" />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`You can add a label for the IconButton. It is only visible in XL size IconButtons.

It is recommended to use short labels for IconButtons, but the label will wrap up to two lines if needed.`}
          title="Label"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={label} name="Label example" />}
          />
        </MainSection.Subsection>
        {isInExperiment && (
          <MainSection.Subsection title="Focus ring on dark backgrounds">
            <MainSection.Card
              cardSize="lg"
              description="IconButtonLink can be used on dark backgrounds. The focus ring is visible on dark backgrounds to ensure accessibility."
              sandpackExample={
                <SandpackExample
                  code={focusOnDarkBackground}
                  name="Usage of focus ring on dark backgrounds"
                />
              }
            />
          </MainSection.Subsection>
        )}
        <MainSection.Subsection
          description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`iconColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Dark Gray ("darkGray"). Medium emphasis, used for secondary actions.
3. Gray ("gray"). Low emphasis when placed on white backgrounds, used for tertiary actions. Medium emphasis when placed on dark backgrounds, used for secondary actions.
4. White ("white"). Used in a dark mode scheme or over a dark-colored background creating better visibility.
5. Brand primary ("brandPrimary"). Used to represent the Pinterest brand.
6. Light ("light"). Used over a dark-colored background that does not change in  dark mode, like transparentDarkGray, creating better visibility.
7. Dark ("dark"). Used over a light-colored background that does not change in light mode, like washLight, creating better visibility.

`}
          title="Icon color"
        >
          <CombinationNew
            // @ts-expect-error - TS2322 - Type '{ children: ({ iconColor }: { [key: string]: any; }) => Element; iconColor: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'.
            iconColor={['red', 'darkGray', 'gray', 'white', 'brandPrimary', 'light', 'dark']}
          >
            {({ iconColor }) => (
              <Pog
                accessibilityLabel={`Example icon color ${iconColor}`}
                icon="add"
                iconColor={iconColor}
                size="md"
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`IconButton can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`bgColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Light Gray ("lightGray"). Medium emphasis, used for secondary actions.
3. Transparent Dark Gray ("transparentDarkGray"). Medium emphasis, used for secondary actions, usually above a colored background.
4. Gray ("gray"). Used for tertiary actions or in cases where the primary "red" is not an option. Medium emphasis when placed on dark backgrounds, used for secondary actions.
5. Light Wash ("washLight"). Used when there is a need of a semi-transparent IconButton with a light wash over an item, like an image.
6. White ("white"). Used when there is a need of an IconButton over an image or colored background to provide better contrast and visibility.
7. Transparent ("transparent"). Used when there is a need to have an IconButton over an image without a background.
`}
          title="Background color"
        >
          <CombinationNew
            // @ts-expect-error - TS2322 - Type '{ children: ({ bgColor }: { [key: string]: any; }) => Element; bgColor: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'.
            bgColor={[
              'red',
              'lightGray',
              'transparentDarkGray',
              'gray',
              'washLight',
              'white',
              'transparent',
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
          description={`
            By specifying the \`tooltip\` property, a [Tooltip](/web/tooltip) will automatically be triggered when IconButton is hovered or focused. If the Tooltip \`text\` does not provide more information than the IconButton \`accessibilityLabel\`, set the tooltip prop's \`accessibilityLabel\` to an empty string, as seen below in the Edit example.
          `}
          title="With Tooltip"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={tooltipVariant} name="Tooltip variant example example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description="IconButton accepts both Gestalt [Icons](/web/icon) and custom icons, as shown in the second example. For custom icons, follow our [custom SVG icons](/foundations/iconography/library#Custom-SVG-icons) guidelines."
          title="Custom icon"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={gestaltIcon} name="Gestalt icon example" />}
            title="Built-in icon"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={customIcon} name="Custom icon example" />}
            title="Custom SVG icon"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`IconButton has a \`selected\` state to visually indicate that the element is selected, open, and/or active. If the selected state  controls the display of a Popover-based component (open/closed), use \`accessibilityExpanded\` to inform screen reader users. See the [Accessibility](#Keyboard-interaction) guidelines to learn more.`}
          title="Selected state"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={selectedState} name="Selected state example" />}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        description="When pairing IconButton with [Tooltip](/web/tooltip), refer to the Tooltip component for writing guidelines.

"
        name="Writing"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use a descriptive label to describe the IconButton action by beginning with a verb.
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`Use the words "image" or "icon" in the description label; instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit".`}
            type="don't"
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
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('IconButton') },
  };
}
