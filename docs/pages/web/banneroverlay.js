// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import avatar from '../../examples/banneroverlay/avatar';
import callToAction from '../../examples/banneroverlay/callToAction';
import ctaDismiss from '../../examples/banneroverlay/ctaDismiss';
import desktop from '../../examples/banneroverlay/desktop';
import doConcise from '../../examples/banneroverlay/doConcise';
import doEducate from '../../examples/banneroverlay/doEducate';
import doNavigate from '../../examples/banneroverlay/doNavigate';
import dontCritical from '../../examples/banneroverlay/dontCritical';
import dontLong from '../../examples/banneroverlay/dontLong';
import dontStack from '../../examples/banneroverlay/dontStack';
import icon from '../../examples/banneroverlay/icon';
import image from '../../examples/banneroverlay/image';
import main from '../../examples/banneroverlay/main';
import mobile from '../../examples/banneroverlay/mobile';

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
- If there is a need to block the content underneath use Modal instead
- To replace Toast
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
            description="Stack multiple BannerOverlays; only one UpsellOverlay should appear on the screen per time."
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
          \`dismissButton\` and \`primaryAction\`, require a short, descriptive label for screen readers, which should also be localized.

          Icons and thumbnails on BannerOverlay are purely decorative, and can therefore have an empty string as the \`accessibilityLabel\`. The thumbnail (Image) or Icon should supply an alt or accessibilityLabel, respectively, if the Image or Icon supplies extra context or information.`}
        />
      </AccessibilitySection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Remember to localize text and any string within \`primaryAction\` or \`dismissButton\`, as well as title and message.

<b>Please note</b>: Start aligned text is the primary alignment for our Business products. It will be left-aligned in left-to-right languages and right-aligned in right-to-left languages.`}
        />
        <MainSection.Subsection title="Image">
          <MainSection.Card
            sandpackExample={<SandpackExample code={image} name="Image" layout="column" />}
            description="With an image for Pin or Board actions, or the Pinterest logo."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Avatar">
          <MainSection.Card
            sandpackExample={<SandpackExample code={avatar} name="avatar" layout="column" />}
            description="With an Avatar for Profile or Pinner-related messaging."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Icon">
          <MainSection.Card
            sandpackExample={<SandpackExample code={icon} name="icon" layout="column" />}
            description="For when an icon is needed to represent content that isn’t a pin or a profile."
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Call to Action">
          <MainSection.Card
            sandpackExample={<SandpackExample code={callToAction} name="icon" layout="column" />}
            description="You can have zero, one or two actions using the props `primaryAction` and `secondaryAction`."
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Dismissed by CTA">
          <MainSection.Card
            sandpackExample={<SandpackExample code={ctaDismiss} name="icon" layout="column" />}
            description={`You can optionally have the Call to Action dismiss the BannerOverlay by not setting the dismissButton prop.

<b>Please note:</b> Make sure to either set the CTA to dismiss the BannerOverlay or set the dismissButton prop. Otherwise, the BannerOverlay will be stuck on the screen.`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Responsive">
        <MainSection.Subsection>
          <MainSection.Card
            description={`UpsellOverlay is responsive to different devices. Therefore, OverlayUpsell dweb is set to a max width of 900 px to preserve a great usability experience and consistency with other components.

On desktop devices, the BannerOverlay should appear at the top of the screen (below navigation). The BannerOverlay shouldn't block navigation.
On mobile devices, the BannerOverlay should appear at the bottom of the screen. The 'offset' prop can be used to adjust the position of the BannerOverlay.`}
          />
          <SandpackExample code={mobile} name="Main BannerOverlay example" hideEditor />
          <SandpackExample code={desktop} name="Main BannerOverlay example" hideEditor />
        </MainSection.Subsection>
      </MainSection>

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
