// @flow strict
import type { Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import { customNavigationDescription } from './components/docsUtils.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Callout"
    description="Callout is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention."
    defaultCode={`
    <Callout
      type="info"
      iconAccessibilityLabel="Info"
      title="Your business account was created!"
      message="Apply to the Verified Merchant Program"
      primaryAction={{href: "https://pinterest.com", label: "Get started", target: "blank", accessibilityLabel: "Get started: Verified Merchant Program"}}
      secondaryAction={{href: "https://pinterest.com", label: "Learn more", target: "blank", accessibilityLabel: "Learn more: Verified Merchant Program"}}
      dismissButton={{
        accessibilityLabel: 'Dismiss this banner',
        onDismiss: ()=>{},
      }}
    />
    `}
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
        description: `
          Main content of Callout. Content should be [localized](#Localization).
          See [Best Practices](#Best-practices) for more info.`,
      },
      {
        name: 'dismissButton',
        type: '{| accessibilityLabel: string, onDismiss: () => void, |}',
        defaultValue: null,
        description: `
          Adds a dismiss button to Callout. See the [Dismissible variant](#Dismissible) for more info.
          The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).`,
      },
      {
        name: 'iconAccessibilityLabel',
        type: 'string',
        required: true,
        defaultValue: null,
        description: `
          Label to describe the icon’s purpose. See the [Accessibility guidelines](#Accessibility) for details on proper usage.
        `,
      },
      {
        name: 'primaryAction',
        type:
          '{| accessibilityLabel: string, href?: string, label: string, onClick?: AbstractEventHandler<| SyntheticMouseEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLButtonElement>, {| disableOnNavigation: () => void |}',
        required: false,
        defaultValue: null,
        description: `
          Main action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. See [custom navigation](#Custom-navigation) variant for examples.
          If no \`href\` is supplied, the action will be a button.
          The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
        `,
      },
      {
        name: 'secondaryAction',
        type:
          '{| accessibilityLabel: string, href?: string, label: string, onClick?: AbstractEventHandler<| SyntheticMouseEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLButtonElement>, {| disableOnNavigation: () => void |}',
        required: false,
        defaultValue: null,
        description: `
          Secondary action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. See [custom navigation](#Custom-navigation) variant for examples.
          If no \`href\` is supplied, the action will be a button.
          The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
        `,
      },
      {
        name: 'type',
        type: `"error" | "info" | "warning"`,
        required: true,
        defaultValue: null,
        description: `
        The category of Callout. See the [Variants](#Variants) to learn more.
        `,
      },
      {
        name: 'title',
        type: 'string',
        defaultValue: null,
        description: `Brief title summarizing Callout. Content should be [localized](#Localization).`,
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        type="do"
        description="Use Callouts for messages coming from the product or user interaction. Can be used in both Business and Pinner products."
        defaultCode={`
          <Callout
            type="error"
            title="Pinterest tag needs attention"
            iconAccessibilityLabel="Error"
            message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
            primaryAction={{
              href: "https://pinterest.com",
              label: "Fix tag",
              target: "blank",
              accessibilityLabel: 'Fix Pinterest Tag'
            }}
          />
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="do"
        description={`
        Place Callout at the top of the page under the primary navigation or page header when possible.
        `}
        defaultCode={`
          <Box>
            <Box marginBottom={4} display="flex" alignItems="center">
              <Icon accessibilityLabel="" icon="pinterest" color="red" size={32}/>
              <ButtonGroup>
                <Button color="transparent" iconEnd="arrow-down" text="Business" inline />
                <Button color="transparent" iconEnd="arrow-down" text="Create" inline />
                <Button color="transparent" iconEnd="arrow-down" text="Analytics" inline />
                <Button color="transparent" iconEnd="arrow-down" text="Ads" inline />
              </ButtonGroup>
            </Box>
            <Divider/>
            <Box marginTop={8}>
              <Callout
                type="info"
                iconAccessibilityLabel="Info"
                title="We have not yet detected your tag"
                message="It may take up to 10 minutes to automatically detect a newly installed tag. If you'd like to manually verify your tag, please click the Verify Tag button."
                primaryAction={{label: "Verify Tag", accessibilityLabel: "Manually verify tag"}}
                dismissButton={{
                  accessibilityLabel: 'Dismiss this banner',
                  onDismiss: ()=>{},
                }}
              />
            </Box>
          </Box>
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="don't"
        description={`
        Use Callouts for marketing new products or features. Use [Upsell](/Upsell) instead.
        `}
        defaultCode={`
          <Callout
            type="info"
            iconAccessibilityLabel="Info"
            title="Give $30, get $60 in ads credit"
            message="Earn $60 of ads credit, and send $30 of ads credit to a friend"
            primaryAction={{label: "Send invite", accessibilityLabel: "Send ads invite"}}
            dismissButton={{
              accessibilityLabel: 'Dismiss this banner',
              onDismiss: ()=>{},
            }}
          />
        `}
      />

      <MainSection.Card
        cardSize="lg"
        type="don't"
        description={`
        Stack Callouts. In the case that banners must be stacked, Callouts should come before Upsells.
        `}
        defaultCode={`
        <Box>
          <Box marginBottom={4} display="flex" alignItems="center">
            <Icon accessibilityLabel="" icon="pinterest" color="red" size={32}/>
            <ButtonGroup>
              <Button color="transparent" iconEnd="arrow-down" text="Business" inline />
              <Button color="transparent" iconEnd="arrow-down" text="Create" inline />
              <Button color="transparent" iconEnd="arrow-down" text="Analytics" inline />
              <Button color="transparent" iconEnd="arrow-down" text="Ads" inline />
            </ButtonGroup>
          </Box>
          <Divider/>
          <Box marginTop={8}>
            <Flex gap={2} direction="column">
              <Upsell
                imageData={{
                  component: <Icon icon="send" accessibilityLabel="Send" color="darkGray" size={32}/>
                }}
                title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
                message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
                primaryAction={{label: "Claim now", accessibilityLabel: "Claim ads credit now"}}
              />
              <Callout
                type="info"
                iconAccessibilityLabel="Info"
                title="We have not yet detected your tag"
                message="It may take up to 10 minutes to automatically detect a newly installed tag. If you'd like to manually verify your tag, please click the Verify Tag button."
                primaryAction={{
                  label: "Verify Tag",
                  accessibilityLabel: "Manually verify tag"
                }}
                dismissButton={{
                  accessibilityLabel: 'Dismiss this banner',
                  onDismiss: ()=>{},
                }}
              />
            </Flex>
          </Box>
        </Box>
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
      \`iconAccessibilityLabel\`, \`dismissButton\`, \`primaryAction\`, and \`secondaryAction\` each require a short, descriptive label for screen readers. These labels should communicate the intent of the icon, such as “Error”, “Info” or “Warning”. They should also be localized.

      In the case of action [Buttons](/Button) or [Links](/Link), alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\` [IconButton](/IconButton), the label provided should indicate the intent, like “Dismiss this banner”.
      `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info"
  title="Your business account was created!"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
    accessibilityLabel: "Get started: Verified Merchant Program"
  }}
  secondaryAction={{
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
    accessibilityLabel: "Learn more: Verified Merchant Program"
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: ()=>{},
  }}
/>
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description={`Remember to localize all link or button labels, as well as \`title\` and \`message\`.`}
  >
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info"
  title="Ihr Geschäftskonto wurde erstellt!"
  message="Bewerben Sie sich beim Verified Merchant Program"
  primaryAction={{
    href: "https://pinterest.com",
    label: "Loslegen",
    target: "blank",
    accessibilityLabel: "Loslegen: Verified Merchant Program"
  }}
  secondaryAction={{
    href: "https://pinterest.com",
    label: "Erfahren Sie mehr",
    target: "blank",
    accessibilityLabel: "Erfahren Sie mehr: Verified Merchant Program"
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: ()=>{},
  }}
/>
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Info"
      description="Info Callouts communicate helpful messages to users about the product. In most cases, they should provide an action for users to take."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info"
  title="Your business account was created!"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
    accessibilityLabel: "Get started: Verified Merchant Program"
  }}
  secondaryAction={{
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
    accessibilityLabel: "Learn more: Verified Merchant Program"
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: ()=>{},
  }}
/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Warning"
      description="Warning Callouts communicate cautionary messages to users. Action shouldn't be required. The Callout should provide clear guidance on how to correct an issue and/or learn more about it."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Callout
  type="warning"
  iconAccessibilityLabel="Warning"
  title="Unused audiences are going away"
  message="We have noticed that you have audiences in your advertiser account that have been used in an ad campaign. Pinterest will be deleting any unused audiences on May 30, 2020."
  primaryAction={{
    href: "https://pinterest.com",
    target: "blank",
    label: "View audiences",
    accessibilityLabel: "View unused audiences"
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss warning',
    onDismiss: ()=>{},
  }}
/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Error"
      description="Error Callouts inform users of problems that require immediate action to correct. Further actions on the page might be blocked if users don't correct the problems. The Callout should also provide clear guidance on how to correct the issue and/or learn more about it."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Callout
  type="error"
  title="Pinterest tag needs attention"
  iconAccessibilityLabel="Error"
  message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
  primaryAction={{
    href: "https://pinterest.com",
    target: "blank",
    label: "Fix tag",
    accessibilityLabel: "Fix Pinterest tag",
  }}

/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Actions"
      description={`
        Callouts can have either one primary action, or a primary action and a secondary action. These actions can be [Links](/Link), by specifying the \`href\` property, or [Buttons](/Buttons), when no \`href\` is supplied.

        For example, “Learn more” may link to a separate documentation site, while “Apply now” could be a Button that opens a [Modal](/Modal) with an application flow. Be sure to localize the labels of the actions.
        `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Callout
        type="info"
        iconAccessibilityLabel="Info"
        title="Your business account was created!"
        message="Apply to the Verified Merchant Program"
        primaryAction={{
          label: "Apply now",
          accessibilityLabel: "Apply now: verified merchant program",
          onClick: () => { setShowModal(!showModal) }
        }}
        secondaryAction={{
          href: "https://help.pinterest.com/en/business/article/verified-merchant-program",
          label: "Learn more",
          target: "blank",
          accessibilityLabel: "Learn more: Verified Merchant Program"
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: ()=>{},
        }}
      />
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Apply for the Verified Merchant Program"
            heading="Verified Merchant Program Application"
            onDismiss={() => { setShowModal(!showModal) }}
            footer={
              <Flex flex="grow" justifyContent="end">
                  <ButtonGroup>
                    <Button text="Cancel" inline onClick={() => { setShowModal(!showModal) }} size="lg" />
                    <Button color="red" inline text="Save" size="lg" />
                  </ButtonGroup>
              </Flex>
            }
            size="md"
          >
            <Box display="flex" direction="row" position="relative">
              <Column span={12}>
                <Box paddingY={2} paddingX={8} display="flex">
                  <Column span={4}>
                    <Label htmlFor="name">
                      <Text align="start" weight="bold">
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
                      <Text align="start" weight="bold">
                        Business Description
                      </Text>
                    </Label>
                  </Column>
                  <Column span={8}>
                    <TextArea id="desc" onChange={() => undefined} />
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
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Dismissible"
      description={`
        \`dismissButton\` can be used when Callout doesn't indicate a persistent state. This will most commonly be used in info Callouts.

        Don't use dismiss buttons in the following cases:

        - There is a persistent account or page status that the user must address.
        - The user must access Callout's information again in order to perform a task.
        `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Callout
  type="info"
  iconAccessibilityLabel="Info"
  title="Your business account was created!"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
    accessibilityLabel: "Get started: Verified Merchant Program"
  }}
  secondaryAction={{
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
    accessibilityLabel: "Learn more: Verified Merchant Program"
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: ()=>{},
  }}
/>
      `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Custom navigation"
      description={customNavigationDescription('Callout')}
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
    alert('CUSTOM NAVIGATION set on <Callout primaryAction secondaryAction/>. Disabled link: https://pinterest.com. Opening help.pinterest.com instead.');
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
        <Callout
          type="info"
          iconAccessibilityLabel="Info icon"
          title="Your business account was created!"
          message="Apply to the Verified Merchant Program!"
          primaryAction={
            { ...linkProps,
              label:'Get started',
              accessibilityLabel: "Apply to verified merchant program",
            }}
          secondaryAction={
            { ...linkProps,
              label: 'Learn more',
              accessibilityLabel: "Learn more: verified merchant program",
            }}
          dismissButton={{
            accessibilityLabel: 'Dismiss banner',
            onDismiss: () => {},
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
      **[Upsell](/Upsell)**
      If marketing new products or features, or encouraging upgrades, use Upsell instead.

      **[Toast](/Toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsell and Callout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[ActivationCard](/ActivationCard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

      **[OnLinkNavigationProvider](/OnLinkNavigationProvider)**
      OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
      See [custom navigation](#Custom-navigation) variant for examples.

    `}
    />
  </MainSection>,
);

export default cards;
