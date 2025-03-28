import docGen, { DocGen } from '../../../docs-components/docgen';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import configuration from '../../../examples/designtokensprovider/configuration';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        type="utility"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Inspect the CSS stylesheet in your browser and check the metadata at the top of the token stylesheet"
          title="Configuration"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={configuration} name="Configuration" />}
          />
        </MainSection.Subsection>
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
    props: {
      generatedDocGen: await docGen('DesignTokensProvider'),
    },
  };
}
