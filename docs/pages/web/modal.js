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
import accessibilityExample from '../../examples/modal/accessibilityExample';
import createBoardExample from '../../examples/modal/createBoardExample';
import limitActionsExample from '../../examples/modal/limitActionsExample';
import localizationLabels from '../../examples/modal/localizationLabels';
import mobileExample from '../../examples/modal/mobileExample';
import preventCloseExample from '../../examples/modal/preventCloseExample';
import roleAlertDialogExample from '../../examples/modal/roleAlertDialogExample';
import sizesExample from '../../examples/modal/sizesExample';

export default function ModalPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  const PREVIEW_HEIGHT = 450;

  return (
    <Page title="Modal">
      <PageHeader description={generatedDocGen?.description} name="Modal" pdocsLink>
        <SandpackExample
          code={accessibilityExample}
          hideEditor
          name="Modal Main Example"
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>
      <GeneratedPropTable
        excludeProps={['_dangerouslyDisableScrollBoundaryContainer']}
        generatedDocGen={generatedDocGen}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Interrupting users to get confirmation on a user-triggered action.
          - Requesting minimal amounts of information from a user (1-2 fields only).
          - Capturing user's full attention for something important.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Any time a separate, designated URL is desired.
          - Requesting large forms of information. Consider [OverlayPanel](/web/overlaypanel) or new page instead.
          - Any action that should not interrupt users from their current work stream.
          - On top of another modal, since this can create usability issues and confusion.
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
            description="Use Modal when a response is required from the user. Clearly communicate what response is expected and make the action simple and straight forward, such as clicking a button to confirm. The most common responses will be related to confirming or canceling."
            sandpackExample={
              <SandpackExample
                code={accessibilityExample}
                hideEditor
                name="User response example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            showCode={false}
            type="do"
          />

          <MainSection.Card
            cardSize="lg"
            description="Limit the number of actions in a Modal. A primary and secondary action should be used for Modals. The rarely used tertiary actions are often destructive, such as “Delete”."
            sandpackExample={
              <SandpackExample
                code={limitActionsExample}
                hideEditor
                name="Limit actions example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description="In the few cases where Modals are being used within the Pinner product, aim to prevent the content from needing to scroll at a reasonable screen size."
            sandpackExample={
              <SandpackExample
                code={createBoardExample}
                hideEditor
                name="Create board example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description="Use Modal for content that should have a dedicated surface, like login flows. Think about the core areas of your product that could appear in navigation. If a dedicated URL would be beneficial, use a full page instead. If the user interaction is an optional sub-task, consider using [OverlayPanel](/web/overlaypanel)."
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description="Use Modal for long and complex tasks. Don’t keep the user in a Modal that takes multiple steps to exit. If multiple tasks are required, take the user to a separate page instead."
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description="Add additional task-based Modals to the Pinner product. While these are currently used in some Pinner surfaces for editing, consider using a full page, OverlayPanel, Flyout or inline editing for a better user experience."
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
          We want to make sure Modals have a clear purpose when being read by a screen reader. \`accessibilityModalLabel\` allows us to update the spoken text for the heading prop and give it more context.`}
          title="Labels"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={accessibilityExample}
                name="Modal accessibility example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
          If the Modal requires the user’s immediate attention, such as an error or warning, use the [ModalAlert](/web/modalalert) component instead, which automatically applies \`role="alertdialog"\` to the modal. For instance, navigating away from a page with active edits may trigger an alertdialog ModalAlert that asks the user to confirm if they want to lose their changes. Learn more about [the alertdialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alertdialog_role).
    `}
          title="Role"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={roleAlertDialogExample}
                name="Alert dialog example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title='role="alertdialog"'
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={createBoardExample}
                name="Default role example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title='role="dialog" (default)'
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        previewHeight={PREVIEW_HEIGHT}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
      The \`heading\` will render an H1 when a string is passed in and supports multiple alignment options with the \`align\` prop.

      - **Start**
        \`start\` aligned text is the primary alignment for our Business products. It will be left-aligned in left-to-right languages and right-aligned in right-to-left languages.

      - **Center**
        \`center\` aligned text is the primary alignment for our Pinner products.

      - **Custom**
      If you need more control over the Modal heading, you can pass a custom React node as the heading prop and the Modal will render that instead. This feature should be used sparingly as most customization should be added to the content area. Please contact the Gestalt team if this is needed for your product.
      `}
          title="Heading"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={createBoardExample}
                name="Create board example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`The \`subHeading\` is a container that can be used for subtext that provides additional context for the Modal. The sub-heading locks to the top under the heading.`}
          title="Sub-heading"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={limitActionsExample}
                name="Subheading example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Modal has 3 size options: small (\`sm\` - 540px), medium (\`md\` - 720px) and large (\`lg\` - 900px). If absolutely necessary, a number representing a custom width can be provided instead, but we recommend using one of the standard sizes.
      All Modals have a max-width of 100%.`}
          title="Sizes"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={sizesExample}
                layout="column"
                name="Sizes example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`By default, users can click outside the Modal (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to false. In most cases, the user should be prevented from closing the Modal if the action is required.`}
          title="Preventing close on outside click"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={preventCloseExample}
                name="Prevent close example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Modal requires [DeviceTypeProvider](/web/utilities/devicetypeprovider) to enable its mobile user interface. The example below shows the mobile platform UI and its implementation.

For mobile, all \`sizes\` are unified into a full mobile viewport Modal. Notice that \`subHeading\` gets moved from the header to the main content container.
`}
          title="Mobile"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={mobileExample} layout="mobileRow" name="Mobile example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#modal',
            text: 'Modal extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[ModalAlert](/web/modalalert)**
Used to alert a user of an issue, or to request confirmation after a user-triggered action. Should be used instead of Modal for simple acknowledgments and confirmations.

**[OverlayPanel](/web/overlaypanel)**
To allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page, use OverlayPanel.

**[Toast](/web/toast)**
Toast provides temporary feedback on an interaction. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of blocking the entire page.
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
    props: {
      generatedDocGen: await docGen('Modal'),
    },
  };
}
