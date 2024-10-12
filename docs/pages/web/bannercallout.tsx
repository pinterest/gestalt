import {Fragment} from 'react';
import { BannerCallout,Box, Flex} from 'gestalt'
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibilityExample from '../../examples/bannercallout/accessibilityExample';
import actionsExample from '../../examples/bannercallout/actionsExample';
import dismissibleExample from '../../examples/bannercallout/dismissibleExample';
import dontStack from '../../examples/bannercallout/dontStack';
import dontUseForMarketing from '../../examples/bannercallout/dontUseForMarketing';
import localizationLabels from '../../examples/bannercallout/localizationLabels';
import main from '../../examples/bannercallout/main';
import placeAtTop from '../../examples/bannercallout/placeAtTop';
import productMessages from '../../examples/bannercallout/productMessages';
import variantDefault from '../../examples/bannercallout/variantDefault';
import variantError from '../../examples/bannercallout/variantError';
import variantInfo from '../../examples/bannercallout/variantInfo';
import variantMessage from '../../examples/bannercallout/variantMessage';
import variantRecommendation from '../../examples/bannercallout/variantRecommendation';
import variantSuccess from '../../examples/bannercallout/variantSuccess';
import variantWarning from '../../examples/bannercallout/variantWarning';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
<Fragment>
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box padding={8} width="100%">
        <BannerCallout
          dismissButton={{
            accessibilityLabel: 'Dismiss this banner',
            onDismiss: () => {},
          }}
          iconAccessibilityLabel="Info"
          message="Apply to the Verified Merchant Program ogrot woghjwr;ogjwr  iiqeogh qepgohegj OGRPHOJ AOIEFB /ija'og aehgiearg"
          primaryAction={{
            accessibilityLabel: 'Get started: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Get started',
            target: 'blank',
            role: 'link',
          }}
          secondaryAction={{
            accessibilityLabel: 'Learn more: Verified Merchant Program',
            href: 'https://pinterest.com',
            label: 'Learn more',
            target: 'blank',
            role: 'link',
          }}
          title="Your business account was created!"
          type="info"
        />
      </Box>
    </Flex>
    <Page title={generatedDocGen?.displayName}>

      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          layout="column"
          name={`Main ${generatedDocGen?.displayName} example`}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - When displaying high priority, surface-level information to the user.
          - When providing persistent, non-blocking feedback.
          - When communicating updates to the state or status of the surface.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - When providing messaging/guidance for specific elements or areas within a surface. [Let the team know](https://app.slack.com/client/T024LJUGB/C0HUV5J93) if this is needed.
          - When displaying information that is intended for promotional/marketing purposes. Use [BannerUpsell](/web/bannerupsell) instead.
          - When interacting with the BannerCallout is required for the user to proceed with a task or flow. Use [Modal](/web/modal) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description="Use BannerCallout for messages coming from the product or user interaction. Can be used in both Business and Pinner products."
            sandpackExample={
              <SandpackExample
                code={productMessages}
                hideEditor
                layout="column"
                name="Do - Use BannerCallout for product messages"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
        Place BannerCallout at the top of the page, under the primary navigation or page header when possible.
        `}
            sandpackExample={
              <SandpackExample
                code={placeAtTop}
                hideEditor
                layout="column"
                name="Do - Place BannerCallout at the top of the page"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
        Use BannerCallouts for marketing new products or features. Use [BannerUpsell](/web/bannerupsell) instead.
        `}
            sandpackExample={
              <SandpackExample
                code={dontUseForMarketing}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Use BannerCallouts for marketing new products or features"
              />
            }
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
        Stack BannerCallouts. In the case that banners must be stacked, BannerCallouts should come before BannerUpsells.
        `}
            sandpackExample={
              <SandpackExample
                code={dontStack}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Stack BannerCallouts"
                previewHeight={552}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
      \`iconAccessibilityLabel\`, \`dismissButton\`, \`primaryAction\` and \`secondaryAction\` each require a short, descriptive label for screen readers. These labels should communicate the intent of the icon, such as “Error”, “Info” or “Warning”. They should also be localized.

      When using \`primaryAction\` or \`secondaryAction\`, alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\`, the label provided should indicate the intent, like “Dismiss this banner”.
      `}
          title="Labels"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={accessibilityExample}
                layout="column"
                name="BannerCallout labels"
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
          title="Default"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantDefault} layout="column" name="Variants - Default" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Info BannerCallouts communicate helpful messages to users about the product. In most cases, they should provide an action for users to take."
          title="Info"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantInfo} layout="column" name="Variants - Info" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Recommendation BannerCallouts inform people of quick things they can do to improve their experience."
          title="Recommendation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantRecommendation}
                layout="column"
                name="Variants - Recommendation"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Success BannerCallouts communicate confirmation regarding an action within a larger flow."
          title="Success"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantSuccess} layout="column" name="Variants - Success" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Warning BannerCallouts communicate cautionary messages to users. Action shouldn't be required. The BannerCallout should provide clear guidance on how to correct an issue and/or learn more about it."
          title="Warning"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantWarning}
                layout="column"
                name="Variants - Warning"
                previewHeight={460}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Error BannerCallouts inform users of problems that require immediate action to correct. Further actions on the page might be blocked if users don't correct the problems. The BannerCallout should also provide clear guidance on how to correct the issue and/or learn more about it."
          title="Error"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantError}
                layout="column"
                name="Variants - Error"
                previewHeight={380}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        BannerCallouts can have either one primary action, or a primary action and a secondary action. These actions can be [Links](/web/link), by specifying the \`href\` property, or [Buttons](/web/button), when no \`href\` is supplied.

        BannerCallout actions with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.

        For example, “Learn more” may link to a separate documentation site, while “Apply now” could be a Button that opens a [Modal](/web/modal) with an application flow. Be sure to localize the labels of the actions.

        If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.

        `}
          title="Actions"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={actionsExample} layout="column" name="BannerCallout actions" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        \`dismissButton\` can be used when BannerCallout doesn't indicate a persistent state. This will most commonly be used in \`type="info"\` BannerCallouts.

        Don't use dismiss buttons in the following cases:
        - There is a persistent account or page status that the user must address.
        - The user must access BannerCallout's information again in order to perform a task.
        `}
          title="Dismissible"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={dismissibleExample}
                layout="column"
                name="Dismissable BannerCallout"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection.Subsection
        description={`
The \`message\` prop accepts either a string or [Text](/web/text). Use a string for simple messages without any visual style. BannerCallout will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within.
`}
        title="Message"
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              code={variantMessage}
              layout="column"
              name="BannerCallout 'message' prop example"
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
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike BannerUpsell and BannerCallout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[ActivationCard](/web/activationcard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

    `}
        />
      </MainSection>
    </Page></Fragment>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('BannerCallout') },
  };
}
