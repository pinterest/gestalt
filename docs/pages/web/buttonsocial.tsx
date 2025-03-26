import { ButtonSocial } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/buttonsocial/main';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main ButtonSocial example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization" />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`ButtonSocial has 4 different services:
            1. \`Apple\`
            2. \`Facebook \` 
            3. \`Google \` 
            4. \`Email\``}
          title="Service"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew service={['apple', 'facebook', 'google', 'email']}>
            {({ service }) => {
              const serviceCopy: 'apple' | 'facebook' | 'google' | 'email' = service as
                | 'apple'
                | 'facebook'
                | 'google'
                | 'email';
              return <ButtonSocial service={serviceCopy} type="continue" />;
            }}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ButtonSocial is available with 3 different messages:
          1. \`Login with\`
          2. \`Continue with\` 
          3. \`Sign up with\``}
          title="Text"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew type={['login', 'continue', 'signup']}>
            {({ type }) => {
              const typeOptions: 'login' | 'continue' | 'signup' = type as
                | 'login'
                | 'continue'
                | 'signup';
              return <ButtonSocial service="google" type={typeOptions} />;
            }}
          </CombinationNew>
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
     **[ButtonLink](/web/button)**
     Use ButtonLink when an action is needed instead of a link.
     
     **[ButtonGroup](/web/buttongroup)**
     When displaying multiple ButtonLinks in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.
     
     **[IconButton](/web/iconbutton)**
     Use IconButton when only an icon is needed instead of text.
     
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
    props: { generatedDocGen: await docGen('ButtonSocial') },
  };
}
