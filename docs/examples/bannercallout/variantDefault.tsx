import { BannerCallout, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <BannerCallout
          dismissButton={{
            onDismiss: () => {},
          }}
          message="Inspiration to build the life you love."
          primaryAction={{
            accessibilityLabel: 'Log in',
            href: 'https://pinterest.com',
            label: 'Sign up',
            target: 'blank',
            role: 'link',
          }}
          secondaryAction={{
            accessibilityLabel: 'Log in',
            href: 'https://pinterest.com',
            label: 'Log in',
            target: 'blank',
            role: 'link',
          }}
          title="Pinterest is the place for inspiration"
          type="default"
        />
    </Flex>
  );
}
