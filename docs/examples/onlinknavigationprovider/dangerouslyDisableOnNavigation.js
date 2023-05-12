// @flow strict
import { type Node, useRef, useState } from 'react';
import { Button, Dropdown, Flex, OnLinkNavigationProvider } from 'gestalt';
import { useRouter } from 'next/router';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const router = useRouter();

  const useOnNavigation = ({ href }: {| href: string, target?: null | 'self' | 'blank' |}) => {
    const onNavigationClick = ({ event }: {| +event: SyntheticEvent<> |}) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert(`Disabled link: ${href}. Opening help.pinterest.com instead.`);
    };

    return onNavigationClick;
  };

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <OnLinkNavigationProvider onNavigation={useOnNavigation}>
        <Flex direction="column" gap={2}>
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
                  href="#"
                  option={{
                    value: 'link item',
                    label: 'This item is a link',
                  }}
                  onClick={({ event, dangerouslyDisableOnNavigation }) => {
                    event.preventDefault();
                    dangerouslyDisableOnNavigation();
                    router.push('#');
                  }}
                />
              </Dropdown>
            )}
          </Flex>
        </Flex>
      </OnLinkNavigationProvider>
    </Flex>
  );
}
