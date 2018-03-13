// @flow
import React, { Component } from 'react';
import {
  Box,
  Button,
  Column,
  Divider,
  Label,
  Heading,
  Modal,
  SelectList,
  Spinner,
  Switch,
  Text,
  TextArea,
  TextField,
} from 'gestalt';
import PropTable from './components/PropTable';
import StateRecorder from './components/StateRecorder';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

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
  <StateRecorder
    description={`
    There are 3 different widths available for a \`Modal\`. Click on each button
    to view a sample Modal of the specified size. All Modals have a max width of 100%.

    ~~~html
    Widths:
    sm: 414px
    md: 544px
    lg: 804px
    ~~~
  `}
    name="Sizes"
    fn={atom => (
      <Box display="flex">
        <Box padding={2}>
          <Button
            text="size='sm'"
            onClick={() => atom.reset({ sm: !atom.deref().sm })}
          />
          {atom.deref().sm && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Small modal"
              onDismiss={() => atom.reset({ sm: false })}
              footer={<Heading size="sm">Footer</Heading>}
              size="sm"
            >
              <Box padding={2}>
                <Heading size="sm">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
        <Box padding={2}>
          <Button
            text="size='md'"
            onClick={() => atom.reset({ md: !atom.deref().md })}
          />
          {atom.deref().md && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Medium modal"
              onDismiss={() => atom.reset({ md: false })}
              footer={<Heading size="sm">Footer</Heading>}
              size="md"
            >
              <Box padding={2}>
                <Heading size="sm">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
        <Box padding={2}>
          <Button
            text="size='lg'"
            onClick={() => atom.reset({ lg: !atom.deref().lg })}
          />
          {atom.deref().lg && (
            <Modal
              accessibilityCloseLabel="close"
              accessibilityModalLabel="View default padding and styling"
              heading="Large modal"
              onDismiss={() => atom.reset({ lg: false })}
              footer={<Heading size="sm">Footer</Heading>}
              size="md"
            >
              <Box padding={2}>
                <Heading size="lg">Children</Heading>
              </Box>
            </Modal>
          )}
        </Box>
      </Box>
    )}
  />
);

card(
  <StateRecorder
    description={`
    Some of the padding required to style your modal has already been provided for ease of use. The modal shown
    by clicking on the "View padding" button highlights what the default behavior is. The two divider's between
    the \`heading\`, \`children\`, and \`footer\` are included as well.

    ~~~jsx
    <Modal
      accessibilityCloseLabel="close"
      accessibilityModalLabel="View default padding and styling"
      heading="Heading"
      onDismiss={() => this.setState({ isOpen: false })}
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
    ~~~
  `}
    name="Default padding & styling"
    fn={atom => (
      <Box>
        <Button
          size="lg"
          text="View padding"
          onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })}
        />
        {atom.deref().isOpen ? (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="View default padding and styling"
            heading="Heading"
            onDismiss={() => atom.reset({ isOpen: false })}
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
        ) : null}
      </Box>
    )}
  />
);

const alertModal = (
  <Box padding={2}>
    <Text>
      You will not be able to follow each other or interact with each others
      Pins.
    </Text>
  </Box>
);

function alertFooter(onClose) {
  return (
    <Box display="flex">
      <Box paddingY={1}>
        <Button size="lg" text="Cancel" onClick={onClose} />
      </Box>
      <Box paddingY={1}>
        <Button size="lg" color="red" text="Block" onClick={onClose} />
      </Box>
    </Box>
  );
}

card(
  <StateRecorder
    description={`
    The \`alertdialog\` role is used to notify the user of urgent information that demands the user's immediate attention.
    We need to specify this role separately from other dialog's for accessibility.

    _Note: There are 3 small visual differences from the other Modal's we've seen so far. First, there is no cancel button in the top
    right, forcing the user to take an explicit action. Second, there is no divider between the heading, children,
    and footer. Finally, the heading's are larger and are left-aligned rather than centered._
  `}
    name="Alert Dialogs"
    fn={atom => (
      <Box display="flex">
        <Button
          size="lg"
          text="Block Chris"
          onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })}
        />
        {atom.deref().isOpen && (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="Would you like to block Chris?"
            heading="Block Chris?"
            onDismiss={() => atom.reset({ isOpen: false })}
            footer={alertFooter(() => atom.reset({ isOpen: false }))}
            role="alertdialog"
            size="sm"
          >
            {alertModal}
          </Modal>
        )}
      </Box>
    )}
  />
);

const editBoard = (
  <Box display="flex" direction="row" position="relative">
    <Column xs={12}>
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="name">
            <Text align="left" bold>
              Name
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <TextField id="name" onChange={() => undefined} />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="desc">
            <Text align="left" bold>
              Description
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <TextArea id="desc" onChange={() => undefined} />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="category">
            <Text align="left" bold>
              Category
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <SelectList
            id="category"
            onChange={() => undefined}
            options={[{ label: 'food', value: 'Food' }]}
            value="food"
          />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="cover">
            <Text align="left" bold>
              Cover
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Button text="Cover" />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="secret">
            <Text align="left" bold>
              Secret
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Switch id="secret" onChange={() => undefined} />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="collabs">
            <Text align="left" bold>
              Collaborators
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <TextField
            id="collabs"
            onChange={() => undefined}
            placeholder="Name or email"
          />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="notifications">
            <Text align="left" bold>
              Email Notifications
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Switch id="notifications" onChange={() => undefined} switched />
        </Column>
      </Box>
      <Divider />
      <Box padding={2}>
        <Column xs={4}>
          <Label htmlFor="collabs">
            <Text bold align="left">
              Let collaborators add people
            </Text>
          </Label>
        </Column>
        <Column xs={8}>
          <Switch id="collabs" onChange={() => undefined} />
        </Column>
      </Box>
    </Column>
  </Box>
);

function editBoardFooter(onClose) {
  return (
    <Box justifyContent="between" display="flex" direction="row">
      <Column xs={6}>
        <Button text="Delete Board" />
      </Column>
      <Column xs={6}>
        <Box display="flex" direction="row" justifyContent="end">
          <Button text="Cancel" onClick={onClose} />
          <Button color="red" text="Save" />
        </Box>
      </Column>
    </Box>
  );
}

card(
  <StateRecorder
    description={`
    Here is an example of the \`Modal\` component with static content.

    ~~~jsx
    <Modal
      accessibilityCloseLabel="close"
      accessibilityModalLabel="Edit Julia's board"
      heading="Edit your board"
      onDismiss={() => this.setState({ isOpen: false })}
      footer={footerButtons}
      size="md"
    >
      {children}
    </Modal>
    ~~~
  `}
    name="Static Content Example"
    fn={atom => (
      <Box display="flex">
        <Button
          size="lg"
          text="Edit board"
          onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })}
        />
        {atom.deref().isOpen && (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="Edit Julia's board"
            heading="Edit your board"
            onDismiss={() => atom.reset({ isOpen: false })}
            footer={editBoardFooter(() => atom.reset({ isOpen: false }))}
            size="md"
          >
            {editBoard}
          </Modal>
        )}
      </Box>
    )}
  />
);

type State = {|
  hasLoaded: boolean,
|};

class ImageModalContents extends Component<{}, State> {
  state: State = {
    hasLoaded: false,
  };

  handleLoad = () => {
    this.setState({ hasLoaded: true });
  };

  image: ?HTMLElement;

  render() {
    return (
      <Box display="flex" direction="row">
        <Spinner
          accessibilityLabel="random image"
          show={!this.state.hasLoaded}
        />
        <div
          ref={c => {
            this.image = c;
          }}
        >
          <img
            alt=""
            onLoad={this.handleLoad}
            src="http://placebear.com/400/400"
          />
          <img
            alt=""
            onLoad={this.handleLoad}
            src="http://lorempixel.com/400/400"
          />
          <img
            alt=""
            onLoad={this.handleLoad}
            src="http://lorempixel.com/600/200"
          />
          <img
            alt=""
            onLoad={this.handleLoad}
            src="http://placebear.com/200/200"
          />
        </div>
      </Box>
    );
  }
}

function viewImagesFooter(onClose) {
  return (
    <Box display="flex" direction="row" justifyContent="end">
      <Button size="lg" text="Cancel" onClick={onClose} />
    </Box>
  );
}

card(
  <StateRecorder
    description={`
    Here is an example of the \`Modal\` component with dynamic children. You may want to display a \`Spinner\`
    while waiting for content to load. You can achieve this in a few ways. As shown in this example, the \`ImageModalContents\`
    component first renders a \`Spinner\` and then switches to the actual images once loaded. This results in
    the \`heading\` and \`footer\` being rendered prior to the content. You could also choose to display the
    \`Spinner\` while waiting for the contents to load and then only display the \`Modal\` once fully loaded.

    ~~~jsx
    <Modal
      accessibilityCloseLabel="close"
      accessibilityModalLabel="View random images"
      heading="Images"
      onDismiss={() => this.setState({ isOpen: false })}
      footer={footerButtons}
      size="lg"
    >
      <ImageModalContents />
    </Modal>
    ~~~
  `}
    name="Dynamic Content Example"
    fn={atom => (
      <Box display="flex">
        <Button
          size="lg"
          text="View images"
          onClick={() => atom.reset({ isOpen: !atom.deref().isOpen })}
        />
        {atom.deref().isOpen && (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="View random images"
            heading="Images"
            onDismiss={() => atom.reset({ isOpen: false })}
            footer={viewImagesFooter(() => atom.reset({ isOpen: false }))}
            size="lg"
          >
            <ImageModalContents />
          </Modal>
        )}
      </Box>
    )}
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

export default () => <CardPage cards={cards} />;
