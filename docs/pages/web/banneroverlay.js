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
import doConcise from '../../examples/banneroverlay/doConcise';
import doEducate from '../../examples/banneroverlay/doEducate';
import doNavigate from '../../examples/banneroverlay/doNavigate';
import dontCritical from '../../examples/banneroverlay/dontCritical';
import dontLong from '../../examples/banneroverlay/dontLong';
import dontStack from '../../examples/banneroverlay/dontStack';
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

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={1}>
          <MainSection.Card
            type="do"
            sandpackExample={<SandpackExample code={doEducate} name="Do - Educate" hideEditor />}
            description="Use BannerOverlay to educate and provide additional information to users when they have performed actions that indicate some intent, such as a related pin tap or idea pin swipe."
          />
          <MainSection.Card
            type="don't"
            sandpackExample={
              <SandpackExample
                code={dontCritical}
                name="Don't - Critical"
                hideEditor
                hideControls
              />
            }
            description="Use BannerOverlay for critical information, such as errors or warnings. Use Callout instead."
          />
          <MainSection.Card
            type="do"
            sandpackExample={<SandpackExample code={doConcise} name="Do - Concise" hideEditor />}
            description="Be concise when writing the content. The BannerOverlay is intended to display short messages. Ideally max of 3 lines.
Please consider localization. "
          />
          <MainSection.Card
            type="don't"
            sandpackExample={
              <SandpackExample
                code={dontLong}
                name="Don't - Long messages"
                hideEditor
                hideControls
              />
            }
            description="Display long messages inside the BannerOverlay as it isn't the intent of this component, and it could lead to readability issues considering the component size and space. "
          />
          <MainSection.Card
            type="do"
            sandpackExample={<SandpackExample code={doNavigate} name="Do - Navigate" hideEditor />}
            description={`Place BannerOverlay out of the way so a user can still navigate and complete tasks.

<b>Please note</b>: On desktop devices, the BannerOverlay should appear at the top of the screen (below navigation). The BannerOverlay shouldn't block navigation.
On mobile devices, the BannerOverlay should appear at the bottom of the screen. The 'offset' prop can be used to adjust the position of the BannerOverlay.`}
          />
          <MainSection.Card
            type="don't"
            sandpackExample={
              <SandpackExample code={dontStack} name="Don't - Stack" hideEditor hideControls />
            }
            description="Stack multiple UpsellOverlays; only one UpsellOverlay should appear on the screen per time."
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
