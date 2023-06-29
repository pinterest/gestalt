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
import doAlign from '../../examples/badge/doAlign.js';
import doColor from '../../examples/badge/doColor.js';
import dontColor from '../../examples/badge/dontColor.js';
import dontComplex from '../../examples/badge/dontComplex.js';
import main from '../../examples/badge/main.js';
import variantsOtherComponents from '../../examples/badge/variantsOtherComponents.js';
import variantsOverMedia from '../../examples/badge/variantsOverMedia.js';
import variantsPositioning from '../../examples/badge/variantsPositioning.js';
import variantsType from '../../examples/badge/variantsType.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main Badge example" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Labeling and bringing awareness to a specific element or feature (e.g., something is new or required).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Providing feedback at the element level (e.g., displaying error messages). Use inline text instead.
          - Requiring interaction from users since Badges are always static and non-interactive.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use established color patterns so users can quickly scan and identify sentiment. However, the badge text should always clearly indicate the sentiment, so color is not the sole indicator of information."
            sandpackExample={<SandpackExample code={doColor} hideEditor name="Do - Color" />}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use colored badges over media. Instead use the dark or light wash."
            sandpackExample={
              <SandpackExample code={dontColor} hideEditor hideControls name="Don't - Color" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Align the badge to the top of large accompanying text (anything larger than 16px). Center align for standard size text."
            sandpackExample={<SandpackExample code={doAlign} hideEditor name="Do - Align" />}
          />

          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use complex or verbose language. Instead use a single, scannable word. For example: 'New'."
            sandpackExample={
              <SandpackExample code={dontComplex} hideEditor hideControls name="Don't - Complex" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`
        The badge text is read out by assistive technologies like screen readers so all users can access the meaning of the badge in context. Text should demonstrate the sentiment clearly enough to be understood immediately without relying on color alone.
        `}
      />

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`text\` prop. Note that localization can lengthen text by 20 to 30 percent. `}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Type"
          description={`
          Badge is available in five styles. Each \`type\` represents a messaging sentiment.

          1. **Info (default)**
          Communicates helpful information or an important attribute. For example, 'New' or 'Help'.

          2. **Success**
          Indicates a constructive or successful state. For example, 'Available', 'Completed', 'Approved' or 'Added'.

          3. **Warning**
          Communicates cautionary or time-sensitive information to the user. For example, 'Busy', 'Missing' or 'Warning'.

          4. **Error**
          Informs the user of problems or errors that require potential action to correct. For example, 'Deleted' or 'Cancelled'.

          5. **Neutral**
          Indicates a general, non-critical status update. For example, 'Unavailable' or 'Not started'.

          6. **Recommendation**
          Highlights a suggestion that will improve the experience and achieve better results. For example, 'Recommended for you'.
 `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsType}
                name="Variants - Type"
                layout="column"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Over media"
          description={`
          Badge may be used over media using two wash styles.

          1. **Over media - Light wash**
          The light wash badge should be used over media that is dark or utilizes a dark gradient overlay.

          2. **Over media - Dark wash**
          The dark wash badge should be used over media that is light or utilizes a light gradient overlay.
`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsOverMedia}
                layout="column"
                name="Variants - Over media"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Positioning"
          description="By default, Badge is rendered inline within the parent element. However, the `position` prop can be used to adjust the alignment. Badges should align to the top of large accompanying text."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantsPositioning} name="Variants - Position" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Within other components"
          description="Components like [Module](/web/module) and [Dropdown](/web/dropdown) have Badges built into the component through props, so it will not be necessary to add the component yourself."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsOtherComponents}
                layout="column"
                name="Variants - Within other components"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use a single word to describe the status of an element. For example, “New” not “New post.”
- Where applicable, describe the status in past tense. For example, “Archived” not “Archive.”
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use conflicting language with defined type sentiments. For example, the error badge should not say “Complete.”
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Status](/web/status)**
        Status is a graphic indicator of an element’s state.

        **[Tooltip](/web/tooltip)**
        Tooltip is a floating text label that succinctly describes the function of an interactive element.       `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Badge') },
  };
}
