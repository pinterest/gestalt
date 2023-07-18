// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import a11y from '../../examples/popover/a11y.js';
import dontCritical from '../../examples/popover/dontCritical.js';
import main from '../../examples/popover/main.js';
import variantAnchor from '../../examples/popover/variantAnchor.js';
import variantIdealDirection from '../../examples/popover/variantIdealDirection.js';
import variantLayer from '../../examples/popover/variantLayer.js';
import variantScrollingContainers from '../../examples/popover/variantScrollingContainers.js';
import variantVisibility from '../../examples/popover/variantVisibility.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} hideEditor name="Main popover example" previewHeight={400} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Providing additional information for related context without cluttering the surface of a workflow.
          - Accommodating a variety of features, such as Buttons, Images or SearchFields, that are not available in [Dropdown](/web/dropdown).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Displaying critical information that prevents users from accomplishing a task.
          - Displaying information out of context.
          - As a replacement for [Tooltip](/web/tooltip).
          - For presenting a list of actions or options. Use [Dropdown](/web/dropdown) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Popover to display a lightweight task related to the content on screen."
            sandpackExample={
              <SandpackExample code={main} hideEditor name="Do - Lightweight" previewHeight={400} />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Popover to communicate critical information, such as an error or interaction feedback. Instead, use the error supplied directly to the form element. See [related](#Related) to learn more."
            sandpackExample={
              <SandpackExample
                code={dontCritical}
                hideControls
                hideEditor
                name="Don't - Critical"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Keyboard interaction"
          description={`
- When Popover opens, focus moves to the first focusable element in the Popover container.
- Popovers are also a focus trap, so users should only be able to interact with the content inside the Popover container.
- Popover should always be dismissible using the ESC key. It could also be dismissed by interacting with another part of the screen, or by interacting with an element inside Popover.
- When Popover is closed, focus returns to the anchor element that triggered Popover.
`}
        />
        <MainSection.Subsection
          title="ARIA attributes"
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
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={a11y} name="Aria example" previewHeight={550} />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description="Be sure to localize any text elements within Popover, along with `accessibilityLabel` and `accessibilityDismissButtonLabel`. Note that localization can lengthen text by 20 to 30 percent."
      >
        <SlimBanner
          iconAccessibilityLabel="Recommendation"
          message="Popovers with a dismiss button announce to assistive technologies that the button will dismiss the Popover. Localize the default label with DefaultLabelProvider."
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
          title="Size"
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
        />

        <MainSection.Subsection
          title="Anchor"
          description={`
Popover requires a reference element, typically [Button](/web/button) or [IconButton](/web/iconbutton), to set its position. The \`anchor\` ref can be directly set on the reference component itself. If the components don’t support \`ref\`, the anchor ref can be set to a parent [Box](/web/box).

Popover calculates its position based on the bounding box of the \`anchor\`. Therefore, the \`anchor\` ref should only include the trigger element itself, usually [Button](/web/button) or [IconButton](/web/iconbutton), or the specific feature component that requires an educational Popover.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={variantAnchor} name="Variant - Anchor" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Dismiss button"
          description={` We highly recommend including a dismiss button on all Popovers with \`showDismissButton\`. This improves accessibility and gives users an immediate action for closing Popover. A label for the button can be provided with the \`accessibilityDismissButtonLabel\` prop. Don't forget to localize this label as well.
`}
        >
          <SlimBanner
            iconAccessibilityLabel="Recommendation"
            message="Popovers with a dismiss button announce to assistive technologies that the button will dismiss the Popover with a default label of 'Close popover'. Localize the default label with DefaultLabelProvider."
            type="recommendationBare"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about DefaultLabelProvider',
              href: '/web/utilities/defaultlabelprovider',
              onClick: () => {},
            }}
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={a11y} name="Dismiss button example" previewHeight={550} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="With Layer"
          description={`
Popover is typically used within [Layer](/web/layer). Layer renders Popover outside the DOM hierarchy of the parent allowing it to overlay surrounding content. Popover calculates its position based on the bounding box of the \`anchor\`. Within Layer, Popover no longer shares a relative root with the \`anchor\` and requires \`positionRelativeToAnchor=false\` to properly calculate its position relative to the anchor element.

Using \`Layer\` with Popover eliminates the need to use \`z-index\` to solve stacking context conflicts. Popovers within Modals and OverlayPanels with z-indexes don't require \`zIndex\` in \`Layer\` thanks to the built-in ScrollBoundaryContainer.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantLayer}
                name="Variant - Layer"
                previewHeight={800}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Ideal direction"
          description={`
Pass in \`idealDirection\` to specify the preferred position of Popover relative to the anchor, such as [Button](/web/button) or [IconButton](/web/iconbutton), that triggered it.

Adjust the \`idealDirection\` as necessary to ensure the visibility of Popover and its contextual information. The default direction is "up", although Popover should be center-aligned directly below the element in most cases. The actual position may change given the available space around the anchor element.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantIdealDirection}
                name="Variant - Ideal direction"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Within scrolling containers"
          description={`
[ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer) is needed for proper positioning when Popover is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Popover remains attached to its anchor when scrolling.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantScrollingContainers}
                name="Variant - Scrolling containers"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Visibility on page load"
          description={`
Popover's positioning algorithm requires that the anchor element renders before Popover is rendered. If Popover should be visible on page load, use \`useEffect\` to toggle the visibility after the first render.
`}
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
            type="do"
            description={`
- Be clear and predictable so that people anticipate what will happen when they interact with an item.
- Focus on the action by beginning with a verb.
- Use succinct and scannable language.
- Use sentence case while always capitalizing the word “Pin.”
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Describe the interface element, like “button,” “icon” or “menu” in education messaging, unless it’s absolutely necessary for clarity.
- Use words like “click” or “tap” in education messaging, if possible, or assume universal accessibility.
- Use Popover to communicate critical information, such as an error or interaction feedback.
`}
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docGen('Popover');

  generatedDocGen.props.color.flowType.raw = '"red" | "white" | "darkGray"';

  return {
    props: {
      generatedDocGen,
    },
  };
}
