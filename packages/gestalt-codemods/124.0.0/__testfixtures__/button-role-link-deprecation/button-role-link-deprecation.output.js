import {
  Callout,
  Flex,
  Icon,
  ModalAlert,
  PopoverEducational,
  SlimBanner,
  Text,
  Toast,
  Upsell,
} from 'gestalt';

export default function TestComp() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Callout
        dismissButton={{
          accessibilityLabel: 'Dismiss this banner',
          onDismiss: () => {},
        }}
        iconAccessibilityLabel="Info"
        message="Apply to the Verified Merchant Program"
        primaryAction={{
          accessibilityLabel: 'Get started: Verified Merchant Program',
          href: 'https://pinterest.com',
          label: 'Get started',
          target: 'blank',
          role: 'link'
        }}
        secondaryAction={{
          accessibilityLabel: 'Learn more: Verified Merchant Program',
          href: 'https://pinterest.com',
          label: 'Learn more',
          target: 'blank',
          role: 'link'
        }}
        title="Your business account was created!"
        type="info"
      />
      <ModalAlert
        accessibilityModalLabel="Label"
        heading="Heading"
        primaryAction={{
          href: 'https://pinterest.com',
          label: 'Send invite',
          accessibilityLabel: 'Invite friend to use ads',
          target: 'blank',
          role: 'link'
        }}
        onDismiss={() => {}}
        accessibilityDismissButtonLabel="test"
        type="error"
      >
        <Text>Children</Text>
      </ModalAlert>
      <PopoverEducational
        anchor={document.body}
        color="darkGray"
        idealDirection="down"
        onDismiss={() => {}}
        shouldFocus={false}
        showCaret
        size={260}
        text="Text"
      />
      <SlimBanner
        accessibilityCloseButtonLabel="Close"
        accessibilityMainLabel="Label"
        button={{
          accessibilityLabel: 'Label',
          href: 'https://pinterest.com',
          label: 'Label',
          target: 'blank',
          role: 'link'
        }}
        onDismiss={() => {}}
        type="info"
      />
      <SlimBanner
        accessibilityCloseButtonLabel="Close"
        accessibilityMainLabel="Label"
        button={{
          accessibilityLabel: 'Confirm delete board',
          label: 'Delete',
          onClick: () => {},
        }}
        onDismiss={() => {}}
        type="info"
      />
      <Toast
        color="darkGray"
        text="Text"
        thumbnail={
          <img
            alt="test"
            src="https://i.ibb.co/7QpKsCX/stock1.jpg"
            style={{ height: 40, width: 40 }}
          />
        }
      />
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="" color="default" size={32} />,
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          href: 'https://pinterest.com',
          label: 'Send invite',
          accessibilityLabel: 'Invite friend to use ads',
          target: 'blank',
          role: 'link'
        }}
        title="Give $30, get $60 in ads credit"
      />
    </Flex>
  );
}
