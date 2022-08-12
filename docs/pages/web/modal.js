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
import accessibilityExample from '../../examples/modal/accessibilityExample.js';
import createBoardExample from '../../examples/modal/createBoardExample.js';
import defaultExample from '../../examples/modal/defaultExample.js';
import limitActionsExample from '../../examples/modal/limitActionsExample.js';
import userResponseExample from '../../examples/modal/userResponseExample.js';
import roleAlertDialogExample from '../../examples/modal/roleAlertDialogExample.js';
import sizesExample from '../../examples/modal/sizesExample.js';
import preventCloseExample from '../../examples/modal/preventCloseExample.js';

export default function ModalPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Modal">
      <PageHeader name="Modal" description={generatedDocGen?.description}>
        <SandpackExample code={defaultExample} name="Modal Main Example" hideEditor />
      </PageHeader>
      <GeneratedPropTable
        generatedDocGen={generatedDocGen}
        excludeProps={['_dangerouslyDisableScrollBoundaryContainer']}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Interrupting users to get confirmation on a user-triggered action.
          - Requesting minimal amounts of information from a user (1-2 fields only).
          - Capturing user's full attention for something important.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Any time a separate, designated URL is desired.
          - Requesting large forms of information. Consider a [Sheet](/web/sheet) or new page instead.
          - Any action that should not interrupt users from their current work stream.
          - On top of another modal, since this can create usability issues and confusion.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            showCode={false}
            type="do"
            description="Use Modal when a response is required from the user. Clearly communicate what response is expected and make the action simple and straight forward, such as clicking a button to confirm. The most common responses will be related to confirming or canceling."
            sandpackExample={
              <SandpackExample code={userResponseExample} name="User response example" hideEditor />
            }
          />

          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Limit the number of actions in a Modal. A primary and secondary action should be used for Modals. The rarely used tertiary actions are often destructive, such as “Delete”."
            sandpackExample={
              <SandpackExample code={limitActionsExample} name="Limit actions example" hideEditor />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="In the few cases where Modals are being used within the Pinner product, aim to prevent the content from needing to scroll at a reasonable screen size."
            sandpackExample={
              <SandpackExample code={createBoardExample} name="Create board example" hideEditor />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Modal for content that should have a dedicated surface, like login flows. Think about the core areas of your product that could appear in navigation. If a dedicated URL would be beneficial, use a full page instead. If the user interaction is an optional sub-task, consider using a [Sheet](/web/sheet)."
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Modal for long and complex tasks. Don’t keep the user in a Modal that takes multiple steps to exit. If multiple tasks are required, take the user to a separate page instead."
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Add additional task-based Modals to the Pinner product. While these are currently used in some Pinner surfaces for editing, consider using a full page, Sheet, Flyout or inline editing for a better user experience."
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
          We want to make sure Modals have a clear purpose when being read by a screen reader. \`accessibilityModalLabel\` allows us to update the spoken text for the heading prop and give it more context.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={accessibilityExample} name="Modal accessibility example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Role"
          description={`
          Use the \`alertdialog\` role when the Modal requires the user’s immediate attention, such as an error or warning. For instance, navigating away from a page with active edits may trigger an alertdialog Modal that asks the user to confirm if they want to lose their changes. Learn more about [the alertdialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alertdialog_role).
    `}
        >
          <MainSection.Card
            title='role="alertdialog"'
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={roleAlertDialogExample} name="Alert dialog example" />
            }
          />
          <MainSection.Card
            title='role="dialog" (default)'
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={accessibilityExample} name="Default role example" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description={`Be sure to localize the \`heading\`, \`subheading\` and \`accessibilityModalLabel\` props, as well as any other text elements within Modal. Note that localization can lengthen text by 20 to 30 percent.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Heading"
          description={`
      The \`heading\` will render an H1 when a string is passed in and supports multiple alignment options with the \`align\` prop.

      - **Start**
        \`start\` aligned text is the primary alignment for our Business products. It will be left-aligned in left-to-right languages and right-aligned in right-to-left languages.

      - **Center**
        \`center\` aligned text is the primary alignment for our Pinner products.

      - **Custom**
      If you need more control over the Modal heading, you can pass a custom React node as the heading prop and the Modal will render that instead. This feature should be used sparingly as most customization should be added to the content area. Please contact the Gestalt team if this is needed for your product.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={createBoardExample} name="Create board example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sub-heading"
          description={`The \`subHeading\` is a container that can be used for subtext that provides additional context for the Modal. The sub-heading locks to the top under the heading.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={limitActionsExample} name="Subheading example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sizes"
          description={`Modal has 3 size options: small (\`sm\` - 540px), medium (\`md\` - 720px) and large (\`lg\` - 900px). If absolutely necessary, a number representing a custom width can be provided instead, but we recommend using one of the standard sizes.
      All Modals have a max-width of 100%.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizesExample} name="Sizes example" layout="column" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Preventing close on outside click"
          description={`By default, users can click outside the Modal (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to false. In most cases, the user should be prevented from closing the Modal if the action is required.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={preventCloseExample} name="Prevent close example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Sheet](/web/sheet)**
To allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page, use Sheet.

**[Toast](/web/toast)**
Toast provides temporary feedback on an interaction. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of blocking the entire page.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: DocGen |},
|}> {
  return {
    props: {
      generatedDocGen: await docgen({ componentName: 'Modal' }),
    },
  };
}
