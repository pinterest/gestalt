import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
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

const DOC_NAMES = ['Accordion', 'AccordionExpandable'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen.Accordion?.description}>
      <PageHeader
        description={generatedDocGen.Accordion?.description}
        name={generatedDocGen.Accordion?.displayName}
      >
        <SandpackExample code={mainExample} hideEditor layout="column" name="Main Example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Accordion} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Grouping and organizing content to keep the page clean and digestible.
          - Displaying additional related content about a particular subject.
          - Enabling users to reveal or hide additional content as necessary (with Expandable variant).
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - In a layout that conveys a clear sense of information hierarchy. Use [SegmentedControl](/web/segmentedcontrol) instead.
          - When long content can’t be displayed all at once, and scrolling is necessary.
          - When there is insufficient content to condense, as collapsing can increase cognitive load and interaction cost. Consider the static variant of Accordion.
          - When the content is crucial to read in full. Consider the static variant instead.
        `}
            title="When not to use"
            type="don't"
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
          description={generatedDocGen?.AccordionExpandable?.description}
          title={generatedDocGen?.AccordionExpandable?.displayName}
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
          description={`An Accordion is a container that can hold any content, and can optionally have a \`title\` that describes the content inside. The default, static Accordion is used to display information that should always be visible.`}
          title="Static"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={staticVariant} name="Static Variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    An Icon can be provided to be placed before the \`title\`.

    It is recommended that icons be used sparingly to convey additional information, and instead should simply reinforce information in the title. Be sure to provide an \`iconAccessibilityLabel\`.
    `}
          title="Static - Icon"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={staticWithIcon} name="Static With Icon" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    An IconButton can be provided to be placed after the \`title\` for a supplemental Call To Action (CTA).
    `}
          title="Static - IconButton"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={staticWithIconButton} name="Static With IconButton" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Badge text can be provided, which will be displayed after the \`title\`. Note that if no title text is provided, the badge will not be displayed.`}
          title="Static - Badge"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={staticWithBadge} name="Static With Badge" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`When using \`type\` as \`"error"\`, be sure to provide an \`iconAccessibilityLabel\`.`}
          title="Static - Error"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={staticWithErrorType} name="Static With Error Type" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Accordions can also allow for expanding and collapsing content. The \`title\` is required and always present. The collapsed state shows optional \`summary\` content, while the expanded state shows any content desired.`}
          title="Expandable"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={expandable} name="Expandable" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Multiple expandable items can be stacked together into an Accordion group. However, only one Accordion will be expanded at any time."
          title="Expandable - Group"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={expandableGroup} name="Expandable Group" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    An Icon can be provided to be placed before the \`title\`.
    It is recommended that icons be used sparingly to convey additional information, and instead should simply reinforce information in the title. Be sure to provide an \`iconAccessibilityLabel\`.

    Badge text can also be provided, which will be displayed after the \`title\`.

    An IconButton can be provided to be placed after the \`title\` for a supplemental Call To Action (CTA).`}
          title="Expandable - Icon, Badge and IconButton"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={expandableWithIconBadgeIconButton}
                name="Expandable With Icon, Badge & IconButton"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`When using \`type\` as \`"error"\`, be sure to provide an \`iconAccessibilityLabel\`.`}
          title="Expandable - Error"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={expandableWithErrorType} name="Expandable With Error Type" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Module can have different sizes. The default size is large with a padding of 24px (\`$space-600\`). For a dense variant, use the \`sm\` size with a padding of 8px (\`$space-200\`).`}
          title="Sizes"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={sizesExample} name="Density Example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Example with external control">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={exampleWithExternalControl}
                name="Example With External Control"
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
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  const docGen = await multipleDocGen(DOC_NAMES);

  if (docGen.Accordion.props.icon) {
    docGen.Accordion.props.icon = {
      ...docGen.Accordion.props.icon,
      tsType: {
        name: 'string',
        raw: 'Icon[icon]',
      },
    };
  }

  return {
    props: { generatedDocGen: docGen },
  };
}
