// @flow strict
import { type Node } from 'react';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import translations from '../../../examples/defaultlabelprovider/translations.js';
import noTranslations from '../../../examples/defaultlabelprovider/no-translations.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection
        name="Implementation"
        description={`To support internationalization and accessibility, Gestalt components have many required accessibility labels. This allows you to pass translated strings to ensure that users of all abilities and languages can use your app.\n\nHowever, certain labels are unlikely to change based on the specific implementation, e.g. the accessibility label for the close button on a modal. For supported labels on certain components, you can specify the label once, at the top level of your app, for use in all instances of that component throughout your app. This allows for certain accessibility label props to now be optional; the default label will be used unless overridden at the callsite.\n\nIf your app supports internationalization, pass translated strings to the Provider. If your app does not support internationalization, you may pass untranslated strings, or you may omit the \`labels\` prop or pass \`null\` to use our default labels. See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.js) for the default English labels we provide.\n\nIn the examples below, type a character to make the "clear input" icon button appear, then inspect that element and note the accessibility label.`}
      >
        <MainSection.Card
          sandpackExample={
            <SandpackExample code={translations} name="Translations example" previewHeight={320} />
          }
        />
        <MainSection.Card
          sandpackExample={
            <SandpackExample
              code={noTranslations}
              name="No translations example"
              previewHeight={320}
            />
          }
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'DefaultLabelProvider',
      }),
    },
  };
}
