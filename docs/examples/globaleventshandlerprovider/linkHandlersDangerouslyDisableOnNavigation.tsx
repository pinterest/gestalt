import { ComponentProps, useCallback, useMemo, useRef, useState } from 'react';
import { Button, Dropdown, Flex, GlobalEventsHandlerProvider, Link, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  const useRouter = {
    push: (href: string) => {
      window.location.href = `${window.location.href}${href}`;
    },
  } as const;

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

  const linkHandlers = useMemo(() => ({ onNavigation: useOnNavigation }), [useOnNavigation]);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <GlobalEventsHandlerProvider linkHandlers={linkHandlers}>
        <Flex direction="column" gap={2}>
          <Text>Example url: {window.location.href}</Text>
          <Flex justifyContent="center">
            <Button
              ref={anchorRef}
              accessibilityControls="basic-dropdown-example"
              accessibilityExpanded={open}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpen((prevVal) => !prevVal)}
              selected={open}
              text="Menu"
            />
            {open && (
              <Dropdown
                anchor={anchorRef.current}
                id="basic-dropdown-example"
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <Dropdown.Link
                  href="#Disabling-the-provider"
                  onClick={({ event, dangerouslyDisableOnNavigation }) => {
                    event.preventDefault();
                    dangerouslyDisableOnNavigation();
                    useRouter.push('#');
                    setOpen(false);
                  }}
                  option={{
                    value: 'link item',
                    label: 'This item is a link',
                  }}
                />
              </Dropdown>
            )}
          </Flex>
        </Flex>
      </GlobalEventsHandlerProvider>
    </Flex>
  );
}
