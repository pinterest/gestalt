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
import doMinimalStyle from '../../examples/text/doMinimalStyle.js';
import dontCenterAlign from '../../examples/text/dontCenterAlign.js';
import dontMixStyles from '../../examples/text/dontMixStyles.js';
import dontUnderline from '../../examples/text/dontUnderline.js';
import dontUseHierarchy from '../../examples/text/dontUseHierarchy.js';
import doStartAlign from '../../examples/text/doStartAlign.js';
import doUseSize from '../../examples/text/doUseSize.js';
import doWeight from '../../examples/text/doWeight.js';
import main from '../../examples/text/main.js';
import variantAlignment from '../../examples/text/variantAlignment.js';
import variantBoxInline from '../../examples/text/variantBoxInline.js';
import variantColors from '../../examples/text/variantColors.js';
import variantOverflowTruncation from '../../examples/text/variantOverflowTruncation.js';
import variantRefs from '../../examples/text/variantRefs.js';
import variantSizes from '../../examples/text/variantSizes.js';
import variantStyles from '../../examples/text/variantStyles.js';
import variantTitle from '../../examples/text/variantTitle.js';

export default function TextPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main Badge example" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`
- Any time that text is needed in the UI as a label, paragraph or number display
`}
          />
          <MainSection.Card
            type="don't"
            description={`
- When you need to use a semantic H1–H6 heading to create a clear typographic hierarchy and page structure. Use [Heading](/web/heading) instead.
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Emphasize text inside of paragraphs by using a bold weight."
            sandpackExample={
              <SandpackExample layout="column" code={doWeight} hideEditor name="Do - Font Weight" />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Emphasize text inside of paragraphs by underlining it; this can be confused with [Link](/web/link)."
            sandpackExample={
              <SandpackExample
                code={dontUnderline}
                hideEditor
                hideControls
                name="Don't - Underline"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use size to emphasize things like numbers that don’t define a page structure."
            sandpackExample={
              <SandpackExample layout="column" code={doUseSize} hideEditor name="Do - Use Size" />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use as section, page or surface titles to create a logical hierarchy. Use [Heading](/web/heading) instead."
            sandpackExample={
              <SandpackExample
                code={dontUseHierarchy}
                hideEditor
                hideControls
                name="Don't - Use Hierarchy"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a minimal amount of sizes and styles to keep the UI clean and readable."
            sandpackExample={
              <SandpackExample
                layout="column"
                code={doMinimalStyle}
                hideEditor
                name="Do - Minimal Style"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mix styles and alignment, as this can be hard to read and follow."
            sandpackExample={
              <SandpackExample
                code={dontMixStyles}
                hideEditor
                hideControls
                name="Don't - Mix Styles"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Start-align paragraph text."
            sandpackExample={
              <SandpackExample
                layout="column"
                code={doStartAlign}
                hideEditor
                name="Do - Start Align"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Center-align paragraph text. This is hard to read, especially for users with dyslexia."
            sandpackExample={
              <SandpackExample
                code={dontCenterAlign}
                hideEditor
                hideControls
                name="Don't - Center Align"
              />
            }
          />
        </MainSection.Subsection>
        <SlimBanner
          type="info"
          iconAccessibilityLabel="Info"
          message="Gestalt's typography guidelines contain additional best practices around sizing, style and hierarchy."
          helperLink={{
            text: 'View Typography guidelines',
            accessibilityLabel: 'View Typography guidelines',
            href: '/foundations/typography/guidelines',
            onClick: () => {},
          }}
        />
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Accessible sizing"
          description="A minimum text size of 16 px (12pt) is recommended for readability. Some short text labels, or secondary text can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability."
        />
        <MainSection.Subsection
          title="Accessible color"
          description="For low-vision users, text color contrast is very important. To insure accessible contrast, stick to our [standard text colors](/foundations/color/usage#Standard-text-colors). See our [accessibility](/foundations/accessibility) page for design considerations and handy accessibility tools for checking color contrast."
        />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description="Keep text simple and short to avoid truncation or line wrapping in UI controls like buttons when translating languages that require more characters. Avoid overriding our line-height settings, as this can result in text clipping for scripts, like Hindi, that have taller ascenders and descenders."
      >
        <MainSection.Subsection
          title="Text-wrapping and hyphenation"
          description="Hyphenation on iOS is turned off by default to avoid incorrect word breaks when strings of text wrap to the next line. This is especially helpful for international languages where an incorrect word break can greatly change the meaning of a word or sentence."
        />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Alignment"
          description="Use `align` to adjust the positioning of text within wrapper elements."
        >
          <SandpackExample code={variantAlignment} name="Variants - Alignment" />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Block vs. inline"
          description={`
          The Text component allows you to specify whether you want \`block\` or \`inline\` text.
        `}
        >
          <SandpackExample
            previewHeight={180}
            code={variantBoxInline}
            name="Variants - Alignment"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Colors"
          description={`
        You can specify which color you want for your text. Most colors change in dark mode, but \`light\` and \`dark\` are available when no switch is desired.

        `}
        >
          <SandpackExample code={variantColors} name="Variants - Colors" />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Overflow & truncation"
          description="Gestalt provides utility options to deal with text overflow."
        >
          <SandpackExample
            previewHeight={500}
            code={variantOverflowTruncation}
            name="Variants - Overflow & Truncation"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Sizes"
          description={`
          You can apply \`size\` options to define the size of the text. These font sizes follow those available through our [Design Tokens](/foundations/design_tokens#Font-size). If your text needs to be a [semantic heading (H1-H6)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), use [Heading](/web/heading) instead.

        `}
        >
          <SandpackExample
            code={variantSizes}
            layout="column"
            name="Variants - Overflow & Truncation"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Styles"
          description="There are multiple styles, such as bold and italic, that we can attach to the Text component."
        >
          <SandpackExample previewHeight={200} code={variantStyles} name="Variants - Styles" />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Title"
          description={`The \`title\` attribute on a \`<div>\` can be used to show the full text of a truncated string on hover. That attribute is populated automatically when the text is truncated using \`lineClamp\`, as long as \`children\` is a string.
           If \`children\` is a \`React.Node\` (e.g. [when using Link](/web/link#Link-and-Text)), use the \`title\` prop to manually set the \`title\` attribute.`}
        >
          <SandpackExample code={variantTitle} layout="column" name="Variants - Title" />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Refs"
          description={`Don't use \`ref\` to manipulate the underlaying HTML div or span elements. Use \`ref\` to only read HTML attributes. For example, a valid use case can be detecting [truncation](#Overflow-and-truncation). The example below illustrates a case where detecting truncation allows rendering links contained within Text.`}
        >
          <SandpackExample
            previewHeight={250}
            code={variantRefs}
            layout="column"
            name="Variants - Refs"
          />
        </MainSection.Subsection>

        <MainSection name="Writing">
          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              type="do"
              description={`
- Keep text in UI components short and clear
- Use **Sentence case** for UI labels
`}
            />
            <MainSection.Card
              cardSize="md"
              type="don't"
              description={`
- Use long text labels that could end up truncating or causing space issues when translating to other languages
- Use **Title Case** or **ALL CAPS** in UI labels
- Use ALL CAPS for paragaph text unless referring to a product or other entity that uses that style
`}
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
      **[Typography guidelines](/foundations/typography/guidelines)**
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
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Text') },
  };
}
