import { ComponentProps, useCallback, useMemo, useState } from 'react';
import {
  ActivationCard,
  BannerCallout,
  BannerUpsell,
  Divider,
  Flex,
  GlobalEventsHandlerProvider,
  Icon,
  Link,
  RadioGroup,
} from 'gestalt';

export default function Example() {
  const [onNavigationMode, setOnNavigationMode] = useState<'default' | 'custom'>('default');

  const useOnNavigation = useCallback(
    ({
      href,
    }: {
      href: ComponentProps<typeof Link>['href'];
      target?: ComponentProps<typeof Link>['target'];
    }) => {
      const onNavigationClick = ({ event }: { readonly event: React.SyntheticEvent }) => {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        alert(`Disabled link: ${href}. Opening help.pinterest.com instead.`);
      };

      return onNavigationClick;
    },
    [],
  );

  const linkHandlers = useMemo(
    () => ({
      onNavigation: onNavigationMode === 'custom' ? useOnNavigation : undefined,
    }),
    [onNavigationMode, useOnNavigation],
  );

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <GlobalEventsHandlerProvider linkHandlers={linkHandlers}>
        <Flex direction="column" gap={2}>
          <Flex direction="column" gap={2}>
            <RadioGroup id="navigation-type" legend="Navigation type">
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'default'}
                id="default2"
                label="Default Link Navigation"
                name="default"
                onChange={() => setOnNavigationMode('default')}
                value="default"
              />
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'custom'}
                id="custom"
                label="Custom GlobalEventsHandlerProvider Navigation"
                name="custom2"
                onChange={() => setOnNavigationMode('custom')}
                value="custom"
              />
            </RadioGroup>
            <Divider />
          </Flex>

          <Flex alignItems="center" direction="column" gap={{ column: 4, row: 0 }}>
            <BannerCallout
              dismissButton={{
                accessibilityLabel: 'Dismiss banner',
                onDismiss: () => {},
              }}
              iconAccessibilityLabel="Info icon"
              message="Apply to the Verified Merchant Program!"
              primaryAction={{
                href: '#',
                label: 'Get started',
                accessibilityLabel: 'Get started: verified merchant program',
                role: 'link',
              }}
              secondaryAction={{
                href: '#',
                label: 'Learn more',
                accessibilityLabel: 'Learn more: verified merchant program',
                role: 'link',
              }}
              title="Your business account was created!"
              type="info"
            />
            <BannerUpsell
              dismissButton={{
                accessibilityLabel: 'Dismiss banner',
                onDismiss: () => {},
              }}
              imageData={{
                component: (
                  <Icon accessibilityLabel="Pin" color="default" icon="pinterest" size={32} />
                ),
              }}
              message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
              primaryAction={{
                href: '#',
                label: 'Send invite',
                accessibilityLabel: 'Send invite for ads credit',
                role: 'link',
              }}
              title="Give $30, get $60 in ads credit"
            />
            <ActivationCard
              dismissButton={{
                accessibilityLabel: 'Dismiss card',
                onDismiss: () => {},
              }}
              link={{
                href: '#',
                label: 'Claim your website now',
                accessibilityLabel: '',
              }}
              message="Grow distribution and track Pins linked to your website"
              status="notStarted"
              statusMessage="Not started"
              title="Claim your website"
            />
          </Flex>
        </Flex>
      </GlobalEventsHandlerProvider>
    </Flex>
  );
}
