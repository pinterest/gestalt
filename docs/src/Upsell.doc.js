// @flow strict
import React, { type Node } from 'react';
import { Upsell } from 'gestalt';
import Card from './components/Card.js';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Upsell"
    description="Upsells are banners that display short messages that focus on selling or upgrading something the user already has."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'message',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Text to render inside the Upsell to convey detailed information to the user. The message text has a fixed size.',
        ],
        href: '',
      },
      {
        name: 'children',
        type: 'typeof UpsellForm',
      },
      {
        name: 'dismissButton',
        type: '{| accessibilityLabel: string, onDismiss: () => void, |}',
        required: false,
        defaultValue: null,
        description: [
          'Callback fired when the dismiss button is clicked (pressed and released) with a mouse or keyboard.',
          'Supply a short, descriptive label for screen-readers to provide sufficient context about the dismiss button action. IconButtons do not render text for screen readers to read requiring an accessibility label.',
          'Accessibility: `accessibilityLabel` populates aria-label.',
        ],
        href: '',
      },
      {
        name: 'imageData',
        type:
          '{| component: typeof Image | typeof Icon, width?: number, mask: { rounding: "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, wash: boolean} |}',
        required: false,
        defaultValue: null,
        description: [
          'Either `<Image />` or `<Icon />` to render on left side of banner. Width is not used with Icon. Image width defaults to 128 px. Max width of image is 128 px.',
        ],
        href: 'Image',
      },
      {
        name: 'primaryAction',
        type:
          '{| accessibilityLabel?: string , href?: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, onNavigationOptions: ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void',
        required: false,
        defaultValue: null,
        description: [
          'Button to render inside the callout as the main call-to-action to the user. The label text has a fixed size.',
          '- href: If href is supplied, the action will serve as a link, while if no href is supplied, the action will be a button',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          `- onNavigationOptions: onNavigationOptions works in conjunction with a Provider. Pass custom props to onNavigation. See Provider for examples. onNavigation's type is flexible. Each key's value is a React.Node or an event handler function. Optional with href.`,
          'Accessibility: `accessibilityLabel` populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the button `text`.',
        ],
        href: '',
      },
      {
        name: 'secondaryAction',
        type:
          '{| accessibilityLabel?: string , href?: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, onNavigationOptions: ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void, rel: "none" | "nofollow", target: "null" | "self" | "blank" |}',
        required: false,
        defaultValue: null,
        description: [
          'Button to render inside the callout as the secondary call-to-action to the user. The label text has a fixed size.',
          '- href: If href is supplied, the action will serve as a link, while if no href is supplied, the action will be a button',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          `- onNavigationOptions: onNavigationOptions works in conjunction with a Provider. Pass custom props to onNavigation. See Provider for examples. onNavigation's type is flexible. Each key's value is a React.Node or an event handler function. Optional with href.`,
          'Accessibility: `accessibilityLabel` populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of the button `text`.',
        ],
        href: '',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Heading to render inside the Upsell above the message to convey the Upsell topic to the user. The message text has a fixed size.',
        ],
        href: '',
      },
    ]}
  />,
);

card(
  <Example
    name="Simple message"
    defaultCode={`
<Upsell
  message="Single line upsell with no title or call to action."
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
/>
  `}
  />,
);

card(
  <Example
    name="Icon"
    defaultCode={`
<Upsell
  title="Give $30, get $60 in ads credit"
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{href: "https://pinterest.com", label:"Send invite"}}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
  }}
/>
`}
  />,
);

card(
  <Example
    name="Image"
    defaultCode={`
<Upsell
  title="Stay healthy and safe"
  message="Check out our resources for adapting to these times."
  primaryAction={{href: "https://pinterest.com", label:"Visit"}}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
  imageData={{
      component:
        <Image
          alt="Succulent plant against pink background"
          color="rgb(231, 186, 176)"
          naturalHeight={751}
          naturalWidth={564}
          src="https://i.ibb.co/7bQQYkX/stock2.jpg"
        />,
        mask: {rounding: 4},
      width: 128,
    }}
/>
`}
  />,
);

card(
  <Example
    name="Link Call to Actions"
    description={`
      When \`href\` is supplied to \`primaryAction\` and \`secondaryAction\` the action button defaults to a link-role button.
    `}
    defaultCode={`
<Upsell
  title="Join the Verified Merchant Program"
  message="Apply to the Verified Merchant Program—it’s free"
  primaryAction={{href: "https://pinterest.com", label:"Apply now"}}
  secondaryAction={{href: "https://pinterest.com", label:"Learn more"}}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: ()=>{},
  }}
/>
`}
  />,
);

card(
  <Example
    name="Button Call to Actions"
    description={`
      \`primaryAction\` and \`secondaryAction\` can be used as buttons when no \`href\` is supplied.
    `}
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Upsell
        title="Give $30, get $60 in ads credit"
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{onClick: () => { setShowModal(!showModal) }, label:"Send invite"}}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: ()=>{},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
        }}
      />
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Would you like to sign up"
            heading="Invite Friends?"
            onDismiss={() => { setShowModal(!showModal) }}
            footer={
              <Box
                display="flex"
                justifyContent="center"
              >
                <ButtonGroup>
                  <Button
                    size="lg"
                    text="Cancel"
                    onClick={() => { setShowModal(!showModal) }}
                  />
                  <Button
                    size="lg"
                    color="red"
                    text="Sign up"
                    onClick={() => { setShowModal(!showModal) }}
                  />
                </ButtonGroup>
              </Box>
            }
            role="alertdialog"
            size="sm"
          >
            <Box paddingX={8}>
              <Text align="center">
                When your friend spends their first $30 on ads, you’ll earn $60 of ads credit, and they’ll get $30 of ads credit, too
              </Text>
            </Box>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}
`}
  />,
);

card(
  <Card
    name="Upsell.Form"
    description="Upsell.Form can be used to include form fields and a submit button within Upsell."
  />,
);

card(
  <PropTable
    name="Upsell.Form"
    id="Upsell.Form"
    Component={Upsell?.Form}
    props={[
      {
        name: 'children',
        type: 'React.Node',
        required: true,
      },
      {
        name: 'onSubmit',
        type:
          '({| event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> |}) => void',
        required: true,
      },
      {
        name: 'submitButtonText',
        type: 'string',
        required: true,
      },
      {
        name: 'submitButtonAccessibilityLabel',
        type: 'string',
        required: true,
      },
      {
        name: 'submitButtonDisabled',
        type: 'boolean',
      },
    ]}
  />,
);

card(
  <Example
    id="formExample"
    name="Example: Upsell with Form"
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');
  return (
    <Upsell
      title="Give $30, get $60 in ads credit"
      message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: ()=>{},
      }}
      imageData={{
        component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
      }}
    >
      <Upsell.Form
        onSubmit={(event) => {event.preventDefault();}}
        submitButtonText="Submit"
        submitButtonAccessibilityLabel="Submit name for ads credit"
      >
        <TextField
          id="nameField"
          onChange={({ value }) => setValue(value)}
          placeholder="Name"
          value={value}
        />
      </Upsell.Form>
    </Upsell>
  );
}
`}
  />,
);

card(
  <Example
    id="twoFormsExample"
    name="Example: Upsell with Form- 2 TextFields"
    defaultCode={`
function Example(props) {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  return (
    <Upsell
      title="Interested in a free ads consultation?"
      message="Learn how to grow your business with a Pinterest ads expert today!"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: ()=>{},
      }}
      imageData={{
        component:
          <Image
            alt="Succulent plant against pink background"
            color="rgb(231, 186, 176)"
            naturalHeight={751}
            naturalWidth={564}
            src="https://i.ibb.co/7bQQYkX/stock2.jpg"
          />,
          mask: {rounding: 4},
        width: 128,
      }}
    >
      <Upsell.Form
        onSubmit={(event) => {event.preventDefault();}}
        submitButtonText="Contact me"
        submitButtonAccessibilityLabel="Submit info for contact"
      >
        <Box display="block" smDisplay="flex">
          <Box
            flex="grow"
            smMarginEnd={1}
            marginEnd={0}
            smMarginBottom={0}
            marginBottom={2}
          >
            <TextField
              id="name"
              onChange={({ value }) => setNameValue(value)}
              placeholder="Name"
              value={nameValue}
            />
          </Box>
          <Box flex="grow" smMarginStart={1} marginStart={0}>
            <TextField
              id="email"
              onChange={({ value }) => setEmailValue(value)}
              placeholder="Email"
              type="email"
              value={emailValue}
            />
          </Box>
        </Box>
      </Upsell.Form>
    </Upsell>
  );
}
`}
  />,
);

export default cards;
