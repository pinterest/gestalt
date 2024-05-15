// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import AccessibilitySection from '../../docs-components/AccessibilitySection';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import docGen, { type DocGen } from '../../docs-components/docgen';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import MainSection from '../../docs-components/MainSection';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import Page from '../../docs-components/Page';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import PageHeader from '../../docs-components/PageHeader';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import QualityChecklist from '../../docs-components/QualityChecklist';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import SandpackExample from '../../docs-components/SandpackExample';
// @ts-expect-error - update to the correct example path
import main from '../../examples/componentname/main';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main ComponentName example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines" />

      <MainSection name="Best practices" />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization" />

      <MainSection name="Subcomponents" />

      <MainSection name="Variants" />

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[ComponentName](/ComponentName)**
      Details about why to use this over current component.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen };
}> {
  return {
    props: { generatedDocGen: await docGen('ComponentName') },
  };
}
