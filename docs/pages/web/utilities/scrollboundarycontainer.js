// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../../docs-components/docgen';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import QualityChecklist from '../../../docs-components/QualityChecklist';
import SandpackExample from '../../../docs-components/SandpackExample';
import autoOverflowExample from '../../../examples/scrollboundarycontainer/autoOverflowExample';
import modalExample from '../../../examples/scrollboundarycontainer/modalExample';
import popoverExample from '../../../examples/scrollboundarycontainer/popoverExample';
import visibleOverflowExample from '../../../examples/scrollboundarycontainer/visibleOverflowExample';

export default function ScrollBoundaryContainerPage({
  generatedDocGen,
}: {
  generatedDocGen: DocGen,
}): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
When scrolling is desired, we must explicitly set a height. Unless a height is set, the content will push the parent container's height.

In ScrollBoundaryContainer, height is an optional prop with a default value of \`100%\`. If ScrollBoundaryContainer’s immediate parent is a component with a fixed height, do not pass a height to ScrollBoundaryContainer as seen in first example below. On the other hand, if there isn’t an immediate parent fixing the height, you must specify the ScrollBoundaryContainer height as seen in the  second example below.`}
          title="Height"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={popoverExample}
                name="Popover within ScrollBoundaryContainer"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
In most cases, \`overflow\` set to "auto" is the expected behavior for most containers. If the scrolling container is large enough, Popover-based components are displayed without problems.

However, if ScrollBoundaryContainer is small and hides Popover-based components within its boundaries, \`overflow\` set to "visible" displays Popover-based components above ScrollBoundaryContainer. This approach should only be used when there is no chance that the content within ScrollBoundaryContainer can overflow outside of it and, therefore, require scroll.

Use this approach if implementing ScrollBoundaryContainer in a higher parent container doesn't fix your Popover-based components positioning issues as expected.

See the examples below to compare the implementation in both circumnstances.`}
          title="Overflow"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={autoOverflowExample} name="Overflow prop set to auto" />
            }
            title={`Overflow="auto"`}
          />{' '}
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={visibleOverflowExample} name="Overflow prop set to visible" />
            }
            title={`Overflow="visible"`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
Modal and OverlayPanel come with ScrollBoundaryContainer built-in, so any anchored components used in their children tree should work out-of-the-box. Passing an additional ScrollBoundaryContainer will break the existing styling on scroll.

The following example shows the internal ScrollBoundaryContainer in action. The main content of both Modal and OverlayPanel is a form which includes Dropdown and ComboBox.`}
          title="Built-in component"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={modalExample}
                layout="column"
                name="Built-in component"
                previewHeight={600}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Box](/web/box)**
      Box's [\`overflow\` prop](/web/box#Overflow) specifies what should happen if the content is larger than the bounding box. Box should not be replaced with ScrollBoundaryContainer if the goal is simply to allow Box to scroll when content overflows. ScrollBoundaryContainer is only needed when anchored components, such as [Tooltip](/web/tooltip), [Popover](/web/popover), [ComboBox](/web/combobox)  or [Dropdown](/web/dropdown), are used within a container that could potentially scroll.

      **[Modal](/web/modal)** / **[OverlayPanel](/web/overlaypanel)**
      Modal and OverlayPanel come with ScrollBoundaryContainer built-in, so any anchored components used in their children tree should work out-of-the-box. Passing an additional ScrollBoundaryContainer will break the existing styling on scroll.

      **[Tooltip](/web/tooltip)** / **[Popover](/web/popover)** / **[Dropdown](/web/dropdown)** / **[ComboBox](/web/combobox) ** **
      ScrollBoundaryContainer must be used around any of these components if they are used within a container that could possibly scroll. This is necessary to ensure the component remains attached to its anchor on scroll. If they are located within scrolling Modal or OverlayPanel components, ScrollBoundaryContainer isn't needed as it's already built-in.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('ScrollBoundaryContainer') },
  };
}
