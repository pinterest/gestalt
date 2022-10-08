// @flow strict
import { type Node } from 'react';
import Page from '../../docs-components/Page.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
// import SandpackExample from '../../docs-components/SandpackExample.js';
// import defaultExample from '../../examples/alertmodal/defaultExample.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

export default function AlertModalPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  // const PREVIEW_HEIGHT = 450;

  return (
    <Page title="AlertModal">
      <PageHeader
        //   defaultCode={`
        // function DefaultExample() {
        //   const [showModal, setShowModal] = React.useState(false);

        //   const HEADER_ZINDEX = new FixedZIndex(10);
        //   const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

        //   return (
        //     <Layer zIndex={zIndex}>
        //       <AlertModal
        //       type="error"
        //         accessibilityModalLabel="Delete board 70s Furniture"
        //         heading="Delete this board"
        //         primaryAction={{
        //           accessibilityLabel: 'Confirm delete board',
        //           label: 'Yes, delete',
        //         }}
        //         secondaryAction={{
        //           accessibilityLabel: 'Cancel board deletion',
        //           label: 'No, keep',
        //         }}
        //         onDismiss={() => {
        //           setShowModal(!showModal);
        //         }}
        //       >
        //         <Text>Your board and all of its Pins will be deleted forever. Other Pinners who have access to this board will also lose access. This cannot be undone.</Text>
        //       </AlertModal>
        //     </Layer>
        //   );
        // }
        // `}
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Interrupting users to get confirmation on a user-triggered action that is potentially disruptive or significantly changes the user’s content and system.
          - Interrupting users to alert them of potential issues and errors; this can be user or system-generated.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Requesting large forms of information. Consider a [Sheet](/web/sheet) or new page instead.
          - Any action that should not interrupt users from their current work stream, such as saving a Pin. Use a [Toast](/web/toast) instead.
          - When alerting users of issues that can be corrected on the page or surface itself without interrupting their flow. Instead use a [Callout](/web/callout) or [SlimBanner](/web/slimbanner).
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Clearly communicate what response is expected and make the action simple and straight forward, such as clicking/tapping a button to confirm."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use language that makes it hard to understand what action is being taken, while adding additional actions that may take the user out of their existing context."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use to overlay Page content; horizontally and vertically center modals on the screen."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use AlertModal on top of another Modal Dialog. This can cause accessibility issues with focus states and make it hard for a user to escape and go back to the previous surface. On mobile surfaces, if you have to confirm something triggered by a modal dialog, auto-dismiss the first dialog before presenting with the confirmation."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Limit the content to prevent the need to scroll at most screen sizes."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use AlertModal for content for long and complex tasks or that should have a dedicated surface, like login flows. If you have to put more functionality in an overlay, use GenericModal, or Sheet."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Provide a way for the user to correct an error or issue via a button or a link."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Leave it up to the user to find where to go to fix an issue."
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Explain to the user why they’ve encountered a warning or error when an action button or link is not possible."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Omit an explanation as to why a user is encountering an error or issue."
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
          We want to make sure AlertModals have a clear purpose when being read by a screen reader. \`accessibilityModalLabel\` allows us to update the spoken text for the heading prop and give it more context.`}
        >
          <MainSection.Card cardSize="lg" />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`heading\` and \`accessibilityModalLabel\`props, as well as any other text elements within AlertModal. Note that localization can lengthen text by 20 to 30 percent. `}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Confirmation"
          description="This is generally user-generated and asks a user to confirm or cancel an action. This variant always requires a primary and secondary button; the primary button is for confirming, and the secondary for dismissing the modal. Confirmations aren’t critical and can be dismissed by clicking outside of the modal and hitting the ESC key, in addition to using the “Cancel” buttons provided in the modal."
        >
          <MainSection.Card />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Acknowledgment"
          description="This is system-generated and only requires a user to dismiss the message."
        >
          <MainSection.Card />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Warning"
          description="Warnings are used to alert a user that they need to proceed with caution. Due to their critical nature, warnings can only be dismissed by interacting with the dismiss buttons provided by the modal. If there is a way to resolve the warning, two buttons can be included. If not, only one “dismiss” button is needed."
        >
          <MainSection.Card />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Error"
          description="Error messages alert users of an error or a very critical issue that severely limits the user’s ability to continue. Like warnings, warnings can only be dismissed by interacting with the dismiss buttons provided by the modal. If there is a way to resolve the error, two buttons can be included. If not, only one “dismiss” button is needed."
        >
          <MainSection.Card />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With checkbox"
          description="Checkbox can be added to a modal that isn’t a warning or an error. Checkboxes are normally used for confirmation modals that may appear frequently in a creation or editing flow. An example is creating an Idea Pin. **Don’t allow the option to not show a modal again if it is an infrequent action, or a highly destructive action like deleting a Board**."
        >
          <MainSection.Card />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Consider internationalization and how other languages may be constrained
- Use concise language while making it clear what is expected of the user. If the desired action can be confused with “Cancel”, add “Yes,” to the action. For example “Yes, remove”, “No, keep”
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Pose a question in the headline that isn’t clear about the action being proposed, like “Are you sure?”
- Use lengthy, technical jargon or local idioms that will be hard to translate to other languages
- Avoid exclamation marks unless the tone is celebratory; this is especially true when surfacing errors or warnings
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Toast](/web/toast)**
        Toast provides feedback shortly after a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsells and Banner Alerts, toasts overlay Page content. They also automatically disappear after a certain amount of time without being dismissed by the user.

        **[Callout](/web/callout)**
        Callouts are used at the top-most level of a page to communicate highest-priority information that applies to the entire page or surface. Callouts can be dismissed and are also actionable.

        **[SlimBanner](/web/slimbanner)**
        SlimBanner conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information.

        **[Modal](/web/modal)**
        A generic, customizable container for modals that aren’t used as alerts and need more functionality like form fields.
        `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'AlertModal' }) },
  };
}
