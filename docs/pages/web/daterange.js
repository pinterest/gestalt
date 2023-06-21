// @flow strict-local
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import disabledFuture from '../../examples/daterange/disabledFuture.js';
import disabledPast from '../../examples/daterange/disabledPast.js';
import main from '../../examples/daterange/main.js';

export default function DatePickerPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        badge="experimental"
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning message"
            message="daterange is an experimental component. Expect development and design iteration, breaking API changes or even component deprecation."
          />
        }
      >
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
          previewHeight={500}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Disable future & past"
          description="DateRange supports disabling future & past dates from being selected."
        >
          <MainSection.Card
            cardSize="md"
            title="Disable past"
            sandpackExample={
              <SandpackExample code={disabledPast} name="past example" previewHeight={500} />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Disable future"
            sandpackExample={
              <SandpackExample code={disabledFuture} name="future example" previewHeight={500} />
            }
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'DateRange',
      }),
    },
  };
}
