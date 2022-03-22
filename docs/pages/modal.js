// @flow strict
import { type Node } from 'react';
import docgen, { type DocGen } from '../components/docgen.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';

export default function ModalPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Modal">
      <PageHeader
        name="Modal"
        description={generatedDocGen?.description}
        defaultCode={`
<iframe src="https://codesandbox.io/embed/trusting-wu-c8514?fontsize=14&hidenavigation=1&theme=light&view=preview"
style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
title="Modal Main Example"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
    `}
        showSourceLink
      />
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
          - Requesting large forms of information. Consider a [Sheet](/sheet) or new page instead.
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
            defaultCode={`
<iframe src="https://codesandbox.io/embed/trusting-wu-c8514?fontsize=14&hidenavigation=1&theme=light&view=preview"
style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
title="Modal required response"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
      `}
          />

          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Limit the number of actions in a Modal. A primary and secondary action should be used for Modals. The rarely used tertiary actions are often destructive, such as “Delete”."
            defaultCode={`
<iframe src="https://codesandbox.io/embed/cool-hill-ngdjx?fontsize=14&hidenavigation=1&theme=light&view=preview"
style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
title="Modal with actions"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
      `}
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="In the few cases where Modals are being used within the Pinner product, aim to prevent the content from needing to scroll at a reasonable screen size."
            defaultCode={`
<iframe src="https://codesandbox.io/embed/fervent-rosalind-xrzm5?fontsize=14&hidenavigation=1&theme=light&view=preview"
style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
title="Modal without scrolling"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
      `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Modal for content that should have a dedicated surface, like login flows. Think about the core areas of your product that could appear in navigation. If a dedicated URL would be beneficial, use a full page instead. If the user interaction is an optional sub-task, consider using a [Sheet](/sheet)."
            defaultCode={`

`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Modal for long and complex tasks. Don’t keep the user in a Modal that takes multiple steps to exit. If multiple tasks are required, take the user to a separate page instead."
            defaultCode={`

`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Add additional task-based Modals to the Pinner product. While these are currently used in some Pinner surfaces for editing, consider using a full page, Sheet, Flyout or inline editing for a better user experience."
            defaultCode={`

`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <MainSection.Subsection
          title="Labels"
          description={`
          We want to make sure Modals have a clear purpose when being read by a screen reader. \`accessibilityModalLabel\` allows us to update the spoken text for the heading prop and give it more context.`}
        >
          <MainSection.Card
            cardSize="lg"
            iframeContent={`
              <iframe src="https://codesandbox.io/embed/trusting-wu-c8514?fontsize=14&hidenavigation=1&theme=light&view=preview"
              style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
              title="Accessibility Labels"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            `}
            defaultCode={`
function AccessibilityExample(props) {
  const [showModal, setShowModal] = React.useState(false);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        accessibilityModalLabel="Delete board 60s Furniture"
        heading="Are you sure?"
        onDismiss={() => { setShowModal(!showModal) }}
        footer={
          <Flex justifyContent="end" gap={2}>
            <Button color="gray" text="Cancel"/>
            <Button color="red" text="Delete forever"/>
          </Flex>
        }
        size="sm"
      >
        <Box padding={8}>
          <Text align="center" size="300">Once you delete a board and all its Pins, you can't undo it!</Text>
        </Box>
      </Modal>
    </Layer>
  );
}
    `}
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
            iframeContent={`
              <iframe src="https://codesandbox.io/embed/trusting-wu-c8514?fontsize=14&hidenavigation=1&theme=light&view=preview"
                style={{width: '100%', height:'400px', border:'0', borderRadius: '4px', overflow:'hidden'}}
                title="Accessibility Role ex1"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            `}
            defaultCode={`
function AlertDialogAccessibilityExample(props) {
  const [showModal, setShowModal] = React.useState(false);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
  <Layer zIndex={zIndex}>
    <Modal
      accessibilityModalLabel="Delete board 60s Furniture"
      heading="Are you sure?"
      role="alertdialog"
      onDismiss={() => { setShowModal(!showModal) }}
      footer={
        <Flex justifyContent="end" gap={2}>
          <Button color="gray" text="Cancel"/>
          <Button color="red" text="Delete forever"/>
        </Flex>
      }
      size="sm"
    >
      <Box padding={8}>
        <Text align="center" size="300">Once you delete a board and all its Pins, you can't undo it!</Text>
      </Box>
    </Modal>
  </Layer>
  );
}
    `}
          />
          <MainSection.Card
            title='role="dialog" (default)'
            cardSize="lg"
            iframeContent={`
              <iframe src="https://codesandbox.io/embed/fervent-rosalind-xrzm5?fontsize=14&hidenavigation=1&theme=light&view=preview"
              style={{width: '100%', height:'450px', border:'0', borderRadius: '4px', overflow:'hidden'}}
              title="Accessibility Role ex2"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            `}
            defaultCode={`
function DialogExample(props) {
  const ModalWithHeading = ({
    onDismiss,
  }) => {

    return (
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Create board"
        onDismiss={onDismiss}
        footer={
          <Flex alignItems="center" justifyContent="end">
            <Button color="red" text="Create"/>
          </Flex>
        }
        size="sm"
      >
        <Box paddingX={8}>
          <Box marginBottom={8}>
            <TextField
              id="name"
              onChange={({ value }) => console.log(value)}
              placeholder='Like "Places to go" or "Recipes to Make"'
              label="Name"
              type="text"
            />
          </Box>
          <Checkbox
            checked={false}
            id="secret"
            label="Keep this board secret"
            subtext="So only you and collaborators can see it."
            name="languages"
            onChange={({ checked }) => {
              console.log(checked);
            }}
          />
        </Box>
      </Modal>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        text="View Modal"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
        `}
          />
        </MainSection.Subsection>
      </MainSection>
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
            iframeContent={`
          <iframe src="https://codesandbox.io/embed/fervent-rosalind-xrzm5?fontsize=14&hidenavigation=1&theme=light&view=preview"
          style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
          title="Modal with Heading"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        `}
            defaultCode={`
function HeadingExample(props) {
  const ModalWithHeading = ({
    onDismiss,
  }) => {

    return (
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Create board"
        onDismiss={onDismiss}
        footer={
          <Flex alignItems="center" justifyContent="end">
            <Button color="red" text="Create"/>
          </Flex>
        }
        size="sm"
      >
        <Box paddingX={8}>
          <Box marginBottom={8}>
            <TextField
              id="name"
              onChange={({ value }) => console.log(value)}
              placeholder='Like "Places to go" or "Recipes to Make"'
              label="Name"
              type="text"
            />
          </Box>
          <Checkbox
            checked={false}
            id="secret"
            label="Keep this board secret"
            subtext="So only you and collaborators can see it."
            name="languages"
            onChange={({ checked }) => {
              console.log(checked);
            }}
          />
        </Box>
      </Modal>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        text="View Modal"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sub-heading"
          description={`The \`subHeading\` is a container that can be used for subtext that provides additional context for the Modal. The sub-heading locks to the top under the heading.`}
        >
          <MainSection.Card
            cardSize="lg"
            iframeContent={`
          <iframe src="https://codesandbox.io/embed/cool-hill-ngdjx?fontsize=14&hidenavigation=1&theme=light&view=preview"
          style={{width: '100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
          title="Modal with Sub Heading"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        `}
            defaultCode={`
function SubHeadingExample(props) {
  const ModalWithSubHeading = ({
    onDismiss,
  }) => {

    return (
      <Modal
        accessibilityModalLabel="Resume account creation"
        heading="Resume your work?"
        subHeading="Welcome back to the business account creation process!"
        align="start"
        onDismiss={onDismiss}
        footer={
          <Flex alignItems="center" justifyContent="end" gap={2}>
            <Button text="Cancel"/>
            <Button color="red" text="Resume"/>
          </Flex>
        }
        size="sm"
      >
        <Box paddingX={8}>
          <Text>Want to continue where you left off? Click "Resume" to continue creating your account or "Cancel" to start over.</Text>
        </Box>
      </Modal>
    );
  };

  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const modalZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        text="View Modal"
        onClick={() => setShouldShow(true)}
      />
      {shouldShow && (
        <Layer zIndex={modalZIndex}>
          <ModalWithSubHeading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sizes"
          description={`Modal has 3 size options: small (\`sm\` - 540px), medium (\`md\` - 720px) and large (\`lg\` - 900px). If absolutely necessary, a number representing a custom width can be provided instead, but we recommend using one of the standard sizes.
      All Modals have a max-width of 100%.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SizesExample(props) {
  function reducer(state, action) {
    switch (action.type) {
      case 'small':
        return {modal: 'small'};
      case 'medium':
        return {modal: 'medium'};
      case 'large':
        return {modal: 'large'};
      case 'none':
        return {modal: 'none'};
      default:
        throw new Error();
    }
  }

  const initialState = {modal: 'none'};
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Box padding={1}>
        <Button
          text="Small Modal"
          onClick={() => { dispatch({type: 'small'}) }}
        />
        {state.modal === 'small' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Small modal"
              onDismiss={() => { dispatch({type: 'none'}) }}
              footer={<Heading size="500">Footer</Heading>}
              size="sm"
            >
              <Box padding={8}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          text="Medium Modal"
          onClick={() => { dispatch({type: 'medium'}) }}
        />
        {state.modal === 'medium' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Medium modal"
              onDismiss={() => { dispatch({type: 'none'}) }}
              footer={<Heading size="500">Footer</Heading>}
              size="md"
            >
              <Box padding={8}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          text="Large Modal"
          onClick={() => { dispatch({type: 'large'}) }}
        />
        {state.modal === 'large' && (
          <Layer zIndex={zIndex}>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Large modal"
              onDismiss={() => { dispatch({type: 'none'}) }}
              footer={<Heading size="500">Footer</Heading>}
              size="lg"
            >
              <Box padding={8}>
                <Heading size="500">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Preventing close on outside click"
          description={`By default, users can click outside the Modal (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to false. In most cases, the user should be prevented from closing the Modal if the action is required.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function PreventCloseExample(props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        text="Open Modal"
        onClick={() => { setShowModal(!showModal) }}
      />
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Non closable modal"
            closeOnOutsideClick={false}
            heading="Heading"
            onDismiss={() => { setShowModal(!showModal) }}
          >
            <Box padding={8}>
              <Text align="center">Click on the button to close the modal</Text>
              <Box marginTop={4}>
                <Button color="red" text="Close" onClick={() => { setShowModal(!showModal) }} />
              </Box>
            </Box>
          </Modal>
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Sheet](/sheet)**
To allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page, use Sheet.

**[Toast](/toast)**
Toast provides temporary feedback on an interaction. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of blocking the entire page.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Modal' }) },
  };
}
