// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ActivationCard"
    description="Activation cards are used in groups to communicate a user’s stage in a series of steps toward an overall action."
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
          'Text to render inside the activation card to convey detailed information to the user. The message text has a fixed size.',
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
        name: 'link',
        type:
          '{| accessibilityLabel?: string , href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, customOnNavigation: "disabled" | ({| href: string, onClick?: ({| event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> |}) => void,  target?: null | "self" | "blank" |}) => ({| event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> |}) => void',
        required: false,
        defaultValue: null,
        description: [
          'Link-role button to render inside the activation card as a call-to-action to the user.',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard.',
          '- customOnNavigation: Provides custom control on the link functionality. Overrides or disables onNavigation logic set by Provider. See [custom navigation](#Custom-navigation) variant for examples.',
        ],
        href: 'Custom-navigation',
      },
      {
        name: 'status',
        type: `"notStarted" | "pending" | "needsAttention" | "complete"`,
        required: true,
        defaultValue: null,
        description: [
          'Select the activation card status:',
          '-`notStarted`: A task that has not be started',
          '-`pending`: A task that is pending action',
          "-`needsAttention`: A task that requires the user's attention",
          '-`complete`: A task that has been completed',
        ],
        href: '',
      },
      {
        name: 'statusMessage',
        type: 'string',
        required: true,
        defaultValue: null,
        description: ['A message to indicate the current status of the activation card.'],
        href: '',
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Heading to render inside the activation card above the message to convey the activation card topic to the user.',
        ],
        href: '',
      },
    ]}
  />,
);

card(
  <Example
    name="Not started and Pending Cards"
    defaultCode={`
<Box display="flex" marginStart={-1} marginEnd={-1}>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="notStarted"
      statusMessage="Not started"
      title="Claim your website"
      message="Grow distribution and track Pins linked to your website"
      link={{href: "https://pinterest.com", label:"Claim your website now"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: ()=>{},
      }}
    />
  </Box>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="pending"
      statusMessage="Pending"
      title="Claim your website"
      message="We will notify you via email as soon as your site has been successfully claimed."
      link={{href: "https://pinterest.com", label:"Learn more"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: ()=>{},
      }}
    />
  </Box>
</Box>
  `}
  />,
);

card(
  <Example
    name="Needs attention and Complete Cards"
    defaultCode={`
<Box display="flex" marginStart={-1} marginEnd={-1}>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="needsAttention"
      statusMessage="Needs attention"
      title="Tag is unhealthy"
      message="Oops! Your tag must be healthy to continue."
      link={{accessibilityLabel:"Learn more about tag health", href: "https://pinterest.com", label:"Learn more"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss card',
        onDismiss: ()=>{},
      }}
    />
  </Box>
  <Box paddingX={1} column={6}>
    <ActivationCard
      status="complete"
      statusMessage="Completed"
      title="Nice work"
      message="Tag is installed and healthy"
    />
  </Box>
</Box>
  `}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Custom navigation"
      description={`
These examples illustrate a custom navigation implementation to externally control the link functionality within ActivationCard.

If passed to Provider's \`onNavigation\` prop, \`useCustomOnNavigationProvider\`, a high-order function, is passed down to ActivationCard where it's executed. Then, \`onNavigation\` returns a function that gets called during the \`onClick\` event handler.

The \`useCustomOnNavigationProvider\` function can contain complex logic, including [React hooks](https://reactjs.org/docs/hooks-reference.html), to perform side effects. It takes named arguments: \`href\`, \`onClick\` and \`target\`.

In the examples below, \`useCustomOnNavigationProvider\` executes the following actions:
- Disable the default link behavior
- Show an alert message
- Open a different URL in a new window

Finally, \`useCustomOnNavigationLink\` gets passed to ActivationCard using the \`customOnNavigation\` prop. It has the same structure as \`useCustomOnNavigationProvider\`. ActivationCard's \`customOnNavigation\` prop also takes "disabled" to disable the Provider's \`onNavigation\` prop logic and restore the default link behaviour.

The returned \`onNavigationClick\` function inside both hook functions uses the event access to [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault). It could also be used to [stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).
      `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [onNavigationMode, setOnNavigationMode] = React.useState('provider_disabled');

  const useCustomOnNavigationProvider = ({ href, target }) => {

    const onNavigationClick = ({ event }) => {
      event.nativeEvent.preventDefault();
      // eslint-disable-next-line no-alert
      alert('CUSTOM NAVIGATION set on <Provider onNavigation/>. Disabled link: '+href+'. Opening business.pinterest.com instead.');
      window.open('https://business.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }
    return onNavigationClick;
  }

  const useCustomOnNavigationLink = ({ href, target }) => {

    const onNavigationClick = ({ event }) => {
      event.nativeEvent.preventDefault();
      // eslint-disable-next-line no-alert
      alert('CUSTOM NAVIGATION set on <ActivationCard link/>. Disabled link: '+href+'. Opening help.pinterest.com instead.');
      window.open('https://help.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }
    return onNavigationClick;
  }

  let customOnNavigation;

  if (onNavigationMode === 'provider_disabled') {
    customOnNavigation = "disabled";
  }

  if (onNavigationMode === 'link_custom') {
    customOnNavigation = useCustomOnNavigationLink;
  }

  const linkProps = {
    href:"https://pinterest.com",
    customOnNavigation,
    target:"blank",
  }

  return (
    <Provider onNavigation={useCustomOnNavigationProvider}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation Controller:</Text>
            <RadioButton
              checked={onNavigationMode === 'provider_disabled'}
              id="provider_disabled"
              label="Default Navigation (disabled Custom Navigation set on Provider)"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_disabled')}
              value="provider_disabled"
            />
            <RadioButton
              checked={onNavigationMode === 'provider_custom'}
              id="provider_custom"
              label="Custom Navigation set on Provider"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_custom')}
              value="provider_custom"
            />
            <RadioButton
              checked={onNavigationMode === 'link_custom'}
              id="link_custom"
              label="Custom Navigation set on Button"
              name="navigation"
              onChange={() => setOnNavigationMode('link_custom')}
              value="link_custom"
            />
          <Divider/>
        </Flex>
        <ActivationCard
          status="notStarted"
          statusMessage="Not started"
          title="Claim your website"
          message="Grow distribution and track Pins linked to your website"
          link={{
            ...linkProps,
            label: 'Claim your website now'
          }}
          dismissButton={{
            accessibilityLabel: 'Dismiss card',
            onDismiss: ()=>{},
          }}
        />
      </Flex>
    </Provider>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[Provider](/Provider)**
Provider allows external link navigation control across all children components with link behavior. ActivationCard's \`customOnNavigation\` prop can override or disable the Provider navigation logic.
See [custom navigation](#Custom-navigation) variant for examples.
      `}
    />
  </MainSection>,
);

export default cards;
