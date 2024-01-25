// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibilityExample from '../../examples/callout/accessibilityExample';
import actionsExample from '../../examples/callout/actionsExample';
import dismissibleExample from '../../examples/callout/dismissibleExample';
import dontStack from '../../examples/callout/dontStack';
import dontUseForMarketing from '../../examples/callout/dontUseForMarketing';
import localizationLabels from '../../examples/callout/localizationLabels';
import main from '../../examples/callout/main';
import placeAtTop from '../../examples/callout/placeAtTop';
import productMessages from '../../examples/callout/productMessages';
import variantError from '../../examples/callout/variantError';
import variantInfo from '../../examples/callout/variantInfo';
import variantMessage from '../../examples/callout/variantMessage';
import variantRecommendation from '../../examples/callout/variantRecommendation';
import variantSuccess from '../../examples/callout/variantSuccess';
import variantWarning from '../../examples/callout/variantWarning';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          layout="column"
          hideEditor
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - When displaying high priority, surface-level information to the user.
          - When providing persistent, non-blocking feedback.
          - When communicating updates to the state or status of the surface.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When providing messaging/guidance for specific elements or areas within a surface. [Let the team know](https://app.slack.com/client/T024LJUGB/C0HUV5J93) if this is needed.
          - When displaying information that is intended for promotional/marketing purposes. Use [BannerUpsell](/web/bannerupsell) instead.
          - When interacting with the Callout is required for the user to proceed with a task or flow. Use [Modal](/web/modal) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use Callout for messages coming from the product or user interaction. Can be used in both Business and Pinner products."
            sandpackExample={
              <SandpackExample
                name="Do - Use Callout for product messages"
                code={productMessages}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
        Place Callout at the top of the page, under the primary navigation or page header when possible.
        `}
            sandpackExample={
              <SandpackExample
                name="Do - Place Callout at the top of the page"
                code={placeAtTop}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Use Callouts for marketing new products or features. Use [BannerUpsell](/web/bannerupsell) instead.
        `}
            sandpackExample={
              <SandpackExample
                name="Don't - Use Callouts for marketing new products or features"
                code={dontUseForMarketing}
                hideControls
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Stack Callouts. In the case that banners must be stacked, Callouts should come before BannerUpsells.
        `}
            sandpackExample={
              <SandpackExample
                name="Don't - Stack Callouts"
                code={dontStack}
                hideControls
                layout="column"
                hideEditor
                previewHeight={552}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      \`iconAccessibilityLabel\`, \`dismissButton\`, \`primaryAction\` and \`secondaryAction\` each require a short, descriptive label for screen readers. These labels should communicate the intent of the icon, such as “Error”, “Info” or “Warning”. They should also be localized.

      When using \`primaryAction\` or \`secondaryAction\`, alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\`, the label provided should indicate the intent, like “Dismiss this banner”.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Callout labels"
                code={accessibilityExample}
                layout="column"
                // hideEditor
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`Note that \`dismissButton.accessibilityLabel\` and \`iconAccessibilityLabel\` are optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Info"
          description="Info Callouts communicate helpful messages to users about the product. In most cases, they should provide an action for users to take."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Variants - Info"
                code={variantInfo}
                layout="column"
                // hideEditor
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Recommendation Callouts inform people of quick things they can do to improve their experience."
          title="Recommendation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Variants - Recommendation"
                code={variantRecommendation}
                layout="column"
                // hideEditor
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Success Callouts communicate confirmation regarding an action within a larger flow."
          title="Success"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Variants - Success"
                code={variantSuccess}
                layout="column"
                // hideEditor
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Warning"
          description="Warning Callouts communicate cautionary messages to users. Action shouldn't be required. The Callout should provide clear guidance on how to correct an issue and/or learn more about it."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Variants - Warning"
                code={variantWarning}
                layout="column"
                // hideEditor
                previewHeight={460}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Error"
          description="Error Callouts inform users of problems that require immediate action to correct. Further actions on the page might be blocked if users don't correct the problems. The Callout should also provide clear guidance on how to correct the issue and/or learn more about it."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Variants - Error"
                code={variantError}
                layout="column"
                // hideEditor
                previewHeight={380}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Actions"
          description={`
        Callouts can have either one primary action, or a primary action and a secondary action. These actions can be [Links](/web/link), by specifying the \`href\` property, or [Buttons](/web/button), when no \`href\` is supplied.

        Callout actions with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.

        For example, “Learn more” may link to a separate documentation site, while “Apply now” could be a Button that opens a [Modal](/web/modal) with an application flow. Be sure to localize the labels of the actions.

        If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.

        `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Callout actions"
                code={actionsExample}
                layout="column"
                // hideEditor
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Dismissible"
          description={`
        \`dismissButton\` can be used when Callout doesn't indicate a persistent state. This will most commonly be used in \`type="info"\` Callouts.

        Don't use dismiss buttons in the following cases:
        - There is a persistent account or page status that the user must address.
        - The user must access Callout's information again in order to perform a task.
        `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Dismissable Callout"
                code={dismissibleExample}
                layout="column"
                // hideEditor
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection.Subsection
        description={`
The \`message\` prop accepts either a string or [Text](/web/text). Use a string for simple messages without any visual style. Callout will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within.
`}
        title="Message"
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              name="Callout 'message' prop example"
              code={variantMessage}
              layout="column"
            />
          }
        />
      </MainSection.Subsection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[BannerUpsell](/web/bannerupsell)**
      If marketing new products or features, or encouraging upgrades, use BannerUpsell instead.

      **[Toast](/web/toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike BannerUpsell and Callout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[ActivationCard](/web/activationcard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

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
    props: { generatedDocGen: await docGen('Callout') },
  };
}
