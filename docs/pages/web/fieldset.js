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
import accessibility from '../../examples/fieldset/accessibility.js';
import main from '../../examples/fieldset/main.js';
import variantsError from '../../examples/fieldset/variantsError.js';
import variantsLegend from '../../examples/fieldset/variantsLegend.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
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
          - When inputs within a broader form are closely related and would benefit from a shared legend, such as TextFields for a billing address or a group of Checkboxes.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When the fields are unrelated. Use [TextFields](/web/textfield) and other input components within a \`<form/>\`.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`
      Wrapping form fields in Fieldset creates an accessible grouping that signals to users when certain form items are related. The \`legend\` should clearly describe what information is needed from the group of items, whether they're [RadioGroup](/web/radiogroup), [Checkboxes](/web/checkbox) or [TextFields](/web/textfield).

      In the example below, the pet RadioButtons are surrounded by a fieldset and include a \`legend\` of "Favorite pet". Learn more about the [use of fieldset and legend](https://www.w3.org/WAI/tutorials/forms/grouping/#associating-related-controls-with-fieldset).`}
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={<SandpackExample code={accessibility} name="Accessibility - Fieldset" />}
        />
      </AccessibilitySection>

      <MainSection name="Localization" description={`Be sure to localize the \`legend\` text.`} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
      By default, the \`legend\` is visible above the items in the Fieldset. However, if the form items are labeled by content elsewhere on the page, or a more complex legend is needed, the \`legendDisplay\` prop can be used to visually hide the legend. In this case, it is still available to screen reader users, but will not appear visually on the screen.

      In the example below, the "Company Account Goals" text is acting as a heading and a legend for the checkboxes, so instead of repeating another legend, we visually hide the Fieldset \`legend\`. When a user focuses on the first checkbox, a screen reader will announce "Sell more products, unchecked, checkbox, Choose up to 3 company account goals, group".
      `}
          title="Legend visibility"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsLegend}
                name="Variants - Legend visibility"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Error message">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsError}
                name="Variants - Error message"
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
      **[Label](/web/label)**
      If a label is needed for a single form item (instead of a group of items), use Label.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Fieldset') },
  };
}
