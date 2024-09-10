import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
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

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        badge="pilot"
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="Main BannerOverlay example" />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- To provide short educational messages allowing content to scroll underneath
- To help users learn more about a specific idea or interest
- To support users when they have performed actions that indicate medium or high intent (related pin tap, idea pin swipe)
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- If there is a need to block the content underneath use Modal instead
- To replace Toast
- For lengthy messages, forms, or blocks of information. Consider OverlayPanel or new page instead
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices">
        <MainSection.Subsection columns={1}>
          <MainSection.Card
            description="Use BannerOverlay to educate and provide additional information to users when they have performed actions that indicate some intent, such as a related pin tap or idea pin swipe."
            sandpackExample={<SandpackExample code={doEducate} hideEditor name="Do - Educate" />}
            type="do"
          />
          <MainSection.Card
            description="Use BannerOverlay for critical information, such as errors or warnings. Use BannerCallout instead."
            sandpackExample={
              <SandpackExample
                code={dontCritical}
                hideControls
                hideEditor
                name="Don't - Critical"
              />
            }
            type="don't"
          />
          <MainSection.Card
            description="Be concise when writing the content. The BannerOverlay is intended to display short messages. Ideally max of 3 lines.
Please consider localization. "
            sandpackExample={<SandpackExample code={doConcise} hideEditor name="Do - Concise" />}
            type="do"
          />
          <MainSection.Card
            description="Display long messages inside the BannerOverlay as it isn't the intent of this component, and it could lead to readability issues considering the component size and space. "
            sandpackExample={
              <SandpackExample
                code={dontLong}
                hideControls
                hideEditor
                name="Don't - Long messages"
              />
            }
            type="don't"
          />
          <MainSection.Card
            description={`Place BannerOverlay out of the way so a user can still navigate and complete tasks.

<b>Please note</b>: On desktop devices, the BannerOverlay should appear at the top of the screen. The BannerOverlay shouldn't block navigation; therefore, it shuld be positioned below the navigation bar.

On mobile devices, the BannerOverlay should appear at the bottom of the screen. The 'offset' prop can be used to adjust the position of the BannerOverlay.

If both top an bottom offset are set, only the bottom offset will be used when mobile device is detected and the only top offset will be used on desktop devices.

In case we need to break this design positioning rule, and place BannerOverlay at the top in mobile devices and at the bottom in desktop devices, you can set the prop 'reverseOffset' to true and invert the logic. If you want to only apply the revert on mobile, you can only prop 'reverseOffset' to true when mobile devices are detected. With this, BannerOverlay will always be positioned at the top.
`}
            sandpackExample={<SandpackExample code={doNavigate} hideEditor name="Do - Navigate" />}
            type="do"
          />
          <MainSection.Card
            description="Stack multiple BannerOverlays; only one BannerOverlay should appear on the screen per time."
            sandpackExample={
              <SandpackExample code={dontStack} hideControls hideEditor name="Don't - Stack" />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
          \`dismissButton\` and \`primaryAction\`, require a short, descriptive label for screen readers, which should also be localized.

          Icons and thumbnails on BannerOverlay are purely decorative, and can therefore have an empty string as the \`accessibilityLabel\`. The thumbnail (Image) or Icon should supply an alt or accessibilityLabel, respectively, if the Image or Icon supplies extra context or information.`}
          title="Labels"
        />
      </AccessibilitySection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Remember to localize text and any string within \`primaryAction\` or \`dismissButton\`, as well as title and message.

<b>Please note</b>: Start aligned text is the primary alignment for our Business products. It will be left-aligned in left-to-right languages and right-aligned in right-to-left languages.`}
        />
        <MainSection.Subsection title="Image">
          <MainSection.Card
            description="With an image for Pin or Board actions, or the Pinterest logo."
            sandpackExample={<SandpackExample code={image} layout="column" name="Image" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Avatar">
          <MainSection.Card
            description="With an Avatar for Profile or Pinner-related messaging."
            sandpackExample={<SandpackExample code={avatar} layout="column" name="avatar" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Icon">
          <MainSection.Card
            description="For when an icon is needed to represent content that isn’t a pin or a profile."
            sandpackExample={<SandpackExample code={icon} layout="column" name="icon" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Call to Action">
          <MainSection.Card
            description="You can have zero, one or two actions using the props `primaryAction` and `secondaryAction`."
            sandpackExample={<SandpackExample code={callToAction} layout="column" name="icon" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Dismissed by CTA">
          <MainSection.Card
            description={`You can optionally have the Call to Action dismiss the BannerOverlay by not setting the dismissButton prop.

<b>Please note:</b> Make sure to either set the CTA to dismiss the BannerOverlay or set the dismissButton prop. Otherwise, the BannerOverlay will be stuck on the screen.`}
            sandpackExample={<SandpackExample code={ctaDismiss} layout="column" name="icon" />}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Responsive">
        <MainSection.Subsection>
          <MainSection.Card
            description={`BannerOverlay is responsive to different devices. Therefore, BannerOverlay dweb is set to a max width of 900 px to preserve a great usability experience and consistency with other components.

On desktop devices, the BannerOverlay should appear at the top of the screen (below navigation). The BannerOverlay shouldn't block navigation.
On mobile devices, the BannerOverlay should appear at the bottom of the screen. The 'offset' prop can be used to adjust the position of the BannerOverlay.`}
          />
          <SandpackExample code={mobile} hideEditor name="Main BannerOverlay example" />
          <SandpackExample code={desktop} hideEditor name="Main BannerOverlay example" />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use succinct and scannable language that clearly conveys support to the user
- Consider internationalization and how other languages may be constrained
- Write up to 2 lines of text.`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - Write messages that are wordy and take up a lot of space, as the BannerOverlay is intended to short messages
            - Write content that takes more than 2 lines of text
            - Truncate content. If the message needs more words, consider a different component`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[BannerUpsell](/web/bannerupsell)**
      BannerUpsell banners are used for paid upgrades, free trials, or marketing promotions.

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
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('BannerOverlay') },
  };
}
