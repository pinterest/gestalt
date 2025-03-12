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
import email from '../../examples/buttonsocial/email';
import facebook from '../../examples/buttonsocial/facebook';
import google from '../../examples/buttonsocial/google';
import main from '../../examples/buttonsocial/main';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main ButtonSocial example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - User login via social media or email
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - If you need a button for a non-social media action.
            - When a more generic button component would suffice.
            - If the action does not involve user authentication or social media interaction.
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
            description={`To make it clearer, you may want to change the label text to indicate that the ButtonToggle has been selected. For instance, changing "Follow" to "Following."`}
            sandpackExample={<SandpackExample code={email} hideEditor name="content" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Make sure that the ButtonToggle(s) in your application are consistently styled and placed. This should also apply to their sizing, maintaining uniformity throughout the experience."
            sandpackExample={<SandpackExample code={facebook} hideEditor name="Do Consistency" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place the ButtonToggle(s) in a location where users would naturally expect to find them, taking into consideration the context. For instance, position it next to a related feature."
            sandpackExample={<SandpackExample code={google} hideEditor name="Do Location" />}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="If the ButtonToggle(s) trigger a significant action or irreversible change, it is recommended to include a confirmation, such as a ModalAlert message."
            sandpackExample={<SandpackExample code={main} hideEditor name="Do Confirmation" />}
            type="do"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization" />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`ButtonSocial has 4 different services:
            1. \`Apple\`
            2. \`Facebook \` 
            3. \`Google \` 
            3. \`Email\``}
          title="Service"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ size }: { [key: string]: any; }) => Element; size: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew service={[1, 2, 3, 4]}>
            {({ service }) => {
              const serviceCopy: 1 | 2 | 3 | 4 = service as 1 | 2 | 3 | 4;
              return (
                <ButtonSocial
                  accessibilityLabel="Login in Pinterest"
                  href="https://pinterest.com"
                  service={serviceCopy}
                  target="blank"
                  text={3}
                />
              );
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
          <CombinationNew text={[1, 2, 3]}>
            {({ text }) => {
              const textCopy: 1 | 2 | 3 = text as 1 | 2 | 3;
              return (
                <ButtonSocial
                  accessibilityLabel="Login in Pinterest"
                  href="https://pinterest.com"
                  service={1}
                  target="blank"
                  text={textCopy}
                />
              );
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
