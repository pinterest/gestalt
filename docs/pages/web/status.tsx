import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import ariaAttributesExample1 from '../../examples/status/ariaAttributesExample1';
import ariaAttributesExample2 from '../../examples/status/ariaAttributesExample2';
import basicTitle from '../../examples/status/basicTitle';
import dontPlaceFarAwayFromItsSubject from '../../examples/status/dontPlaceFarAwayFromItsSubject';
import dontUseSubText from '../../examples/status/dontUseSubText';
import dontUseSVGsOrImages from '../../examples/status/dontUseSVGsOrImages';
import mainExample from '../../examples/status/mainExample';
import placeCloseToItsSubject from '../../examples/status/placeCloseToItsSubject';
import richTitle from '../../examples/status/richTitle';
import subtext from '../../examples/status/subtext';
import useTitleWhenItRepresents from '../../examples/status/useTitleWhenItRepresents';
import useToCommunicateAStepIn from '../../examples/status/useToCommunicateAStepIn';

export default function StatusPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title="Status">
      <PageHeader description={generatedDocGen?.description} name="Status">
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - To describe the status of an individual element, such an an item in a list or a row in a table.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - To describe surface-level errors. Use [BannerCallout](/web/bannercallout) instead.
          - To describe whether a numeric value is going up or down. Use [Datapoint](/web/datapoint) instead.
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
            description="Use Status to communicate a step in a workflow or the state of an item."
            sandpackExample={
              <SandpackExample
                code={useToCommunicateAStepIn}
                hideEditor
                layout="column"
                name="Use To Communicate A Step In"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use SVGs or images that resemble the Status’ symbols to denote status."
            sandpackExample={
              <SandpackExample
                code={dontUseSVGsOrImages}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use SVGs Or Images"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place Status close to its subject to provide context and reference. It can be placed as an inline element or paired side by side as needed."
            sandpackExample={
              <SandpackExample
                code={placeCloseToItsSubject}
                hideEditor
                layout="column"
                name="Place Close To Its Subject"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place Status far away from its subject. "
            sandpackExample={
              <SandpackExample
                code={dontPlaceFarAwayFromItsSubject}
                hideControls
                hideEditor
                layout="column"
                name="Don't Place Far Away From Its Subject"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use `title` when the status it represents is unique, specific and critical for the user to know."
            sandpackExample={
              <SandpackExample
                code={useTitleWhenItRepresents}
                hideEditor
                layout="column"
                name="Use Title When It Represents"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Status' `subText` to display extraneous messaging."
            sandpackExample={
              <SandpackExample
                code={dontUseSubText}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Sub Text"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        description="Icons are a great way to help users who have difficulties with reading, focus attention, and low vision impairments. For such use cases, Status can be used without accompanying `title` text."
        name={generatedDocGen?.displayName}
      >
        <MainSection.Subsection
          columns={2}
          description={`
If Status appears without \`title\` text, \`accessibilityLabel\` should be used to provide a text description for screen readers to announce and communicate the represented icon, as shown in the first example.

Avoid using the generic words like "image" or "icon"; instead, use verbs that describe the meaning of the icon, for example: "Upload in progress".

If using \`title\` to describe what the icon represents, \`accessibilityLabel\` does not need to be provided, as shown in the second example.
`}
          title="ARIA attributes"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={ariaAttributesExample1}
                layout="column"
                name="ARIA Attributes Example 1"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={ariaAttributesExample2}
                layout="column"
                name="ARIA Attributes Example 2"
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description="The `title` prop accepts either a string or [Text](/web/text). Use a string for simple text without any visual style. Status will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as inline links, use Text to wrap your message with any additional [Text](/web/text) or [Link](/web/link) components contained within."
          title="Title"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={basicTitle} layout="column" name="Simple" />}
            title="Simple message string"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={richTitle} layout="column" name="Rich" />}
            title="Rich message with Text or Link component"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2} title="Subtext">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={subtext} layout="column" name="subtext" />}
            title="Subtext"
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

**[BannerCallout](/web/bannercallout)**
Use BannerCallout to communicate page-level status, such as an error, and to provide actionable next steps.
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
    props: { generatedDocGen: await docGen('Status') },
  };
}
