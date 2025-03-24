import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import avatar from '../../examples/avatargroupcluster/avatar';
import counter from '../../examples/avatargroupcluster/counter';
import main from '../../examples/avatargroupcluster/main';
import size from '../../examples/avatargroupcluster/sizes';

export default function AvatarGroupPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="No image source" previewHeight={200} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="AvatarGroupClusters accepts name, image and colors for each collaborators avatar"
          title="Avatar"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={avatar} name="avatar" />} />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="AvatarGroupCluster is available in 2 fixed sizes: `sm` and `md`."
          title="Size"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={size} name="Size" />} />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="AvatarGroupCluster represents different cluster types for 2, 3, 4, and more than 4 collaborators. Above 4, a counter displays the amount of additional collaborator."
          title="Counter"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={counter} name="Counter" />} />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('AvatarGroupCluster') },
  };
}
