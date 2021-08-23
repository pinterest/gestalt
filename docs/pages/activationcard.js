// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import CardPage from '../components/CardPage.js';
import { customNavigationDescription } from '../components/docsUtils.js';

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
          '{| accessibilityLabel: string , href: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }, {| disableOnNavigation: () => void |}) => void |}',
        required: false,
        defaultValue: null,
        description: [
          'Link-role button to render inside the activation card as a call-to-action to the user.',
          '- label: Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          '- accessibilityLabel: Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          '- onClick: Callback fired when the button component is clicked (pressed and released) with a mouse or keyboard. See [custom navigation](#Custom-navigation) variant for examples.',
        ],
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
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - Use in groups to describe the user's stage in a sequential path toward an overall action.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - As a single element communicating updates to the state or status of the surface. Use [Callout](/Callout) instead.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
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
      link={{
        href: "https://pinterest.com",
        label:"Claim your website now",
        accessibilityLabel: ""
      }}
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
      link={{
        href: "https://pinterest.com",
        label:"Learn more",
        accessibilityLabel: "Learn more: website claim status"
      }}
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
      link={{
        accessibilityLabel: "Learn more about tag health",
        href: "https://pinterest.com",
        label: "Learn more"
      }}
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
      description={customNavigationDescription('ActivationCard')}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [onNavigationMode, setOnNavigationMode] = React.useState('provider_disabled');

  const onNavigation = ({ href,target }) => {
    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('CUSTOM NAVIGATION set on <OnLinkNavigationProvider onNavigation/>. Disabled link: '+href+'. Opening business.pinterest.com instead.');
      window.open('https://business.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }
    return onNavigationClick;
  }

  const customOnNavigation = () => {
    // eslint-disable-next-line no-alert
    alert('CUSTOM NAVIGATION set on <ActivationCard link/>. Disabled link: https://pinterest.com. Opening help.pinterest.com instead.');
    window.open('https://help.pinterest.com', '_blank');
  }

  const onClickHandler = ({ event, disableOnNavigation }) => {
    if (onNavigationMode === 'provider_disabled') {
      disableOnNavigation()
    } else if (onNavigationMode === 'link_custom') {
      event.preventDefault();
      disableOnNavigation();
      customOnNavigation();
    }
  }

  const linkProps = {
    href:"https://pinterest.com",
    accessibilityLabel: "Learn more: claiming your website",
    onClick: onClickHandler,
    target:"blank",
  }

  return (
    <OnLinkNavigationProvider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation controller:</Text>
            <RadioButton
              checked={onNavigationMode === 'provider_disabled'}
              id="provider_disabled"
              label="Default navigation (disabled custom navigation set on OnLinkNavigationProvider)"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_disabled')}
              value="provider_disabled"
            />
            <RadioButton
              checked={onNavigationMode === 'provider_custom'}
              id="provider_custom"
              label="Custom navigation set on OnLinkNavigationProvider"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_custom')}
              value="provider_custom"
            />
            <RadioButton
              checked={onNavigationMode === 'link_custom'}
              id="link_custom"
              label="Custom navigation set on Link"
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
    </OnLinkNavigationProvider>
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
**[OnLinkNavigationProvider](/OnLinkNavigationProvider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
See [custom navigation](#Custom-navigation) variant for examples.
      `}
    />
  </MainSection>,
);

export default function ActivationCardPage(): Node {
  return <CardPage cards={cards} page="ActivationCard" />;
}
