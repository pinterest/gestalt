// @flow strict
import { type Node as ReactNode } from 'react';
import { SlimBanner } from 'gestalt';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title="RadioButton">
      <PageHeader
        name="RadioButton"
        badge="deprecated"
        packageFileLocation={generatedDocGen?.packageFileLocation}
        description="Use RadioButtons when you have a few options that a user can choose from. Never use radio buttons if the user can select more than one option from a list."
        slimBanner={
          <SlimBanner
            type="error"
            iconAccessibilityLabel="Info"
            message="The standalone RadioButton is soon to be deprecated, use RadioGroup and RadioGroup.RadioButton instead."
            helperLink={{
              text: 'View RadioGroup',
              accessibilityLabel: 'View RadioGroup Docs',
              href: '/web/radiogroup',
              onClick: () => {},
            }}
          />
        }
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('RadioButton') },
  };
}
