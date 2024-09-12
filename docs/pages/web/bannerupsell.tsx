import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import actionsVariant from '../../examples/bannerupsell/actionsVariant';
import dontShowSameOnceDismissed from '../../examples/bannerupsell/dontShowSameOnceDismissed';
import dontStack from '../../examples/bannerupsell/dontStack';
import dontUseForCriticalInfo from '../../examples/bannerupsell/dontUseForCriticalInfo';
import iconVariant from '../../examples/bannerupsell/iconVariant';
import imageVariant from '../../examples/bannerupsell/imageVariant';
import labelsExample from '../../examples/bannerupsell/labelsExample';
import localizationLabels from '../../examples/bannerupsell/localizationLabels';
import mainExample from '../../examples/bannerupsell/mainExample';
import messagePropForVisualStyle from '../../examples/bannerupsell/messagePropForVisualStyle';
import multipleTextField from '../../examples/bannerupsell/multipleTextField';
import placeAtTopOfPage from '../../examples/bannerupsell/placeAtTopOfPage';
import planTiming from '../../examples/bannerupsell/planTiming';
import singleTextField from '../../examples/bannerupsell/singleTextField';
import textVariant from '../../examples/bannerupsell/textVariant';
import useForMarketing from '../../examples/bannerupsell/useForMarketing';

const DOC_NAMES = ['BannerUpsell', 'BannerUpsellForm'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen?.BannerUpsell?.displayName}>
      <PageHeader
        description={generatedDocGen?.BannerUpsell?.description}
        name={generatedDocGen?.BannerUpsell?.displayName}
      >
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={240}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.BannerUpsell} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Displaying promotional information to a user that is not tied to a task or state on the surface.
          - Sharing updates or changes to the features and offerings of the product.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Anything related to state or status within the surface. Consider a [BannerCallout](/web/bannercallout) instead.
          - Promoting or highlighting specific elements / areas within a surface. [Let the team know](https://app.slack.com/client/T024LJUGB/C0HUV5J93) if this is needed.
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
            description="Use BannerUpsells for marketing new products or encouraging upgrades."
            sandpackExample={
              <SandpackExample
                code={useForMarketing}
                hideEditor
                layout="column"
                name="Use for Marketing New Products & Encouraging Upgrades"
                previewHeight={240}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
        Place BannerUpsell at the top of the page under the primary navigation when possible.
        `}
            sandpackExample={
              <SandpackExample
                code={placeAtTopOfPage}
                hideEditor
                layout="column"
                name="Place at Top of Page Under Primary Navigation"
                previewHeight={300}
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="lg"
            description={`
        Plan for the timing of your BannerUpsells with new product launches. Try to create different messages for each time an BannerUpsell appears to the user.
        `}
            sandpackExample={
              <SandpackExample
                code={planTiming}
                hideEditor
                layout="column"
                name="Plan Timing with New Product Launches"
                previewHeight={520}
              />
            }
            type="do"
          />

          <MainSection.Card
            cardSize="lg"
            description={`
          Use BannerUpsells for critical information, such as errors or warnings. Use [BannerCallout](/web/bannercallout) instead. BannerUpsells should not be used for general information either.
        `}
            sandpackExample={
              <SandpackExample
                code={dontUseForCriticalInfo}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use for Critical Information, Use BannerCallout Instead"
                previewHeight={200}
              />
            }
            type="don't"
          />

          <MainSection.Card
            cardSize="lg"
            description={`
        Stack BannerUpsells on a page. In the case that they must be stacked, [BannerCallouts](/web/bannercallout) will appear above BannerUpsells.
        `}
            sandpackExample={
              <SandpackExample
                code={dontStack}
                hideControls
                hideEditor
                layout="column"
                name="Do Not Stack on a Page"
                previewHeight={480}
              />
            }
            type="don't"
          />

          <MainSection.Card
            cardSize="lg"
            description={`
        Keep showing the same BannerUpsell once it has been dismissed. BannerUpsells should only appear a maximum of 2 times to the same user, as they have diminishing returns.
        `}
            sandpackExample={
              <SandpackExample
                code={dontShowSameOnceDismissed}
                hideControls
                hideEditor
                layout="column"
                name="Do Not Show the Same Once Dismissed"
                previewHeight={320}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.BannerUpsell?.displayName}>
        <MainSection.Subsection
          description={`
      \`dismissButton\`, \`primaryAction\`, \`secondaryAction\`, and \`submitButtonAccessibilityLabel\` each require a short, descriptive label for screen readers, which should also be localized.

      In the case of action [Buttons](/web/button) or [Links](/web/link), alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\` [IconButton](/web/iconbutton), the label provided should indicate the intent, like “Dismiss this banner”.

      The [Image](/web/image) or [Icon](/web/icon) supplied to \`imageData\` should only supply an \`alt\` or \`accessibilityLabel\`, respectively, if the Image or Icon supplies extra context or information. Icons in BannerUpsells are often purely decorative, and can therefore have an empty string as the \`accessibilityLabel\`.
      `}
          title="Labels"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={labelsExample}
                layout="column"
                name="Labels for Screen Readers and Localization"
                previewHeight={280}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        layout="column"
        name={generatedDocGen.BannerUpsell?.displayName}
        notes={`
Note that \`dismissButton.accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.BannerUpsellForm?.description}
          title={generatedDocGen?.BannerUpsellForm?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen?.BannerUpsellForm}
            id={generatedDocGen?.BannerUpsellForm?.displayName}
            name={generatedDocGen?.BannerUpsellForm?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Used to convey a short message that requires no action, except dismiss."
          title="Text-only"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={textVariant}
                layout="column"
                name="Text-Only for Short Message with Dismiss"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="The Icon is used to add additional meaning to the BannerUpsell. The icon can reference a Pinterest product, feature or an action from our [Icon library](/web/icon)."
          title="Icon"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={iconVariant}
                layout="column"
                name="Icon to Add Additional Meaning"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="The [Image](/web/image) in BannerUpsell is used to add visual interest and draw the user’s attention. Images should relate to the message of the BannerUpsell. BannerUpsell images should use approved photography or be illustrations using our brand colors. Images will always be 128px wide."
          title="Image"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={imageVariant}
                layout="column"
                name="Image to Add Visual Interest"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
          BannerUpsells can have either one primary action, or a primary action and a secondary action. These actions can be buttons, when no \`href\` is supplied, or links, by specifying the \`href\`  property.

      BannerUpsell actions with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.

      For example, “Learn more” may link to a separate documentation site, while “Send invite” could be a button that opens a [Modal](/web/modal) with an invite flow. Be sure to localize the labels of the actions.

      If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.
      `}
          title="Actions"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={actionsVariant}
                layout="column"
                name="Actions Can Be One Primary or One Primary & One Secondary"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Inputs can be added to BannerUpsells to collect information from users (ex: name or email) through the use of \`BannerUpsell.Form\`. Most BannerUpsells should have no more than 2 inputs. If more inputs are needed, direct users to a full page using the \`primaryAction\`.`}
          title="Forms"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={singleTextField}
                layout="column"
                name="Inputs to Collect Information from Users Example (1)"
              />
            }
            title="Single TextField"
          />

          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={multipleTextField}
                layout="column"
                name="Inputs to Collect Information from Users Example (2)"
              />
            }
            title="Multiple TextFields"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
The \`message\` prop accepts either a string or [Text](/web/text). Use a string for simple messages without any visual style. BannerUpsell will handle the text style and adherence to design guidelines.

If the \`message\` text requires more complex style, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within. When passing in your own Text component for \`text\`, do not specify \`color\` or \`align\` Text.
`}
          title="Message"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={messagePropForVisualStyle}
                layout="column"
                name="Message: String or Text for Visual Style"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.BannerUpsell?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[BannerCallout](/web/bannercallout)**
      Use BannerCallout when communicating critical information, such as an error or warning. BannerCallout can also be used to present the user with general information and further actions they can take, like the successful creation of a business account.

      **[Toast](/web/toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike BannerUpsell and BannerCallout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.


      **[ActivationCard](/web/activationcard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  return {
    props: { generatedDocGen: await multipleDocGen(DOC_NAMES) },
  };
}
