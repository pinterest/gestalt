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
import doMinimalStyle from '../../examples/text/doMinimalStyle';
import dontCenterAlign from '../../examples/text/dontCenterAlign';
import dontMixStyles from '../../examples/text/dontMixStyles';
import dontUnderline from '../../examples/text/dontUnderline';
import dontUseHierarchy from '../../examples/text/dontUseHierarchy';
import doStartAlign from '../../examples/text/doStartAlign';
import doUseSize from '../../examples/text/doUseSize';
import doWeight from '../../examples/text/doWeight';
import main from '../../examples/text/main';
import variantAlignment from '../../examples/text/variantAlignment';
import variantBoxInline from '../../examples/text/variantBoxInline';
import variantColors from '../../examples/text/variantColors';
import variantOverflowTruncation from '../../examples/text/variantOverflowTruncation';
import variantRefs from '../../examples/text/variantRefs';
import variantSizes from '../../examples/text/variantSizes';
import variantStyles from '../../examples/text/variantStyles';
import variantTitle from '../../examples/text/variantTitle';

export default function TextPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Badge example" previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            description={`
- Any time that text is needed in the UI as a label, paragraph or number display
`}
            type="do"
          />
          <MainSection.Card
            description={`
- When you need to use a semantic H1–H6 heading to create a clear typographic hierarchy and page structure. Use [Heading](/web/heading) instead.
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Emphasize text inside of paragraphs by using a bold weight."
            sandpackExample={
              <SandpackExample code={doWeight} hideEditor layout="column" name="Do - Font Weight" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Emphasize text inside of paragraphs by underlining it; this can be confused with [Link](/web/link)."
            sandpackExample={
              <SandpackExample
                code={dontUnderline}
                hideControls
                hideEditor
                name="Don't - Underline"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use size to emphasize things like numbers that don’t define a page structure."
            sandpackExample={
              <SandpackExample code={doUseSize} hideEditor layout="column" name="Do - Use Size" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use as section, page or surface titles to create a logical hierarchy. Use [Heading](/web/heading) instead."
            sandpackExample={
              <SandpackExample
                code={dontUseHierarchy}
                hideControls
                hideEditor
                name="Don't - Use Hierarchy"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use a minimal amount of sizes and styles to keep the UI clean and readable."
            sandpackExample={
              <SandpackExample
                code={doMinimalStyle}
                hideEditor
                layout="column"
                name="Do - Minimal Style"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Mix styles and alignment, as this can be hard to read and follow."
            sandpackExample={
              <SandpackExample
                code={dontMixStyles}
                hideControls
                hideEditor
                name="Don't - Mix Styles"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Start-align paragraph text."
            sandpackExample={
              <SandpackExample
                code={doStartAlign}
                hideEditor
                layout="column"
                name="Do - Start Align"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Center-align paragraph text. This is hard to read, especially for users with dyslexia."
            sandpackExample={
              <SandpackExample
                code={dontCenterAlign}
                hideControls
                hideEditor
                name="Don't - Center Align"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <BannerSlim
          helperLink={{
            text: 'View Typography guidelines',
            accessibilityLabel: 'View Typography guidelines',
            href: '/foundations/typography',
            onClick: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Gestalt's typography guidelines contain additional best practices around sizing, style and hierarchy."
          type="info"
        />
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description="A minimum text size of 16 px (12pt) is recommended for readability. Some short text labels, or secondary text can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability."
          title="Accessible sizing"
        />
        <MainSection.Subsection
          description="For low-vision users, text color contrast is very important. To insure accessible contrast, stick to our [standard text colors](/foundations/color/usage#Standard-text-colors). See our [accessibility](/foundations/accessibility) page for design considerations and handy accessibility tools for checking color contrast."
          title="Accessible color"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="Keep text simple and short to avoid truncation or line wrapping in UI controls like buttons when translating languages that require more characters. Avoid overriding our line-height settings, as this can result in text clipping for scripts, like Hindi, that have taller ascenders and descenders."
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Use `align` to adjust the positioning of text within wrapper elements."
          title="Alignment"
        >
          <SandpackExample code={variantAlignment} name="Variants - Alignment" />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
          The Text component allows you to specify whether you want \`block\` or \`inline\` text.
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
          description={`
          You can apply \`size\` options to define the size of the text. These font sizes follow those available through our [Design Tokens](/foundations/design_tokens/overview#Font-size). If your text needs to be a [semantic heading (H1-H6)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Heading](/web/heading) instead.

        `}
          title="Sizes"
        >
          <SandpackExample code={variantSizes} layout="column" name="Variants - Sizes" />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`There are multiple styles, such as bold and italic, that we can attach to the Text component.

Note: Use "underline" style with caution. It should be limited to links and it's already internally managed by the component to adhere to best practices`}
          title="Styles"
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

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Keep text in UI components short and clear
- Use **Sentence case** for UI labels
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Use long text labels that could end up truncating or causing space issues when translating to other languages
- Use **Title Case** or **ALL CAPS** in UI labels
- Use ALL CAPS for paragaph text unless referring to a product or other entity that uses that style
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
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
      **[Design tokens](/foundations/design_tokens)**
      Values for text sizes, weights, families and colors.
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
    props: { generatedDocGen: await docGen('Text') },
  };
}
