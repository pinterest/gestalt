// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import variantBasic from '../../examples/column/variantBasic.js';
import variantEqualHeight from '../../examples/column/variantEqualHeight.js';
import variantGutters from '../../examples/column/variantGutters.js';
import variantResizingColumns from '../../examples/column/variantResizingColumns.js';
import variantStackingColumns from '../../examples/column/variantStackingColumns.js';
import variantThreeColumn from '../../examples/column/variantThreeColumn.js';
import variantTwoColumn from '../../examples/column/variantTwoColumn.js';
import variantTwoColumnUnequal from '../../examples/column/variantTwoColumnUnequal.js';

const ignoredProps = ['smSpan', 'mdSpan', 'lgSpan'];

export default function ColumnPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} excludeProps={ignoredProps} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Using the span prop"
          description="Column is a basic layout component to help you size your UI relative to its container. A full width is composed of 12 units, each equal to 1/12 of the total width of the containing element. By setting the `span` prop you dictate the fractional width an element can occupy."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantBasic}
                layout="column"
                name="Variant - Using the span prop"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Three equal columns">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantThreeColumn}
                layout="column"
                name="Variant - Three Columns"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Two equal columns">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantTwoColumn}
                layout="column"
                name="Variant - Two equal columns"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Two unequal columns">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantTwoColumnUnequal}
                layout="column"
                name="Variant - Two Unequal Columns"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Using responsive breakpoints"
          description="Column supports setting a span at our 3 responsive breakpoints: `sm`, `md`, `lg`. Each sets the span of the column from that breakpoint and up. If you don't want your column to be responsive, only set the `span` prop."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantStackingColumns}
                layout="column"
                name="Variant - Stacking Columns"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Resizing Columns">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantResizingColumns}
                layout="column"
                name="Variant - Resizing Columns"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Equal height columns"
          description="Unlike traditional CSS columns, using flex columns makes each column equal height by default."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantEqualHeight}
                layout="column"
                name="Variant - Equal Height Columns"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Gutters"
          description="Column gutters can be created through composition and negative margins."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantGutters} layout="column" name="Variant - Gutters" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
          **[Flex](/web/flex)**
        Flex is a layout component for flexbox layouts, especially when even spacing between elements is desired (see the \`gap\` prop!).

        **[Masonry](/web/masonry)**
        Masonry creates a deterministic grid layout, positioning items based on available vertical space. It contains performance optimizations like virtualization and support for infinite scrolling.
        `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Column') },
  };
}
