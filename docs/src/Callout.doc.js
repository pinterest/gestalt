// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Callout"
    description="Callouts are banners that display short messages that are either helpful information to a task on the page or require user attention."
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
          'Text to render inside the callout to convey detailed information to the user. The message text has a fixed size.',
        ],
        href: '',
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
        name: 'iconAccessibilityLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to provide sufficient context about the callout intent.',
          'The callout component displays `error`, `info`, or `warning` icons which visually indicate the intent of the component. `iconAccessibilityLabel` allows screen readers to communicate that intent.',
          'Accessibility: It populates aria-label.',
        ],
        href: '',
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
          '{| accessibilityLabel?: string , href?: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, onNavigationOptions: ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void',
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
        name: 'type',
        type: `"error" | "info" | "warning"`,
        required: true,
        defaultValue: null,
        description: [
          'Select a type of callout:',
          '-`error`: To provide error messaging to the user.',
          '-`info`: To provide general information to the user.',
          '-`warning`: To provide a warn message to the user.',
        ],
        href: '',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Heading to render inside the callout above the message to convey the callout topic to the user. The message text has a fixed size.',
        ],
        href: '',
      },
    ]}
  />,
);

card(
  <Example
    name="Info Example"
    defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info icon"
  title="Your business account was created!"
  message="Apply to the Verified Merchant Program!"
  primaryAction={{href: "https://pinterest.com", label:"Get started"}}
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
    name="Warning Example"
    defaultCode={`
<Callout
  type="warning"
  iconAccessibilityLabel="Warning icon"
  message="This feature will be removed in two weeks."
  primaryAction={{href: "https://pinterest.com", label:"Learn more"}}
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
    name="Error Example"
    defaultCode={`
<Callout
  type="error"
  iconAccessibilityLabel="Error icon"
  message="This action can't be undone."
/>
  `}
  />,
);

card(
  <Example
    name="Example with button call-to-action"
    description={`
      \`primaryAction\` and \`secondaryAction\` can be used as buttons when no \`href\` is supplied.
    `}
    defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Callout
        type="info"
        iconAccessibilityLabel="Info icon"
        title="Your board was created!"
        message="You can edit your board at anytime!"
        primaryAction={{
          label:"Edit board", role: "button",
          onClick: () => { setShowModal(!showModal) }
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: ()=>{},
        }}
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
                marginStart={-1}
                marginEnd={-1}
              >
                <Box column={12} smColumn={6} paddingX={1}>
                  <Button text="Delete Board" inline size="lg" />
                </Box>
                <Box column={12} smColumn={6} paddingX={1}>
                  <Box
                    display="flex"
                    justifyContent="end"
                  >
                    <ButtonGroup>
                      <Button text="Cancel" inline onClick={() => { setShowModal(!showModal) }} size="lg" />
                      <Button color="red" inline text="Save" size="lg" />
                    </ButtonGroup>
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
  );
}
`}
  />,
);

export default cards;
