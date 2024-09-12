import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import doForScroll from '../../examples/iconbuttonfloating/doForScroll';
import dontNegative from '../../examples/iconbuttonfloating/dontNegative';
import dontNotification from '../../examples/iconbuttonfloating/dontNotification';
import main from '../../examples/iconbuttonfloating/main';
import variantsA11y from '../../examples/iconbuttonfloating/variantsA11y';
import variantsWithTooltip from '../../examples/iconbuttonfloating/variantsWithTooltip';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main IconButtonFloating example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - To represent a primary or common action when it has to be visible all the time on the screen on top of everything.
            - Triggering a Modal or a Popover to complete a related task.
            - Only if it is the most suitable way to present a screen's high-emphasis action.
            `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - There isn't a need for a fixed IconButtonFloating visible all the time on the screen.
            - To replace [IconButton](/web/iconbutton) established patterns, such as navigation elements.
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
            description="Use when an action has to be visible at all times in a sticky way where content can scroll underneath."
            sandpackExample={
              <SandpackExample code={doForScroll} hideEditor name="Scroll example" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Layer notification badges on top of IconButtonFloating. This pattern is typically used on IconButtons as part of a navigation component. IconButtonFloating shouldn't contain notifications found elsewhere on a screen, as it can lead to cognitive and usability issues. Users with color-blinded vision could also miss the intention of the notification since it doesn't offer a visually supportive affordance besides color."
            sandpackExample={
              <SandpackExample
                code={dontNotification}
                hideControls
                hideEditor
                name="Notification example"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use IconButtonFloating for positive and supportive actions like Create, Help or Maximize."
            sandpackExample={
              <SandpackExample code={variantsA11y} hideEditor name="Center example" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use IconButtonFloating for negative and destructive actions like Delete or Remove. "
            sandpackExample={
              <SandpackExample
                code={dontNegative}
                hideControls
                hideEditor
                name="Negative example"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
IconButtonFloating conveys the component behavior using iconography. IconButtonFloating requires \`accessibilityLabel\`, a text description for screen readers to announce and communicate the represented [Icon](/web/icon). In the example below, the screen reader reads: "Create Pin menu". **The label should describe the intent of the action, not the Icon itself.** For example, use "Edit board" instead of "Pencil".

If IconButtonFloating is used as a control button to show/hide a [Popover-based component](/web/popover), we recommend passing the following ARIA attributes to assist screen readers:

- \`accessibilityControls\`: informs the screen reader that IconButtonFloating controls the display of a [Dropdown](/web/dropdown). Not needed if IconButtonFloating opens a Modal or other dialog. This populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityPopupRole\`: informs the screen reader that there’s either a \`menu\` component, like Dropdown, or a \`dialog\` component, like Modal or Popover, attached to IconButtonFloating. This populates [aria-haspopup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup).
- \`accessibilityExpanded\`: informs the screen reader whether an anchored Dropdown component is currently open or closed. This populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
          title="ARIA attributes"
        >
          <MainSection.Subsection
            description={`
IconButtonFloating should be contained within the \`role="contentinfo"\` container on a page. This gives screen reader users the ability to skip any main content and go directly to the action buttons using the rotor. If there are multiple IconButtonFloatings, they should all be contained within the \`role="contentinfo"\` container.`}
            title="Keyboard interaction"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={variantsA11y} name="A11Y example" />}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description="IconButtonFloating size is only available in a single size, 56px (the equivalent of [IconButton's size='xl'](/web/iconbutton#Size)). Keeping the size consistent will promote a cohesive Pinner experience and avoid usability issues. "
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={doForScroll} name="Variants - Size" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
          IconButtonFloating is always placed along the bottom of the screen. A consistent position improves discoverability when IconButtonFloating appears across a wide range of surfaces. For example, an IconButtonFloating used to open resources should remain in the same spot on the page across surfaces. In most cases, only one IconButtonFloating should be present on a screen. The exception is using a centered IconButtonFloating as a primary action, like Pin or board creation.

          **Bottom edge placement**
          IconButtonFloating should typically be placed in the bottom edge of the screen (bottom right for LTR languages, and bottom left for RTL languages). This applies to supportive actions, such as opening related content and resources.

          **Centered placement**
          Use a centered placement when leading Pinners to an action or task that should remain present when scrolling, such as creating a new board.
`}
          title="Placement"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={doForScroll} name="Variants - Scroll Placement - Bottom" />
            }
            title="Bottom edge placement"
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={variantsA11y} name="Variants - Scroll Placement - Centered" />
            }
            title="Centered placement"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="IconButtonFloating requires a [tooltip](/web/tooltip) to provide additional context to the user about the action."
          title="With tooltip"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantsWithTooltip} name="Variants - With tooltip" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - Use a descriptive label to describe the IconButtonFloating action by beginning with a verb.`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`- Use the words "image" or "icon" in the description label. Instead, prefer to use verbs that describe the action, e.g. "Save" or "Edit".`}
            type="don't"
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
Button allows users to take actions and make choices using text labels to express what action will occur when the user interacts with it.

**[Icon](/web/icon)**
IconButtonFloating uses icons instead of text to convey available actions on a screen. Use an existing icon from the [Gestalt icon library](/foundations/iconography/library).

**[Dropdown](/web/dropdown)**
IconButtonFloating is commonly paired with Dropdown to display a menu of options or actions.
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
  const generatedDocGen = await docGen('IconButtonFloating');

  if (generatedDocGen.props.icon) {
    generatedDocGen.props.icon = {
      ...generatedDocGen.props.icon,
      tsType: {
        name: 'string',
        raw: 'Icon[icon]',
      },
    };
  }

  return {
    props: { generatedDocGen },
  };
}
