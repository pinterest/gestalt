// @flow strict
import { type Node, useCallback, useMemo, useState } from 'react';
import {
  ActivationCard,
  Callout,
  Divider,
  Flex,
  GlobalEventsHandlerProvider,
  Icon,
  Link,
  RadioGroup,
  Upsell,
} from 'gestalt';

export default function Example(): Node {
  const [onNavigationMode, setOnNavigationMode] = useState<'default' | 'custom'>('default');

  const useOnNavigation = useCallback(
    ({
      href,
    }: {|
      href: $ElementType<React$ElementConfig<typeof Link>, 'href'>,
      target?: $ElementType<React$ElementConfig<typeof Link>, 'target'>,
    |}) => {
      const onNavigationClick = ({ event }: {| +event: SyntheticEvent<> |}) => {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        alert(`Disabled link: ${href}. Opening help.pinterest.com instead.`);
      };

      return onNavigationClick;
    },
    [],
  );

  const linkHandlers = useMemo(
    () => ({ onNavigation: onNavigationMode === 'custom' ? useOnNavigation : undefined }),
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

          <Flex direction="column" gap={{ column: 4, row: 0 }} alignItems="center">
            <Callout
              type="info"
              iconAccessibilityLabel="Info icon"
              title="Your business account was created!"
              message="Apply to the Verified Merchant Program!"
              primaryAction={{
                href: '#',
                label: 'Get started',
                accessibilityLabel: 'Get started: verified merchant program',
              }}
              secondaryAction={{
                href: '#',
                label: 'Learn more',
                accessibilityLabel: 'Learn more: verified merchant program',
              }}
              dismissButton={{
                accessibilityLabel: 'Dismiss banner',
                onDismiss: () => {},
              }}
            />
            <Upsell
              title="Give $30, get $60 in ads credit"
              message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
              primaryAction={{
                href: '#',
                label: 'Send invite',
                accessibilityLabel: 'Send invite for ads credit',
              }}
              dismissButton={{
                accessibilityLabel: 'Dismiss banner',
                onDismiss: () => {},
              }}
              imageData={{
                component: (
                  <Icon icon="pinterest" accessibilityLabel="Pin" color="default" size={32} />
                ),
              }}
            />
            <ActivationCard
              status="notStarted"
              statusMessage="Not started"
              title="Claim your website"
              message="Grow distribution and track Pins linked to your website"
              link={{
                href: '#',
                label: 'Claim your website now',
                accessibilityLabel: '',
              }}
              dismissButton={{
                accessibilityLabel: 'Dismiss card',
                onDismiss: () => {},
              }}
            />
          </Flex>
        </Flex>
      </GlobalEventsHandlerProvider>
    </Flex>
  );
}
