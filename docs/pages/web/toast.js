// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import avatar from '../../examples/toast/avatar';
import dismissable from '../../examples/toast/dismissable';
import doConcise from '../../examples/toast/doConcise';
import doDismiss from '../../examples/toast/doDismiss';
import doInteraction from '../../examples/toast/doInteraction';
import dontMultiple from '../../examples/toast/dontMultiple';
import dontPermanent from '../../examples/toast/dontPermanent';
import dontRequest from '../../examples/toast/dontRequest';
import dontWordy from '../../examples/toast/dontWordy';
import doOne from '../../examples/toast/doOne';
import error from '../../examples/toast/error';
import helperLink from '../../examples/toast/helperLink';
import howTo from '../../examples/toast/howto';
import icon from '../../examples/toast/icon';
import image from '../../examples/toast/image';
import localizationLabels from '../../examples/toast/localizationLabels';
import main from '../../examples/toast/main';
import message from '../../examples/toast/message';
import primaryAction from '../../examples/toast/primaryAction';
import processing from '../../examples/toast/processing';
import richMessage from '../../examples/toast/richMessage';
import success from '../../examples/toast/success';
import textOnly from '../../examples/toast/textOnly';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        pdocsLink
      >
        <SandpackExample code={main} name="Main Toast example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Briefly acknowledging a user action without interrupting their flow.
- When acknowledging an action that relates to another surface, providing a link that navigates the user to that surface.
- To undo actions after acknowledgement, if there isn’t already a way to do so on the current surface.
- For system processes like showing that a process is loading, or when there are internet connectivity issues.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- When, due to an error, a user can’t even continue performing basic tasks like browsing already loaded Pins.
- When asking a user to confirm that they want to perform an action. Use [ModalAlert](/web/modalalert) instead.
- When you want to suggest a user spend more money or try new features; use [BannerUpsell](/web/bannerupsell) instead.
- For errors that relate to a specific section or page. Use Callout(/web/callout) or SlimBanner(/web/slimbanner) instead.
- To guide or educate the user. Use Popover(/web/popover) or Tooltip(/web/tooltip) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Place Toasts out of the way so that a user can still navigate and complete tasks. Keep a bottom margin that is the same size as the left and right margins."
          />
          <MainSection.Card
            type="don't"
            description="Block navigation controls with Toasts or align too close to the edge of a navigation bar."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Show one Toast at a time, with errors and acknowledgements taking priority."
            sandpackExample={<SandpackExample code={doOne} name="Do - One" hideEditor />}
          />
          <MainSection.Card
            type="don't"
            description="Stack multiple toasts as that will block the user."
            sandpackExample={
              <SandpackExample
                code={dontMultiple}
                name="Don't - Multiple"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            cardSize="md"
            description="Use concise text to avoid blocking the user with a large toast."
            sandpackExample={<SandpackExample code={doConcise} name="Do - Concise" hideEditor />}
          />
          <MainSection.Card
            type="don't"
            cardSize="md"
            description="Be wordy so that toasts increase in size, block content and disappear before a user can finish reading them. Truncate text after two lines, unless it will make it hard to understand the desired message."
            sandpackExample={
              <SandpackExample code={dontWordy} name="Don't - Wordy" hideEditor hideControls />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            cardSize="md"
            description="Include a way to dismiss the toast when it is actionable or contains multiple lines of text. On desktop, toasts can be dismissed via an icon button; on mobile web via swiping on the toast in any direction."
            sandpackExample={<SandpackExample code={doDismiss} name="Do - Dismiss" hideEditor />}
          />
          <MainSection.Card
            type="don't"
            cardSize="md"
            description="Leaving toasts on screen for a long time without a way to dismiss. Exceptions are blocking error toasts that need to persist across surfaces until a user takes action."
            sandpackExample={
              <SandpackExample
                code={dontPermanent}
                name="Don't - Permanent"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            cardSize="md"
            description="Make interaction optional and secondary. Toasts are used primarily to acknowledge that a task has been completed."
            sandpackExample={
              <SandpackExample code={doInteraction} name="Do - Interaction" hideEditor />
            }
          />
          <MainSection.Card
            type="don't"
            cardSize="md"
            description="Make the request for user action the primary message on a Toast. If you need user action, use an [ModalAlert](/web/modalalert) or [Callout](/web/callout) instead."
            sandpackExample={
              <SandpackExample code={dontRequest} name="Don't - Request" hideEditor hideControls />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Duration"
          description={`
Some people may take longer to read toasts than others due to cognitive impairments. Use the guide below to set duration for Toasts:

- Brief text of approximately 10–15 words (including button text): 5s
- Longer than 15 words: Slow readers can read about 125–200 words per minute. Base your duration on the slowest number. For example, a toast with 20 words should be set to 10s. [Learn more](https://capitalizemytitle.com/reading-time/3000-words/).

Toasts should be on screen for a minimum of 5 seconds; this gives most people enough time to read and act. Please note that a separate Toast manager must be implemented in order to handle duration and animation.

Once a toast is triggered, allow for a cooldown period of about 7 seconds before the toast can be triggered again. This will prevent multiple toasts from appearing.

      `}
        />
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`
Note that \`dismissButton.accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Toasts should be displayed in the center of the viewport, opposite the main navbar (e.g. at the top of the viewport on mobile, bottom of the viewport on desktop). Though not implemented here, Toasts are meant to be ephemeral and disappear after a few seconds."
          title="How to display"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={howTo} name="How to implement" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Text-only">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={textOnly} name="Text-only" />}
            description="A simple, generic acknowledgment after an action is taken. These should not be actionable."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Success">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={success} name="Success" />}
            description="With an icon that denotes a more important change, like a password update. These should not be actionable."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Processing">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={processing} name="Processing" />}
            description="A toast with a loading spinner or other progress indicator that disappears once the process is complete."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Error">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={error} name="Error" />}
            description="Used rarely for connection issues or unknown errors where we don’t want to completely block the users flow, but want the message to persist if the user goes to another surface. Providing a way to solve the error or get help is recommended."
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Message"
          description={`
The \`text\` prop accepts either a string or [Text](/web/text). Use a string for guide toasts without any visual style. Toast will handle the text style and adherence to design guidelines. Regular strings are subject to two-line truncation.

If  confirmation toast's text with more complex style is required, such as bold text, inline links, or no truncation, use Text to wrap your message with any additional Text or Link usages contained within. When passing in your own Text component for \`text\`, do not specify \`color\` on Text. Toast will automatically pick the correct text color for the given \`type\`.
`}
          columns={2}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={<SandpackExample code={message} name="Message" />}
          />
          <MainSection.Card
            cardSize="md"
            sandpackExample={<SandpackExample code={richMessage} name="Rich message" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Primary action">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={primaryAction} name="Primary action" />}
            description="As a secondary element, to drive users to another surface, or change a recently completed action"
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Helper link">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={helperLink} name="helperLink" />}
            description="As a secondary element, to drive users to another surface."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Image">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={image} name="Image" />}
            description="With an image for Pin or Board actions."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Avatar">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={avatar} name="avatar" />}
            description="With an Avatar for Profile or Pinner-related messaging. An optional link be included. When there’s a link on mWeb, the entire toast is tapable, using TapArea."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Icon">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={icon} name="icon" />}
            description="For when an icon is needed to represent content that isn’t a pin or a profile."
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Dismissable">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={dismissable} name="Dismissable" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Consider internationalization and how other languages may be take up more space.
- Be brief and concise.
- Use conversational language.`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use lengthy, technical jargon or local idioms that will be hard to translate to other languages.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#toast',
            text: 'Toast extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Alert Modal](/web/modalalert)**
      An ModalAlert is a simple modal dialog used to alert a user of an issue, or to request confirmation after a user-generated action. ModalAlert overlays and blocks Page content until it is dismissed by the user.

      **[BannerUpsell](/web/bannerupsell)**
      BannerUpsell banners are used for paid upgrades, free trials, or marketing promotions.

      **[Modal](/web/modal)**
      A generic, customizable container for modals that aren’t used as alerts or acknowledgements and need more functionality like form fields.

      **[PopoverEducational](/web/popovereducational)**
      PopoverEducational are used to educate users about a particular element on the screen, like a button or new UI control.

      **[Tooltip](/web/tooltip)**
      Tooltip provides helpful information regarding an interactive UI element, typically an IconButton. It is displayed on hover or focus of a UI element, and disappears on mouse out or blur.

      **[Callout](/web/callout)**
      Callouts are used at the top-most level of a page to communicate highest-priority information that applies to the entire page or surface. Callouts can be dismissed and are also actionable.
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
    props: { generatedDocGen: await docGen('Toast') },
  };
}
