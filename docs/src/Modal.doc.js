// @flow strict
import React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Modal"
    description="Modals are light temporary views; general purpose containers allowing for a multitude of design choices."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityModalLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the modal. Always localize the label.',
        href: 'accessibility',
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'closeOnOutsideClick',
        type: 'boolean',
        description: 'Close the modal when you click outside of it',
        defaultValue: true,
      },
      {
        name: 'footer',
        type: 'React.Node',
        href: 'sizesExample',
      },
      {
        name: 'heading',
        type: `string | React.Node`,
        required: false,
        href: 'heading',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
        href: 'sizesExample',
      },
      {
        name: 'role',
        type: `"alertdialog" | "dialog"`,
        defaultValue: 'dialog',
        href: 'role',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg" | number`,
        defaultValue: 'sm',
        description: `sm: 540px, md: 720px, lg: 900px`,
        href: 'sizesExample',
      },
    ]}
  />
);

card(
  <Example
    id="sizesExample"
    name="Sizes"
    description={`
      There are 3 different pre-selected widths available for a \`Modal\`, as well as a last-resort
      option to set a custom width. Click on each button to view a sample Modal of the specified size.
      All Modals have a max width of 100%.
    `}
    defaultCode={`
function Example(props) {
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

  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="size='sm'"
          onClick={() => { dispatch({type: 'small'}) }}
        />
        {state.modal === 'small' && (
          <Layer>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Small modal"
              onDismiss={() => { dispatch({type: 'none'}) }}
              footer={<Heading size="md">Footer</Heading>}
              size="sm"
            >
              <Box padding={8}>
                <Heading size="md">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          text="size='md'"
          onClick={() => { dispatch({type: 'medium'}) }}
        />
        {state.modal === 'medium' && (
          <Layer>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Medium modal"
              onDismiss={() => { dispatch({type: 'none'}) }}
              footer={<Heading size="md">Footer</Heading>}
              size="md"
            >
              <Box padding={8}>
                <Heading size="md">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
      </Box>
      <Box padding={1}>
        <Button
          text="size='lg'"
          onClick={() => { dispatch({type: 'large'}) }}
        />
        {state.modal === 'large' && (
          <Layer>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Large modal"
              onDismiss={() => { dispatch({type: 'none'}) }}
              footer={<Heading size="md">Footer</Heading>}
              size="lg"
            >
              <Box padding={8}>
                <Heading size="md">Children</Heading>
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
);

card(
  <Example
    name="Default padding &amp; styling"
    description={`
      Some of the padding required to style your modal has already been provided for ease of use. The modal shown
      by clicking on the "View padding" button highlights the default behavior. The shadow (when scrolling) between
      the \`heading\`, \`children\`, and \`footer\` are included as well.
    `}
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="View padding"
          onClick={() => { setShowModal(!showModal) }}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="View default padding and styling"
              heading="Heading"
              onDismiss={() => { setShowModal(!showModal) }}
              footer={
                <Box color="lightGray">
                  <Heading size="md">Footer</Heading>
                </Box>
              }
              size="md"
            >
              <Box>
                <Heading size="md">Children</Heading>
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
);

card(
  <Example
    id="heading"
    name="Custom heading"
    description="
      If you need more control over the Modal heading besides a wrapped and centered text element,
      you can pass a custom React node as the heading prop and the Modal will render that instead.
    "
    defaultCode={`
function HeadingExample(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleChangeTab = ({ activeTabIndex, event }) => {
    event.preventDefault();
    setActiveTabIndex(activeTabIndex);
  }

  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="View heading"
          onClick={() => { setShowModal(!showModal) }}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="View custom modal heading"
              heading={
                <Box padding={8}>
                  <Tabs
                    tabs={[
                      {
                        text: "Boards",
                        href: "#"
                      },
                      {
                        text: "Pins",
                        href: "#"
                      },
                      {
                        text: "Topics",
                        href: "#"
                      }
                    ]}
                    activeTabIndex={activeTabIndex}
                    onChange={handleChangeTab}
                  />
                </Box>
              }
              onDismiss={() => { setShowModal(!showModal) }}
              footer={
                <Box color="lightGray">
                  <Heading size="md">Footer</Heading>
                </Box>
              }
              size="md"
            >
              <Box color="lightGray" minHeight={400}>
                <Heading size="md">Children</Heading>
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
);

card(
  <Example
    id="role"
    name="Alert Dialogs"
    description={`
      The \`alertdialog\` role is used to notify the user of urgent information that demands the user's immediate attention.
      We need to specify this role separately from other dialogs for accessibility.
    `}
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="Block Chris"
          onClick={() => { setShowModal(!showModal) }}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="Would you like to block Chris?"
              heading="Block Chris?"
              onDismiss={() => { setShowModal(!showModal) }}
              footer={
                <Box
                  display="flex"
                  marginLeft={-1}
                  marginRight={-1}
                  justifyContent="center"
                >
                  <Box padding={1}>
                    <Button
                      size="lg"
                      text="Cancel"
                      onClick={() => { setShowModal(!showModal) }}
                    />
                  </Box>
                  <Box padding={1}>
                    <Button
                      size="lg"
                      color="red"
                      text="Block"
                      onClick={() => { setShowModal(!showModal) }}
                    />
                  </Box>
                </Box>
              }
              role="alertdialog"
              size="sm"
            >
              <Box paddingX={8}>
                <Text align="center">
                  You will not be able to follow each other or interact with each
                  others Pins.
                </Text>
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
);

card(
  <Example
    name="Static Content Example"
    description={`
      Here is an example of the \`Modal\` component with static content.
    `}
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="Edit board"
          onClick={() => { setShowModal(!showModal) }}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="Edit Julia's board"
              heading="Edit your board"
              onDismiss={() => { setShowModal(!showModal) }}
              footer={
                <Box
                  justifyContent="between"
                  display="flex"
                  direction="row"
                  marginLeft={-1}
                  marginRight={-1}
                >
                  <Box column={6} paddingX={1}>
                    <Button text="Delete Board" inline size="lg" />
                  </Box>
                  <Box column={6} paddingX={1}>
                    <Box
                      display="flex"
                      direction="row"
                      justifyContent="end"
                      marginLeft={-1}
                      marginRight={-1}
                    >
                      <Box paddingX={1}>
                        <Button text="Cancel" inline onClick={() => { setShowModal(!showModal) }} size="lg" />
                      </Box>
                      <Box paddingX={1}>
                        <Button color="red" inline text="Save" size="lg" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              }
              size="md"
            >
              <Box display="flex" direction="row" position="relative">
                <Column span={12}>
                  <Box paddingY={2} paddingX={8} display="flex">
                    <Column span={4}>
                      <Label htmlFor="name">
                        <Text align="left" weight="bold">
                          Name
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <TextField id="name" onChange={() => undefined} />
                    </Column>
                  </Box>
                  <Box paddingY={2} paddingX={8} display="flex">
                    <Column span={4}>
                      <Label htmlFor="desc">
                        <Text align="left" weight="bold">
                          Description
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <TextArea id="desc" onChange={() => undefined} />
                    </Column>
                  </Box>
                  <Box paddingY={2} paddingX={8} display="flex">
                    <Column span={4}>
                      <Label htmlFor="notifications">
                        <Text align="left" weight="bold">
                          Email Notifications
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <Switch id="notifications" onChange={() => undefined} switched />
                    </Column>
                  </Box>
                </Column>
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
);

card(
  <Example
    name="Dynamic Content Example"
    description={`
      Here is an example of the \`Modal\` component with dynamic children. You may want to display a \`Spinner\`
      while waiting for content to load. You can achieve this in a few ways. As shown in this example, the \`ImageModalContents\`
      component first renders a \`Spinner\` and then switches to the actual images once loaded. This results in
      the \`heading\` and \`footer\` being rendered prior to the content. You could also choose to display the
      \`Spinner\` while waiting for the contents to load and then only display the \`Modal\` once fully loaded.
    `}
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
    setHasLoaded(false);
  }

  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="View images"
          onClick={handleToggleModal}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="View random images"
              heading="Images"
              onDismiss={handleToggleModal}
              footer={
                <Box display="flex" direction="row" justifyContent="end">
                  <Button size="lg" text="Cancel" onClick={handleToggleModal} />
                </Box>
              }
              size="lg"
            >
              <Box display="flex" direction="row" justifyContent="center" alignItems="center">
                <Spinner
                  accessibilityLabel="random image"
                  show={!hasLoaded}
                />
                <Box maxWidth={400} width="100%">
                  <Image
                    alt="LandScape"
                    onLoad={() => { setHasLoaded(true) }}
                    src="https://i.picsum.photos/id/1000/5626/3635.jpg"
                    naturalHeight={3635}
                    naturalWidth={5626}
                  />
                </Box>
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
);

card(
  <Example
    name="Flyout inside of Modal Example"
    description="Opens a Flyout inside of a Modal and verifies that outside events work as expected with portals"
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [showFlyout, setShowFlyout] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box marginLeft={-1} marginRight={-1}>
      <Box padding={1}>
        <Button
          text="View Modal"
          onClick={() => setShowModal(true)}
        />
        {showModal && (
          <Layer>
            <Modal
              accessibilityModalLabel="View flyout modal"
              heading="Modal"
              onDismiss={() => {
                setShowFlyout(false);
                setShowModal(false)
              }}
            >
              <Box margin={4} ref={anchorRef}>
                <Button text="Open Flyout" onClick={() => setShowFlyout(true)} />
              </Box>
              {showFlyout && (
                <Layer>
                  <Flyout
                    anchor={anchorRef.current}
                    color="blue"
                    idealDirection="up"
                    onDismiss={() => setShowFlyout(false)}
                    positionRelativeToAnchor={false}
                    showCaret
                    shouldFocus={false}
                    size="md"
                  >
                    <Box padding={3}>
                      <Text color="white" weight="bold">
                        This flyout is in a React portal.
                      </Text>
                      <Box marginTop={3}>
                        <Button text="Click me and the modal should not close" />
                      </Box>
                    </Box>
                  </Flyout>
                </Layer>
              )}
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
`}
  />
);

card(
  <Card
    id="accessibility"
    description={`
    We want to make sure every button on the page is unique when being read by screenreader.

    \`accessibilityModalLabel\` allows us to update the spoken text for the heading prop.

    ~~~html
    <Modal
      accessibilityModalLabel="Edit the details about your board House and Home"
      heading="Edit board"
      onDismiss={handleModalDismiss}
      footer={<Footer />}
      size="lg"
    >
      {children}
    </Modal>
    ~~~
  `}
    name="Accessibility Props"
  />
);

export default cards;
