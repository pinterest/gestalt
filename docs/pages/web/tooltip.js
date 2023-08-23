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
import avoidRepetitiveLabeling1 from '../../examples/tooltip/avoidRepetitiveLabeling1.js';
import avoidRepetitiveLabeling2 from '../../examples/tooltip/avoidRepetitiveLabeling2.js';
import displayLinkAtBottom from '../../examples/tooltip/displayLinkAtBottom.js';
import dontPairWithDisabledElement from '../../examples/tooltip/dontPairWithDisabledElement.js';
import dontUseToCommunicateCriticalInfo from '../../examples/tooltip/dontUseToCommunicateCriticalInfo.js';
import dontUseToRestateVisibleText from '../../examples/tooltip/dontUseToRestateVisibleText.js';
import mainExample from '../../examples/tooltip/mainExample.js';
import positionRelativeToInlineElement from '../../examples/tooltip/positionRelativeToInlineElement.js';
import properPositioningExample from '../../examples/tooltip/properPositioningExample.js';
import specifyPreferredPosition from '../../examples/tooltip/specifyPreferredPosition.js';
import specifyZIndexOrder from '../../examples/tooltip/specifyZIndexOrder.js';
import useToAddSupplementaryInfo from '../../examples/tooltip/useToAddSupplementaryInfo.js';
import useToDescribeInteractiveElement from '../../examples/tooltip/useToDescribeInteractiveElement.js';
import useToDistinguishRelatedActions from '../../examples/tooltip/useToDistinguishRelatedActions.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Tooltip">
      <PageHeader
        name="Tooltip"
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
            message="Planning to use Tooltip with IconButton? Instead, use"
            helperLink={{
              text: "IconButton's built-in tooltip.",
              accessibilityLabel: 'View IconButton Docs, with Tooltip section',
              href: '/web/iconbutton#With-Tooltip',
              onClick: () => {},
            }}
          />
        }
      >
        <SandpackExample
          name="Main Example"
          code={mainExample}
          layout="column"
          hideEditor
          previewHeight={160}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Providing helpful, but non-essential context to a UI element.
          - Enhancing a baseline understanding of an element or feature.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Using a separate Tooltip instance with IconButton. Use [IconButton's built-in tooltip](/web/iconbutton#With-Tooltip) instead.
          - Displaying information that is critical to the understanding of an element/feature. Use inline text instead.
          - Offering context at the surface-level scope. Consider a [Callout](/web/callout) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Tooltip to describe the function of an interactive element, typically [Icon Button](/web/iconbutton), in as few words as possible."
            sandpackExample={
              <SandpackExample
                name="Use to Describe Interactive Element Functionality"
                code={useToDescribeInteractiveElement}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tooltip to restate text already visible on screen."
            sandpackExample={
              <SandpackExample
                name="Don't Use to Restate Visible Text"
                code={dontUseToRestateVisibleText}
                layout="column"
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
            description="Use Tooltip to distinguish related actions with visually similar iconography."
            sandpackExample={
              <SandpackExample
                name="Use to Distinguish Related Actions"
                code={useToDistinguishRelatedActions}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tooltip to communicate critical information, such as an error, instructions for performing a task or interaction feedback."
            sandpackExample={
              <SandpackExample
                name="Don't Use to Communicate Critical Information"
                code={dontUseToCommunicateCriticalInfo}
                layout="column"
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
            description="Use Tooltip to add supplementary information about a feature, typically paired with an `info-circle` [IconButton](/web/iconbutton)."
            sandpackExample={
              <SandpackExample
                name="Use to Add Supplementary Information"
                code={useToAddSupplementaryInfo}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Pair Tooltip with a disabled element. See [disabled elements](#Disabled-elements) to learn more."
            sandpackExample={
              <SandpackExample
                name="Don't Pair with Disabled Element"
                code={dontPairWithDisabledElement}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
When using Tooltip with [IconButton](/web/iconbutton), avoid repetitive labeling. The \`accessibilityLabel\` provided to IconButton should describe the intent of the button, not the icon itself. For instance, use “Settings” instead of “Cog icon”. Tooltip \`text\` should expand upon that intention, as seen in the "cog" example below. If Tooltip \`text\` is the same as IconButton \`accessibilityLabel\`, then add \`accessibilityLabel=""\` to the Tooltip, as seen with the "share" example below`}
          columns={2}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                name="Avoid Repetitive Labeling IconButton Example"
                code={avoidRepetitiveLabeling1}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                name="Avoid Repetitive Labeling IconButton Example (1)"
                code={avoidRepetitiveLabeling2}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disabled elements"
          description={`
Tooltips must be paired with an interactive, focusable element, like [Button](/web/button) or [IconButton](/web/iconbutton). They cannot be paired with anything disabled or static, because this prevents keyboard users from triggering Tooltip and consuming its content. To test if you’re using Tooltip properly, use your keyboard rather than your mouse to trigger Tooltip.

If you need to explain why an item is disabled, consider adding plain [Text](/web/text) near the disabled item, or an \`info-circle\` [IconButton](/web/iconbutton) adjacent to the disabled element.
`}
        />
        <MainSection.Card />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description={`Be sure to localize the \`text\` and \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Ideal direction"
          description={`Pass in \`idealDirection\` to specify the preferred position of Tooltip relative to its anchor element. The default direction is "down", which should be used in most cases. The actual position may change given the available space around the anchor element.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Specify Preferred Position Example"
                code={specifyPreferredPosition}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Inline"
          description="Use inline to properly position Tooltip relative to an inline element, such as an [Icon Button](/web/iconbutton)"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Position Relative to Inline Element Example"
                code={positionRelativeToInlineElement}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Link"
          description={`
      Pass in \`link\` to display a link at the bottom of Tooltip.

      ⚠️ Note: this feature will soon be deprecated, as it is not accessible. Please do not use it in new designs or features.
      ⚠️ Note: Please use [HelpButton](/web/helpbutton) instead.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Display Link at Bottom - Note Deprication"
                code={displayLinkAtBottom}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Z-index"
          description={`Tooltip has [Layer](/web/layer) built in, allowing it to overlay surrounding content. Use \`zIndex\` to specify the stacking order of Tooltip along the z-axis in the current stacking context. The example below shows [FixedZIndex](/web/zindex_classes#FixedZIndex) used in [Modal](/web/modal) and [CompositeZIndex](zindex_classes#CompositeZIndex) to layer Tooltip on top.

`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Specify Z-Index Order Example" code={specifyZIndexOrder} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Within scrolling containers"
          description="ScrollBoundaryContainer is needed for proper positioning when Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Tooltip remains attached to its anchor when scrolling."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Proper Positioning Within Scrolling Containers"
                code={properPositioningExample}
              />
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
- Describe only the element that triggers Tooltip.
- Focus on the action by beginning with a verb.
- Use succinct and scannable language.
- As much as possible, limit Tooltip's text to a maximum of 60 to 75 characters.
- Use sentence case while always capitalizing the word “Pin.”
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Describe elements other than the one that triggers Tooltip.
- Use Tooltip to restate text already visible on screen.
- Use Tooltip to communicate critical information, such as an error, instructions for performing a task, or interaction feedback.
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Popover](/web/popover)**
Popover displays a lightweight task related to the content on screen. One example of Popover is the board picker, which allows people to choose the board to save a Pin to. While Tooltips are purely text-based, Popovers offer broader content options, such as [Buttons](/web/button) and [Images](/web/image).

**[ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer)**
ScrollBoundaryContainer is needed for proper positioning when Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Tooltip remains attached to its anchor when scrolling. See the [within scrolling containers](#Within-scrolling-containers) variant to learn more.

**[Toast](/web/toast)**
Toast provides feedback on an interaction. One example of Toast is the confirmation that appears when a Pin has been saved. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of being attached to any particular element on the interface.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Tooltip') },
  };
}
