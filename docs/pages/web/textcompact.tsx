import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/textcompact/main';
import variantAlignment from '../../examples/textcompact/variantAlignment';
import variantBoxInline from '../../examples/textcompact/variantBoxInline';
import variantColors from '../../examples/textcompact/variantColors';
import variantOverflowTruncation from '../../examples/textcompact/variantOverflowTruncation';
import variantRefs from '../../examples/textcompact/variantRefs';
import variantStyles from '../../examples/textcompact/variantStyles';
import variantTitle from '../../examples/textcompact/variantTitle';

export default function TextPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name="Main TextCompact example"
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Use `align` to adjust the positioning of text within wrapper elements."
          title="Alignment"
        >
          <SandpackExample code={variantAlignment} name="Variants - Alignment" />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
          The TextCompact component allows you to specify whether you want \`block\` or \`inline\` text.
        `}
          title="Block vs. inline"
        >
          <SandpackExample
            code={variantBoxInline}
            name="Variants - Alignment"
            previewHeight={180}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        You can specify which color you want for your text. Most colors change in dark mode, but \`light\` and \`dark\` are available when no switch is desired.

        `}
          title="Colors"
        >
          <SandpackExample code={variantColors} name="Variants - Colors" />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Gestalt provides utility options to deal with text overflow."
          title="Overflow & truncation"
        >
          <SandpackExample
            code={variantOverflowTruncation}
            name="Variants - Overflow & Truncation"
            previewHeight={500}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="TextCompact is available in ´default´ and ´emphasis´ weight as well as in italic."
          title="Style"
        >
          <SandpackExample code={variantStyles} name="Variants - Styles" previewHeight={200} />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`title\` attribute on a \`<div>\` can be used to show the full text of a truncated string on hover. That attribute is populated automatically when the text is truncated using \`lineClamp\`, as long as \`children\` is a string.
           If \`children\` is a \`React.Node\` (e.g. [when using Link](/web/link#Link-and-Text)), use the \`title\` prop to manually set the \`title\` attribute.`}
          title="Title"
        >
          <SandpackExample code={variantTitle} layout="column" name="Variants - Title" />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Don't use \`ref\` to manipulate the underlaying HTML div or span elements. Use \`ref\` to only read HTML attributes. For example, a valid use case can be detecting [truncation](#Overflow-and-truncation). The example below illustrates a case where detecting truncation allows rendering links contained within Text.`}
          title="Refs"
        >
          <SandpackExample
            code={variantRefs}
            layout="column"
            name="Variants - Refs"
            previewHeight={250}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Heading](/web/text)**
      A component to use for all text content on a page except for UI text components.
`}
        />
        <MainSection.Subsection
          description={`
      **[Heading](/web/heading)**
      Heading allows you to add H1–H6 level text on a page. They are generally placed underneath a PageHeader, and provide you with a way to create a logical text hierarchy.
`}
        />
        <MainSection.Subsection
          description={`
      **[Typography guidelines](/foundations/typography)**
      A run-down on our typographic foundations, with some guidelines for using Heading and Text components together in products.
`}
        />
        <MainSection.Subsection
          description={`
      **[Link](/web/link)**
      Used as a text-only navigational element. Links usually appear within or directly following a paragraph or sentence.
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
    props: { generatedDocGen: await docGen('TextCompact') },
  };
}
