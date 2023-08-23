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
import ariaAttributesExample1 from '../../examples/status/ariaAttributesExample1.js';
import ariaAttributesExample2 from '../../examples/status/ariaAttributesExample2.js';
import dontPlaceFarAwayFromItsSubject from '../../examples/status/dontPlaceFarAwayFromItsSubject.js';
import dontUseSubText from '../../examples/status/dontUseSubText.js';
import dontUseSVGsOrImages from '../../examples/status/dontUseSVGsOrImages.js';
import mainExample from '../../examples/status/mainExample.js';
import placeCloseToItsSubject from '../../examples/status/placeCloseToItsSubject.js';
import textAdditionsExample1 from '../../examples/status/textAdditionsExample1.js';
import textAdditionsExample2 from '../../examples/status/textAdditionsExample2.js';
import useTitleWhenItRepresents from '../../examples/status/useTitleWhenItRepresents.js';
import useToCommunicateAStepIn from '../../examples/status/useToCommunicateAStepIn.js';

export default function StatusPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Status">
      <PageHeader name="Status" description={generatedDocGen?.description}>
        <SandpackExample
          name="Main Example"
          code={mainExample}
          layout="column"
          hideEditor
          previewHeight={200}
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
          - To describe the status of an individual element, such an an item in a list or a row in a table.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To describe surface-level errors. Use [Callout](/web/callout) instead.
          - To describe whether a numeric value is going up or down. Use [Datapoint](/web/datapoint) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Status to communicate a step in a workflow or the state of an item."
            sandpackExample={
              <SandpackExample
                name="Use To Communicate A Step In"
                code={useToCommunicateAStepIn}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use SVGs or images that resemble the Status’ symbols to denote status."
            sandpackExample={
              <SandpackExample
                name="Don't Use SVGs Or Images"
                code={dontUseSVGsOrImages}
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
            description="Place Status close to its subject to provide context and reference. It can be placed as an inline element or paired side by side as needed."
            sandpackExample={
              <SandpackExample
                name="Place Close To Its Subject"
                code={placeCloseToItsSubject}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place Status far away from its subject. "
            sandpackExample={
              <SandpackExample
                name="Don't Place Far Away From Its Subject"
                code={dontPlaceFarAwayFromItsSubject}
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
            description="Use `title` when the status it represents is unique, specific and critical for the user to know."
            sandpackExample={
              <SandpackExample
                name="Use Title When It Represents"
                code={useTitleWhenItRepresents}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Status' `subText` to display extraneous messaging."
            sandpackExample={
              <SandpackExample
                name="Don't Use Sub Text"
                code={dontUseSubText}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Icons are a great way to help users who have difficulties with reading, focus attention, and low vision impairments. For such use cases, Status can be used without accompanying `title` text."
      >
        <MainSection.Subsection
          title="ARIA attributes"
          columns={2}
          description={`
If Status appears without \`title\` text, \`accessibilityLabel\` should be used to provide a text description for screen readers to announce and communicate the represented icon, as shown in the first example.

Avoid using the generic words like "image" or "icon"; instead, use verbs that describe the meaning of the icon, for example: "Upload in progress".

If using \`title\` to describe what the icon represents, \`accessibilityLabel\` does not need to be provided, as shown in the second example.
`}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                name="ARIA Attributes Example 1"
                code={ariaAttributesExample1}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                name="ARIA Attributes Example 2"
                code={ariaAttributesExample2}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`title\`, \`subtext\` and \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection title="Text additions" columns={2}>
          <MainSection.Card
            cardSize="lg"
            title="Status name"
            sandpackExample={
              <SandpackExample
                name="Text Additions Example 1"
                code={textAdditionsExample1}
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Status subtext"
            sandpackExample={
              <SandpackExample
                name="Text Additions Example 2"
                code={textAdditionsExample2}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Icon](/web/icon)**
Icon should be used to display a symbol that does not represent the state or status of an item.

**[Badge](/web/badge)**
Use Badge to label or mark an item with a designation or category.

**[Callout](/web/callout)**
Use Callout to communicate page-level status, such as an error, and to provide actionable next steps.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Status') },
  };
}
