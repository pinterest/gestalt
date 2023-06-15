// @flow strict
import { type Node, useCallback, useMemo, useRef, useState } from 'react';
import { Button, Dropdown, Flex, GlobalEventsHandlerProvider, Link, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  const useRouter = {
    push: (href: string) => {
      window.location.href = `${window.location.href}${href}`;
    },
  };

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

  const linkHandlers = useMemo(() => ({ onNavigation: useOnNavigation }), [useOnNavigation]);

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <GlobalEventsHandlerProvider linkHandlers={linkHandlers}>
        <Flex direction="column" gap={2}>
          <Text>Example url: {window.location.href}</Text>
          <Flex justifyContent="center">
            <Button
              accessibilityControls="basic-dropdown-example"
              accessibilityHaspopup
              accessibilityExpanded={open}
              iconEnd="arrow-down"
              text="Menu"
              ref={anchorRef}
              selected={open}
              onClick={() => setOpen((prevVal) => !prevVal)}
            />
            {open && (
              <Dropdown
                id="basic-dropdown-example"
                anchor={anchorRef.current}
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <Dropdown.Link
                  href="#Disabling-the-provider"
                  option={{
                    value: 'link item',
                    label: 'This item is a link',
                  }}
                  onClick={({ event, dangerouslyDisableOnNavigation }) => {
                    event.preventDefault();
                    dangerouslyDisableOnNavigation();
                    useRouter.push('#');
                    setOpen(false);
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
