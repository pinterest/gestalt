// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import exampleWithExternalControl from '../../examples/module/exampleWithExternalControl.js';
import expandable from '../../examples/module/expandable.js';
import expandableGroup from '../../examples/module/expandableGroup.js';
import expandableWithErrorType from '../../examples/module/expandableWithErrorType.js';
import expandableWithIconBadgeIconButton from '../../examples/module/expandableWithIconBadgeIconButton.js';
import mainExample from '../../examples/module/mainExample.js';
import staticVariant from '../../examples/module/staticVariant.js';
import staticWithBadge from '../../examples/module/staticWithBadge.js';
import staticWithErrorType from '../../examples/module/staticWithErrorType.js';
import staticWithIcon from '../../examples/module/staticWithIcon.js';
import staticWithIconButton from '../../examples/module/staticWithIconButton.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.Module?.description}>
      <PageHeader
        name={generatedDocGen.Module?.displayName}
        description={generatedDocGen.Module?.description}
      >
        <SandpackExample name="Main Example" code={mainExample} layout="column" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Module} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Grouping and organizing content to keep the page clean and digestible.
          - Displaying additional related content about a particular subject.
          - Enabling users to reveal or hide additional content as necessary (with Expandable variant).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - In a layout that conveys a clear sense of information hierarchy. Use [SegmentedControl](/web/segmentedcontrol) instead.
          - When long content can’t be displayed all at once, and scrolling is necessary.
          - When there is insufficient content to condense, as collapsing can increase cognitive load and interaction cost. Consider the static variant of Module.
          - When the content is crucial to read in full. Consider the static variant instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.Module?.description} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.ModuleExpandable?.displayName}
          description={generatedDocGen?.ModuleExpandable?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.ModuleExpandable}
            id="Module.Expandable"
            name="Module.Expandable"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Static"
          description={`A Module is a container that can hold any content, and can optionally have a \`title\` that describes the content inside. The default, static Module is used to display information that should always be visible.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Static Variant" code={staticVariant} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - Icon"
          description={`
    An Icon can be provided to be placed before the \`title\`.

    It is recommended that icons be used sparingly to convey additional information, and instead should simply reinforce information in the title. Be sure to provide an \`iconAccessibilityLabel\`.
    `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Static With Icon" code={staticWithIcon} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - IconButton"
          description={`
    An IconButton can be provided to be placed after the \`title\` for a supplemental Call To Action (CTA).
    `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Static With IconButton" code={staticWithIconButton} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - Badge"
          description={`Badge text can be provided, which will be displayed after the \`title\`. Note that if no title text is provided, the badge will not be displayed.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Static With Badge" code={staticWithBadge} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - Error"
          description={`When using \`type\` as \`"error"\`, be sure to provide an \`iconAccessibilityLabel\`.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Static With Error Type" code={staticWithErrorType} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable"
          description={`Modules can also allow for expanding and collapsing content. The \`title\` is required and always present. The collapsed state shows optional \`summary\` content, while the expanded state shows any content desired.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Expandable" code={expandable} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Group"
          description="Multiple expandable items can be stacked together into a Module group. However, only one Module will be expanded at any time."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Expandable Group" code={expandableGroup} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Icon, Badge and IconButton"
          description={`
    An Icon can be provided to be placed before the \`title\`.
    It is recommended that icons be used sparingly to convey additional information, and instead should simply reinforce information in the title. Be sure to provide an \`iconAccessibilityLabel\`.

    Badge text can also be provided, which will be displayed after the \`title\`.

    An IconButton can be provided to be placed after the \`title\` for a supplemental Call To Action (CTA).`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Expandable With Icon, Badge & IconButton"
                code={expandableWithIconBadgeIconButton}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Error"
          description={`When using \`type\` as \`"error"\`, be sure to provide an \`iconAccessibilityLabel\`.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Expandable With Error Type" code={expandableWithErrorType} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Example with external control">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Example With External Control"
                code={exampleWithExternalControl}
                previewHeight={500}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.Module.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipleDocGen(['Module', 'ModuleExpandable']);

  docGen.Module.props.icon = {
    ...docGen.Module.props.icon,
    flowType: {
      name: 'string',
      raw: 'Icon[icon]',
    },
  };

  return {
    props: { generatedDocGen: docGen },
  };
}
