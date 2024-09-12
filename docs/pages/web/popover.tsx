import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import a11y from '../../examples/popover/a11y';
import localizationLabels from '../../examples/popover/localizationLabels';
import main from '../../examples/popover/main';
import variantAnchor from '../../examples/popover/variantAnchor';
import variantIdealDirection from '../../examples/popover/variantIdealDirection';
import variantLayer from '../../examples/popover/variantLayer';
import variantScrollingContainers from '../../examples/popover/variantScrollingContainers';
import variantVisibility from '../../examples/popover/variantVisibility';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main popover example" previewHeight={600} />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Providing additional information for related context without cluttering the surface of a workflow.
          - Accommodating a variety of features, such as Buttons, Images or SearchFields, that are not available in [Dropdown](/web/dropdown).
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Displaying critical information that prevents users from accomplishing a task.
          - Displaying information out of context.
          - As a replacement for [Tooltip](/web/tooltip).
          - For presenting a list of actions or options. Use [Dropdown](/web/dropdown) instead.
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
            description="Use Popover to display a lightweight task related to the content on screen."
            sandpackExample={
              <SandpackExample code={main} hideEditor name="Do - Lightweight" previewHeight={400} />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Popover to communicate critical information, such as an error or interaction feedback. Instead, use the error supplied directly to the form element. See [related](#Related) to learn more."
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
- When Popover opens, focus moves to the first focusable element in the Popover container.
- Popovers are also a focus trap, so users should only be able to interact with the content inside the Popover container.
- Popover should always be dismissible using the ESC key. It could also be dismissed by interacting with another part of the screen, or by interacting with an element inside Popover.
- When Popover is closed, focus returns to the anchor element that triggered Popover.
`}
          title="Keyboard interaction"
        />
        <MainSection.Subsection
          description={`
We recommend passing the following ARIA attribute to Popover for a better screen reader experience:

- \`accessibilityLabel\`: describes the main purpose of a Popover for the screen reader. Should be unique and concise. For example, "Save to board" instead of "Popover".  It populates [aria-label](https://w3c.github.io/aria-practices/#dialog_roles_states_props).
- \`accessibilityDismissButtonLabel\`: describes the purpose of the dismiss button on Popover for the screen reader. Should be clear and concise. For example, "Close board selection popover" instead of "Close".

To further assist screen readers, we recommend passing the following ARIA attributes to the _anchor element_:

- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover attached to the anchor element. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether Popover is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityControls\`: match with the \`id\` of the associated Popover whose contents or visibility are controlled by the interactive component so that screen reader users can identify the relationship between elements. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).

For the \`role\` prop, use:
- 'dialog' if the Popover is a dialog that prompts the user to enter information or requires a response.
- 'menu' if the Popover presents a list of choices to the user.
- 'listbox' if the Popover is a widget that allows the user to select one or more items (whose role is option) from a list. May also include a search option.
- 'tooltip' if the Popover is a simple contextual text bubble that displays a description on a feature.
`}
          title="ARIA attributes"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={a11y} name="Aria example" previewHeight={550} />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>
      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`Note that \`accessibilityDismissButtonLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
The maximum width of Popover. Popover has different size configurations:
- \`"xs"\`: 180px
- \`"sm"\`: 230px
- \`"md"\`: 284px
- \`"lg"\`: 320px
- \`"xl"\`: 360px
- \`number\`: Use this prop to create custom-size Popovers in pixels.
- \`flexible\`: Use this configuration for larger Popovers. Without a defined maximum width, Popover grows to fit the content in \`children\`.

We recommend using \`"xs\`" for education Popovers and \`"xl\`" for more complex Popovers. Avoid using other configurations whenever possible as they are legacy sizes.
      `}
          title="Size"
        />

        <MainSection.Subsection
          description={`
Popover requires a reference element, typically [Button](/web/button) or [IconButton](/web/iconbutton), to set its position. The \`anchor\` ref can be directly set on the reference component itself. If the components don’t support \`ref\`, the anchor ref can be set to a parent [Box](/web/box).

Popover calculates its position based on the bounding box of the \`anchor\`. Therefore, the \`anchor\` ref should only include the trigger element itself, usually [Button](/web/button) or [IconButton](/web/iconbutton), or the specific feature component that requires an educational Popover.
`}
          title="Anchor"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={variantAnchor} name="Variant - Anchor" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={` We highly recommend including a dismiss button on all Popovers with \`showDismissButton\`. This improves accessibility and gives users an immediate action for closing Popover. A label for the button can be provided with the \`accessibilityDismissButtonLabel\` prop. Don't forget to localize this label as well.
`}
          title="Dismiss button"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={a11y} name="Dismiss button example" previewHeight={550} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Popover is typically used within [Layer](/web/layer). Layer renders Popover outside the DOM hierarchy of the parent allowing it to overlay surrounding content. Popover calculates its position based on the bounding box of the \`anchor\`. Within Layer, Popover no longer shares a relative root with the \`anchor\` and requires \`disablePortal=true\` to disable its internal Layer.

Using \`Layer\` with Popover eliminates the need to use \`z-index\` to solve stacking context conflicts. Popovers within Modals and OverlayPanels with z-indexes don't require \`zIndex\` in \`Layer\`.
`}
          title="With Layer"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantLayer}
                layout="column"
                name="Variant - Layer"
                previewHeight={800}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Pass in \`idealDirection\` to specify the preferred position of Popover relative to the anchor, such as [Button](/web/button) or [IconButton](/web/iconbutton), that triggered it.

Adjust the \`idealDirection\` as necessary to ensure the visibility of Popover and its contextual information. The default direction is "up", although Popover should be center-aligned directly below the element in most cases. The actual position may change given the available space around the anchor element.
`}
          title="Ideal direction"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantIdealDirection}
                layout="column"
                name="Variant - Ideal direction"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Popover always remains attached to its anchor when scrolling. However Popover may float outside of the scrolling container without adjusting itself (**shift / flip**) when reached to the edges if:
 - Popover is rendered through portal using
   - \`disablePortal={true}\` prop
   - **[Layer](/web/layer)** component
 - the scrolling container is not positioned relatively (\`position: relative\`)

For some use cases that can be the indeneded behavior.

If Popover has to respect the edges of its scrolling container, the scrolling has to have position CSS rule set to \`relative\`. Popover's \`disablePortal\` prop is by default \`true\`. That's why in this case \`disablePortal\` should not be set to \`false\`.
`}
          title="Within scrolling containers"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantScrollingContainers}
                layout="column"
                name="Variant - Scrolling containers"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
Popover's positioning algorithm requires that the anchor element renders before Popover is rendered. If Popover should be visible on page load, use \`useEffect\` to toggle the visibility after the first render.
`}
          title="Visibility on page load"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantVisibility} name="Variant - Visibility on page load" />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Be clear and predictable so that people anticipate what will happen when they interact with an item.
- Focus on the action by beginning with a verb.
- Use succinct and scannable language.
- Use sentence case while always capitalizing the word “Pin.”
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Describe the interface element, like “button,” “icon” or “menu” in education messaging, unless it’s absolutely necessary for clarity.
- Use words like “click” or “tap” in education messaging, if possible, or assume universal accessibility.
- Use Popover to communicate critical information, such as an error or interaction feedback.
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[PopoverEducational](/web/popovereducational)**
Popover used for education or onboarding experiences.

**[Dropdown](/web/dropdown)**
Dropdown is an element constructed using Popover as its container. Use Dropdown to display a list of actions or options in a Popover.

**[Toast](/web/toast)**
Toast provides feedback on an interaction. One example of Toast is the confirmation that appears when a Pin has been saved. Toasts appear at the bottom of a desktop screen or top of a mobile screen instead of being attached to any particular element on the interface.

**[Tooltip](/web/tooltip)**
Tooltip describes the function of an interactive element, typically [IconButton](/web/iconbutton), on hover. While Popovers offer broader content options, such as [Button](/web/button) and [Images](/web/image), Tooltips are purely text-based.

**[Layer](/web/layer)**
Layer renders Popover outside the DOM hierarchy of the parent and prevents surrounding components overlaying Popover. See the [with Layer](#With-layer) variant to learn more.

**[ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer)**
ScrollBoundaryContainer is needed for proper positioning when Popover is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures that Popover remains attached to its anchor when scrolling. See the [within scrolling containers](#Within-scrolling-containers) variant to learn more.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  const generatedDocGen = await docGen('Popover');
  if (generatedDocGen.props.color) {
    generatedDocGen.props.color.tsType.raw = '"white" | "darkGray"';
  }

  return {
    props: {
      generatedDocGen,
    },
  };
}
