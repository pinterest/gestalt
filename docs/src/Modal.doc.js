// @flow
import React from 'react';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import Card from './components/Card';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Modal"
    description="Modals are light temporary views that are general purpose containers that allow for a multitude of design choices."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'accessibilityCloseLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the close button. Always localize the label.',
      },
      {
        name: 'accessibilityModalLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the modal. Always localize the label.',
      },
      {
        name: 'footer',
        type: 'React.Node',
      },
      {
        name: 'heading',
        type: `string`,
        required: true,
      },
      {
        name: 'onDismiss',
        type: '() => void',
        required: true,
      },
      {
        name: 'role',
        type: `"alertdialog" | "dialog"`,
        defaultValue: 'dialog',
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        defaultValue: 'sm',
        description: `sm: 414px, md: 544px, lg: 804px`,
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    name="Sizes"
    description={`
      There are 3 different widths available for a \`Modal\`. Click on each button
      to view a sample Modal of the specified size. All Modals have a max width of 100%.
    `}
    defaultCode={`
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleSmall = this._handleToggleSmall.bind(this);
    this.handleToggleMedium = this._handleToggleMedium.bind(this);
    this.handleToggleLarge = this._handleToggleLarge.bind(this);
    this.state = {
      sm: false,
      md: false,
      lg: false,
    };
  }

  _handleToggleSmall() {
    this.setState(prevState => ({ sm: !prevState.sm }));
  }

  _handleToggleMedium() {
    this.setState(prevState => ({ md: !prevState.md }));
  }

  _handleToggleLarge() {
    this.setState(prevState => ({ lg: !prevState.lg }));
  }

  render() {
    const { sm, md, lg } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <Button
            text="size='sm'"
            onClick={this.handleToggleSmall}
          />
          {sm && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Small modal"
              onDismiss={this.handleToggleSmall}
              footer={<Heading size="sm">Footer</Heading>}
              size="sm"
            >
              <Box padding={2}>
                <Heading size="sm">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
        <Box padding={1}>
          <Button
            text="size='md'"
            onClick={this.handleToggleMedium}
          />
          {md && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Medium modal"
              onDismiss={this.handleToggleMedium}
              footer={<Heading size="sm">Footer</Heading>}
              size="md"
            >
              <Box padding={2}>
                <Heading size="sm">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
        <Box padding={1}>
          <Button
            text="size='lg'"
            onClick={this.handleToggleLarge}
          />
          {lg && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Large modal"
              onDismiss={this.handleToggleLarge}
              footer={<Heading size="sm">Footer</Heading>}
              size="lg"
            >
              <Box padding={2}>
                <Heading size="sm">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    name="Default padding & styling"
    description={`
      Some of the padding required to style your modal has already been provided for ease of use. The modal shown
      by clicking on the "View padding" button highlights what the default behavior is. The two divider's between
      the \`heading\`, \`children\`, and \`footer\` are included as well.
    `}
    defaultCode={`
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this._handleToggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  _handleToggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { showModal } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <Button
            text="View padding"
            onClick={this.handleToggleModal}
          />
          {showModal && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Heading"
              onDismiss={this.handleToggleModal}
              footer={
                <Box color="gray">
                  <Heading size="sm">Footer</Heading>
                </Box>
              }
              size="md"
            >
              <Box color="gray" height={400}>
                <Heading size="sm">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    name="Alert Dialogs"
    description={`
      The \`alertdialog\` role is used to notify the user of urgent information that demands the user's immediate attention.
      We need to specify this role separately from other dialog's for accessibility.

      _Note: There are 3 small visual differences from the other Modal's we've seen so far. First, there is no cancel button in the top
      right, forcing the user to take an explicit action. Second, there is no divider between the heading, children,
      and footer. Finally, the heading's are larger and are left-aligned rather than centered._
    `}
    defaultCode={`
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this._handleToggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  _handleToggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { showModal } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <Button
            text="Block Chris"
            onClick={this.handleToggleModal}
          />
          {showModal && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="Would you like to block Chris?"
              heading="Block Chris?"
              onDismiss={this.handleToggleModal}
              footer={
                <Box
                  display="flex"
                  marginLeft={-1}
                  marginRight={-1}
                  justifyContent="end"
                >
                  <Box padding={1}>
                    <Button
                      size="lg"
                      text="Cancel"
                      onClick={this.handleToggleModal}
                    />
                  </Box>
                  <Box padding={1}>
                    <Button
                      size="lg"
                      color="red"
                      text="Block"
                      onClick={this.handleToggleModal}
                    />
                  </Box>
                </Box>
              }
              role="alertdialog"
              size="sm"
            >
              <Box paddingX={4} paddingY={2}>
                <Text>
                  You will not be able to follow each other or interact with each
                  others Pins.
                </Text>
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    );
  }
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
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this._handleToggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  _handleToggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { showModal } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <Button
            text="Edit board"
            onClick={this.handleToggleModal}
          />
          {showModal && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="Edit Julia's board"
              heading="Edit your board"
              onDismiss={this.handleToggleModal}
              footer={
                <Box
                  justifyContent="between"
                  display="flex"
                  direction="row"
                  marginLeft={-1}
                  marginRight={-1}
                >
                  <Box column={6} paddingX={1}>
                    <Button text="Delete Board" inline />
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
                        <Button text="Cancel" inline onClick={this.handleToggleModal} />
                      </Box>
                      <Box paddingX={1}>
                        <Button color="red" inline text="Save" />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              }
              size="md"
            >
              <Box display="flex" direction="row" position="relative">
                <Column span={12}>
                  <Box paddingY={2} paddingX={4} display="flex">
                    <Column span={4}>
                      <Label htmlFor="name">
                        <Text align="left" bold>
                          Name
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <TextField id="name" onChange={() => undefined} />
                    </Column>
                  </Box>
                  <Divider />
                  <Box paddingY={2} paddingX={4} display="flex">
                    <Column span={4}>
                      <Label htmlFor="desc">
                        <Text align="left" bold>
                          Description
                        </Text>
                      </Label>
                    </Column>
                    <Column span={8}>
                      <TextArea id="desc" onChange={() => undefined} />
                    </Column>
                  </Box>
                  <Divider />
                  <Box paddingY={2} paddingX={4} display="flex">
                    <Column span={4}>
                      <Label htmlFor="notifications">
                        <Text align="left" bold>
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
          )}
        </Box>
      </Box>
    );
  }
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
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleModal = this._handleToggleModal.bind(this);
    this.handleLoad = this._handleLoad.bind(this);
    this.state = {
      showModal: false,
      hasLoaded: false,
    };
  }

  _handleToggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal, hasLoaded: false }));
  }

  _handleLoad() {
    this.setState({ hasLoaded: true });
  }

  render() {
    const { hasLoaded, showModal } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <Button
            text="View images"
            onClick={this.handleToggleModal}
          />
          {showModal && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View random images"
              heading="Images"
              onDismiss={this.handleToggleModal}
              footer={
                <Box display="flex" direction="row" justifyContent="end">
                  <Button size="lg" text="Cancel" onClick={this.handleToggleModal} />
                </Box>
              }
              size="lg"
            >
              <Box display="flex" direction="row" justifyContent="center" alignItems="center">
                <Spinner
                  accessibilityLabel="random image"
                  show={!hasLoaded}
                />
                <img
                  alt=""
                  onLoad={this.handleLoad}
                  src="http://lorempixel.com/400/400"
                />
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    );
  }
}
`}
  />
);

card(
  <Card
    description={`
    We want to make sure every button on the page is unique when being read by screenreader.

    \`accessibilityCloseLabel\` allows us to specify text that is spoken for the close button<br>
    \`accessibilityModalLabel\` allows us to update the spoken text for the heading prop.

    ~~~html
    <Modal
      accessibilityCloseLabel="Close edit board modal"
      accessibilityModalLabel="Edit the details about your board House and Home"
      heading="Edit board"
      onDismiss={this.handleModalDismiss}
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
