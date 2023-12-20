// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/banneroverlay/main';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        pdocsLink
      >
        <SandpackExample code={main} name="Main BannerOverlay example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- To provide short educational messages allowing content to scroll underneath
- To help users learn more about a specific idea or interest
- To support users when they have performed actions that indicate medium or high intent (related pin tap, idea pin swipe)
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- If there is a need to block the content underneath Use Modal instead
- To replace the Toast
- For lengthy messages, forms, or blocks of information. Consider OverlayPanel or new page instead
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
          dismissButton, primaryAction, helperLink require a short, descriptive label for screen readers, which should also be localized.

          Icons and thumbnails on BannerOverlay are purely decorative, and can therefore have an empty string as the accessibilityLabel. The thumbnail (Image) or Icon should supply an alt or accessibilityLabel, respectively, if the Image or Icon supplies extra context or information.


          `}
        />
      </AccessibilitySection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use succinct and scannable language that clearly conveys support to the user
- Consider internationalization and how other languages may be constrained
- Write up to 2 lines of text.`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
            - Write messages that are wordy and take up a lot of space, as the BannerOverlay is intended to short messages
            - Write content that takes more than 2 lines of text
            - Truncate content. If the message needs more words, consider a different component`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#banneroverlay',
            text: 'BannerOverlay extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Upsell](/web/upsell)**
      Upsell banners are used for paid upgrades, free trials, or marketing promotions.

      **[Modal](/web/modal)**
      A generic, customizable container for modals that aren’t used as alerts or acknowledgements and need more functionality like form fields.

      **[Toast](/web/toast)**
      Toasts educate users on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('BannerOverlay') },
  };
}
