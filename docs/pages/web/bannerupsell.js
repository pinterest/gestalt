// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen';
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

export default function DocsPage({
  generatedDocGen,
}: {
  generatedDocGen: { [string]: DocGen },
}): ReactNode {
  return (
    <Page title={generatedDocGen?.BannerUpsell?.displayName}>
      <PageHeader
        name={generatedDocGen?.BannerUpsell?.displayName}
        description={generatedDocGen?.BannerUpsell?.description}
      >
        <SandpackExample
          name="Main Example"
          code={mainExample}
          layout="column"
          hideEditor
          previewHeight={240}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.BannerUpsell} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Displaying promotional information to a user that is not tied to a task or state on the surface.
          - Sharing updates or changes to the features and offerings of the product.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Anything related to state or status within the surface. Consider a [Callout](/web/callout) instead.
          - Promoting or highlighting specific elements / areas within a surface. [Let the team know](https://app.slack.com/client/T024LJUGB/C0HUV5J93) if this is needed.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use BannerUpsells for marketing new products or encouraging upgrades."
            sandpackExample={
              <SandpackExample
                name="Use for Marketing New Products & Encouraging Upgrades"
                code={useForMarketing}
                layout="column"
                previewHeight={240}
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
        Place BannerUpsell at the top of the page under the primary navigation when possible.
        `}
            sandpackExample={
              <SandpackExample
                name="Place at Top of Page Under Primary Navigation"
                code={placeAtTopOfPage}
                layout="column"
                previewHeight={300}
                hideEditor
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
        Plan for the timing of your BannerUpsells with new product launches. Try to create different messages for each time an BannerUpsell appears to the user.
        `}
            sandpackExample={
              <SandpackExample
                name="Plan Timing with New Product Launches"
                code={planTiming}
                layout="column"
                previewHeight={520}
                hideEditor
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
          Use BannerUpsells for critical information, such as errors or warnings. Use [Callout](/web/callout) instead. BannerUpsells should not be used for general information either.
        `}
            sandpackExample={
              <SandpackExample
                name="Don't Use for Critical Information, Use Callout Instead"
                code={dontUseForCriticalInfo}
                layout="column"
                previewHeight={200}
                hideEditor
                hideControls
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Stack BannerUpsells on a page. In the case that they must be stacked, [Callouts](/web/callout) will appear above BannerUpsells.
        `}
            sandpackExample={
              <SandpackExample
                name="Do Not Stack on a Page"
                code={dontStack}
                layout="column"
                previewHeight={480}
                hideEditor
                hideControls
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Keep showing the same BannerUpsell once it has been dismissed. BannerUpsells should only appear a maximum of 2 times to the same user, as they have diminishing returns.
        `}
            sandpackExample={
              <SandpackExample
                name="Do Not Show the Same Once Dismissed"
                code={dontShowSameOnceDismissed}
                layout="column"
                previewHeight={320}
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.BannerUpsell?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      \`dismissButton\`, \`primaryAction\`, \`secondaryAction\`, and \`submitButtonAccessibilityLabel\` each require a short, descriptive label for screen readers, which should also be localized.

      In the case of action [Buttons](/web/button) or [Links](/web/link), alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\` [IconButton](/web/iconbutton), the label provided should indicate the intent, like “Dismiss this banner”.

      The [Image](/web/image) or [Icon](/web/icon) supplied to \`imageData\` should only supply an \`alt\` or \`accessibilityLabel\`, respectively, if the Image or Icon supplies extra context or information. Icons in BannerUpsells are often purely decorative, and can therefore have an empty string as the \`accessibilityLabel\`.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Labels for Screen Readers and Localization"
                code={labelsExample}
                layout="column"
                previewHeight={280}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen.BannerUpsell?.displayName}
        layout="column"
        notes={`
Note that \`dismissButton.accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.BannerUpsellForm?.displayName}
          description={generatedDocGen?.BannerUpsellForm?.description}
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
          title="Text-only"
          description="Used to convey a short message that requires no action, except dismiss."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Text-Only for Short Message with Dismiss"
                code={textVariant}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Icon"
          description="The Icon is used to add additional meaning to the BannerUpsell. The icon can reference a Pinterest product, feature or an action from our [Icon library](/web/icon)."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Icon to Add Additional Meaning"
                code={iconVariant}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Image"
          description="The [Image](/web/image) in BannerUpsell is used to add visual interest and draw the user’s attention. Images should relate to the message of the BannerUpsell. BannerUpsell images should use approved photography or be illustrations using our brand colors. Images will always be 128px wide."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Image to Add Visual Interest"
                code={imageVariant}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Actions"
          description={`
          BannerUpsells can have either one primary action, or a primary action and a secondary action. These actions can be buttons, when no \`href\` is supplied, or links, by specifying the \`href\`  property.

      BannerUpsell actions with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.

      For example, “Learn more” may link to a separate documentation site, while “Send invite” could be a button that opens a [Modal](/web/modal) with an invite flow. Be sure to localize the labels of the actions.

      If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Actions Can Be One Primary or One Primary & One Secondary"
                code={actionsVariant}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Forms"
          description={`Inputs can be added to BannerUpsells to collect information from users (ex: name or email) through the use of \`BannerUpsell.Form\`. Most BannerUpsells should have no more than 2 inputs. If more inputs are needed, direct users to a full page using the \`primaryAction\`.`}
        >
          <MainSection.Card
            cardSize="lg"
            title="Single TextField"
            sandpackExample={
              <SandpackExample
                name="Inputs to Collect Information from Users Example (1)"
                code={singleTextField}
                layout="column"
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            title="Multiple TextFields"
            sandpackExample={
              <SandpackExample
                name="Inputs to Collect Information from Users Example (2)"
                code={multipleTextField}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Message"
          description={`
The \`message\` prop accepts either a string or [Text](/web/text). Use a string for simple messages without any visual style. BannerUpsell will handle the text style and adherence to design guidelines.

If the \`message\` text requires more complex style, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within. When passing in your own Text component for \`text\`, do not specify \`color\` or \`align\` Text.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Message: String or Text for Visual Style"
                code={messagePropForVisualStyle}
                layout="column"
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
      **[Callout](/web/callout)**
      Use Callout when communicating critical information, such as an error or warning. Callout can also be used to present the user with general information and further actions they can take, like the successful creation of a business account.

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
  props: { generatedDocGen: { [string]: DocGen } },
}> {
  return {
    props: { generatedDocGen: await multipleDocGen(['BannerUpsell', 'BannerUpsellForm']) },
  };
}
