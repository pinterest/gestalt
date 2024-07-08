import { BannerSlim } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import avoidRepetitiveLabeling1 from '../../examples/tooltip/avoidRepetitiveLabeling1';
import avoidRepetitiveLabeling2 from '../../examples/tooltip/avoidRepetitiveLabeling2';
import displayLinkAtBottom from '../../examples/tooltip/displayLinkAtBottom';
import dontPairWithDisabledElement from '../../examples/tooltip/dontPairWithDisabledElement';
import dontUseToCommunicateCriticalInfo from '../../examples/tooltip/dontUseToCommunicateCriticalInfo';
import dontUseToRestateVisibleText from '../../examples/tooltip/dontUseToRestateVisibleText';
import mainExample from '../../examples/tooltip/mainExample';
import positionRelativeToInlineElement from '../../examples/tooltip/positionRelativeToInlineElement';
import properPositioningExample from '../../examples/tooltip/properPositioningExample';
import specifyPreferredPosition from '../../examples/tooltip/specifyPreferredPosition';
import specifyZIndexOrder from '../../examples/tooltip/specifyZIndexOrder';
import useToAddSupplementaryInfo from '../../examples/tooltip/useToAddSupplementaryInfo';
import useToDescribeInteractiveElement from '../../examples/tooltip/useToDescribeInteractiveElement';
import useToDistinguishRelatedActions from '../../examples/tooltip/useToDistinguishRelatedActions';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title="Tooltip">
      <PageHeader
        bannerSlim={
          <BannerSlim
            helperLink={{
              text: "IconButton's built-in tooltip.",
              accessibilityLabel: 'View IconButton Docs, with Tooltip section',
              href: '/web/iconbutton#With-Tooltip',
              onClick: () => {},
            }}
            iconAccessibilityLabel="Info"
            message="Planning to use Tooltip with IconButton? Instead, use"
            type="info"
          />
        }
        description={generatedDocGen?.description}
        name="Tooltip"
      >
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={160}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Providing helpful, but non-essential context to a UI element.
          - Enhancing a baseline understanding of an element or feature.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Using a separate Tooltip instance with IconButton. Use [IconButton's built-in tooltip](/web/iconbutton#With-Tooltip) instead.
          - Displaying information that is critical to the understanding of an element/feature. Use inline text instead.
          - Offering context at the surface-level scope. Consider a [BannerCallout](/web/bannercallout) instead.
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
            description="Use Tooltip to describe the function of an interactive element, typically [Icon Button](/web/iconbutton), in as few words as possible."
            sandpackExample={
              <SandpackExample
                code={useToDescribeInteractiveElement}
                hideEditor
                layout="column"
                name="Use to Describe Interactive Element Functionality"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Tooltip to restate text already visible on screen."
            sandpackExample={
              <SandpackExample
                code={dontUseToRestateVisibleText}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use to Restate Visible Text"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Tooltip to distinguish related actions with visually similar iconography."
            sandpackExample={
              <SandpackExample
                code={useToDistinguishRelatedActions}
                hideEditor
                layout="column"
                name="Use to Distinguish Related Actions"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Tooltip to communicate critical information, such as an error, instructions for performing a task or interaction feedback."
            sandpackExample={
              <SandpackExample
                code={dontUseToCommunicateCriticalInfo}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use to Communicate Critical Information"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Tooltip to add supplementary information about a feature, typically paired with an `info-circle` [IconButton](/web/iconbutton)."
            sandpackExample={
              <SandpackExample
                code={useToAddSupplementaryInfo}
                hideEditor
                layout="column"
                name="Use to Add Supplementary Information"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Pair Tooltip with a disabled element. See [disabled elements](#Disabled-elements) to learn more."
            sandpackExample={
              <SandpackExample
                code={dontPairWithDisabledElement}
                hideControls
                hideEditor
                layout="column"
                name="Don't Pair with Disabled Element"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          columns={2}
          description={`
When using Tooltip with [IconButton](/web/iconbutton), avoid repetitive labeling. The \`accessibilityLabel\` provided to IconButton should describe the intent of the button, not the icon itself. For instance, use “Settings” instead of “Cog icon”. Tooltip \`text\` should expand upon that intention, as seen in the "cog" example below. If Tooltip \`text\` is the same as IconButton \`accessibilityLabel\`, then add \`accessibilityLabel=""\` to the Tooltip, as seen with the "share" example below`}
          title="Labels"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={avoidRepetitiveLabeling1}
                layout="column"
                name="Avoid Repetitive Labeling IconButton Example"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={avoidRepetitiveLabeling2}
                layout="column"
                name="Avoid Repetitive Labeling IconButton Example (1)"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
Tooltips must be paired with an interactive, focusable element, like [Button](/web/button) or [IconButton](/web/iconbutton). They cannot be paired with anything disabled or static, because this prevents keyboard users from triggering Tooltip and consuming its content. To test if you’re using Tooltip properly, use your keyboard rather than your mouse to trigger Tooltip.

If you need to explain why an item is disabled, consider adding plain [Text](/web/text) near the disabled item, or an \`info-circle\` [IconButton](/web/iconbutton) adjacent to the disabled element.
`}
          title="Disabled elements"
        />
        <MainSection.Card />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Pass in \`idealDirection\` to specify the preferred position of Tooltip relative to its anchor element. The default direction is "down", which should be used in most cases. The actual position may change given the available space around the anchor element.`}
          title="Ideal direction"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={specifyPreferredPosition}
                name="Specify Preferred Position Example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use inline to properly position Tooltip relative to an inline element, such as an [Icon Button](/web/iconbutton)"
          title="Inline"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={positionRelativeToInlineElement}
                layout="column"
                name="Position Relative to Inline Element Example"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
      Pass in \`link\` to display a link at the bottom of Tooltip.

      ⚠️ Note: this feature will soon be deprecated, as it is not accessible. Please do not use it in new designs or features.
      ⚠️ Note: Please use [HelpButton](/web/helpbutton) instead.
      `}
          title="Link"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={displayLinkAtBottom}
                name="Display Link at Bottom - Note Deprication"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Tooltip has [Layer](/web/layer) built in, allowing it to overlay surrounding content. Use \`zIndex\` to specify the stacking order of Tooltip along the z-axis in the current stacking context. The example below shows [FixedZIndex](/web/zindex_classes#FixedZIndex) used in [Modal](/web/modal) and [CompositeZIndex](zindex_classes#CompositeZIndex) to layer Tooltip on top.

`}
          title="Z-index"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={specifyZIndexOrder} name="Specify Z-Index Order Example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="ScrollBoundaryContainer is needed for proper positioning when Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Tooltip remains attached to its anchor when scrolling."
          title="Within scrolling containers"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={properPositioningExample}
                name="Proper Positioning Within Scrolling Containers"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Describe only the element that triggers Tooltip.
- Focus on the action by beginning with a verb.
- Use succinct and scannable language.
- As much as possible, limit Tooltip's text to a maximum of 60 to 75 characters.
- Use sentence case while always capitalizing the word “Pin.”
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Describe elements other than the one that triggers Tooltip.
- Use Tooltip to restate text already visible on screen.
- Use Tooltip to communicate critical information, such as an error, instructions for performing a task, or interaction feedback.
`}
            type="don't"
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Tooltip') },
  };
}
