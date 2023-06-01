// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibilityExample from '../../examples/callout/accessibilityExample.js';
import actionsExample from '../../examples/callout/actionsExample.js';
import dismissibleExample from '../../examples/callout/dismissibleExample.js';
import dontStack from '../../examples/callout/dontStack.js';
import dontUseForMarketing from '../../examples/callout/dontUseForMarketing.js';
import localizationExample from '../../examples/callout/localizationExample.js';
import main from '../../examples/callout/main.js';
import placeAtTop from '../../examples/callout/placeAtTop.js';
import productMessages from '../../examples/callout/productMessages.js';
import variantError from '../../examples/callout/variantError.js';
import variantInfo from '../../examples/callout/variantInfo.js';
import variantRecommendation from '../../examples/callout/variantRecommendation.js';
import variantSuccess from '../../examples/callout/variantSuccess.js';
import variantWarning from '../../examples/callout/variantWarning.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
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
          - When displaying information that is intended for promotional/marketing purposes. Use [Upsell](/web/upsell) instead.
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
        Use Callouts for marketing new products or features. Use [Upsell](/web/upsell) instead.
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
        Stack Callouts. In the case that banners must be stacked, Callouts should come before Upsells.
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

      <MainSection
        name="Localization"
        description={`Remember to localize all link or button labels, as well as \`title\` and \`message\`.`}
      >
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Callout localization"
                code={localizationExample}
                layout="column"
                // hideEditor
                previewHeight={380}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

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

        Callout actions with link interaction can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider) to learn more about link navigation.

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

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Upsell](/web/upsell)**
      If marketing new products or features, or encouraging upgrades, use Upsell instead.

      **[Toast](/web/toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsell and Callout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[ActivationCard](/web/activationcard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

      **[OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider)**
      OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Callout' }) },
  };
}
