// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import exampleWithExternalControl from '../../examples/accordion/exampleWithExternalControl';
import expandable from '../../examples/accordion/expandable';
import expandableGroup from '../../examples/accordion/expandableGroup';
import expandableWithErrorType from '../../examples/accordion/expandableWithErrorType';
import expandableWithIconBadgeIconButton from '../../examples/accordion/expandableWithIconBadgeIconButton';
import localizationLabels from '../../examples/accordion/localizationLabels';
import mainExample from '../../examples/accordion/mainExample';
import sizesExample from '../../examples/accordion/sizesExample';
import staticVariant from '../../examples/accordion/staticVariant';
import staticWithBadge from '../../examples/accordion/staticWithBadge';
import staticWithErrorType from '../../examples/accordion/staticWithErrorType';
import staticWithIcon from '../../examples/accordion/staticWithIcon';
import staticWithIconButton from '../../examples/accordion/staticWithIconButton';

export default function DocsPage({
  generatedDocGen,
}: {
  generatedDocGen: { [string]: DocGen },
}): ReactNode {
  return (
    <Page title={generatedDocGen.Accordion?.description}>
      <PageHeader
        name={generatedDocGen.Accordion?.displayName}
        packageFileLocation={generatedDocGen.Accordion?.packageFileLocation}
        description={generatedDocGen.Accordion?.description}
      >
        <SandpackExample name="Main Example" code={mainExample} layout="column" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Accordion} />

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
          - When there is insufficient content to condense, as collapsing can increase cognitive load and interaction cost. Consider the static variant of Accordion.
          - When the content is crucial to read in full. Consider the static variant instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.Accordion?.description} />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen.Accordion?.displayName}
        notes={`Note that \`accessibilityCollapseLabel\` and \`accessibilityExpandLabel\` are optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.AccordionExpandable?.displayName}
          description={generatedDocGen?.AccordionExpandable?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.AccordionExpandable}
            id="Accordion.Expandable"
            name="Accordion.Expandable"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Static"
          description={`An Accordion is a container that can hold any content, and can optionally have a \`title\` that describes the content inside. The default, static Accordion is used to display information that should always be visible.`}
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
          description={`Accordions can also allow for expanding and collapsing content. The \`title\` is required and always present. The collapsed state shows optional \`summary\` content, while the expanded state shows any content desired.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Expandable" code={expandable} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Group"
          description="Multiple expandable items can be stacked together into an Accordion group. However, only one Accordion will be expanded at any time."
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
        <MainSection.Subsection
          title="Sizes"
          description={`Module can have different sizes. The default size is large with a padding of 24px (\`$space-600\`). For a dense variant, use the \`sm\` size with a padding of 8px (\`$space-200\`).`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Density Example" code={sizesExample} />}
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
      <QualityChecklist component={generatedDocGen?.Accordion.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: { [string]: DocGen } },
}> {
  const docGen = await multipleDocGen(['Accordion', 'AccordionExpandable']);

  docGen.Accordion.props.icon = {
    ...docGen.Accordion.props.icon,
    flowType: {
      name: 'string',
      raw: 'Icon[icon]',
    },
  };

  return {
    props: { generatedDocGen: docGen },
  };
}
