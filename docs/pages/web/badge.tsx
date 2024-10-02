import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import doAlign from '../../examples/badge/doAlign';
import doColor from '../../examples/badge/doColor';
import dontColor from '../../examples/badge/dontColor';
import dontComplex from '../../examples/badge/dontComplex';
import localizationLabels from '../../examples/badge/localizationLabels';
import main from '../../examples/badge/main';
import variantsOverMedia from '../../examples/badge/variantsOverMedia';
import variantsPositioning from '../../examples/badge/variantsPositioning';
import variantsType from '../../examples/badge/variantsType';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Badge example" previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Labeling and bringing awareness to a specific element or feature (e.g., something is new or required).
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Providing feedback at the element level (e.g., displaying error messages). Use inline text instead.
          - Requiring interaction from users since Badges are always static and non-interactive.
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
            description="Use established color patterns so users can quickly scan and identify sentiment. However, the badge text should always clearly indicate the sentiment, so color is not the sole indicator of information."
            sandpackExample={<SandpackExample code={doColor} hideEditor name="Do - Color" />}
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Use colored badges over media. Instead use the dark or light wash."
            sandpackExample={
              <SandpackExample code={dontColor} hideControls hideEditor name="Don't - Color" />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Align the badge to the top of large accompanying text (anything larger than 16px). Center align for standard size text."
            sandpackExample={<SandpackExample code={doAlign} hideEditor name="Do - Align" />}
            type="do"
          />

          <MainSection.Card
            cardSize="md"
            description="Use complex or verbose language. Instead use a single, scannable word. For example: 'New'."
            sandpackExample={
              <SandpackExample code={dontComplex} hideControls hideEditor name="Don't - Complex" />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        description={`
        The badge text is read out by assistive technologies like screen readers so all users can access the meaning of the badge in context. Text should demonstrate the sentiment clearly enough to be understood immediately without relying on color alone.
        `}
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
      />

      <MainSection name="Variants">
        <MainSection.Subsection
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
          title="Type"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsType}
                layout="column"
                name="Variants - Type"
                previewHeight={600}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
          Badge may be used over media using two wash styles.

          1. **Over media - Light wash**
          The light wash badge should be used over media that is dark or utilizes a dark gradient overlay.

          2. **Over media - Dark wash**
          The dark wash badge should be used over media that is light or utilizes a light gradient overlay.
`}
          title="Over media"
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
          description="By default, Badge is rendered inline within the parent element. However, the `position` prop can be used to adjust the alignment. Badges should align to the top of large accompanying text."
          title="Positioning"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantsPositioning} name="Variants - Position" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use a single word to describe the status of an element. For example, “New” not “New post.”
- Where applicable, describe the status in past tense. For example, “Archived” not “Archive.”
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Use conflicting language with defined type sentiments. For example, the error badge should not say “Complete.”
`}
            type="don't"
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Badge') },
  };
}
