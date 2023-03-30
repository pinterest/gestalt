// @flow strict
import { type Node, useRef, useState } from 'react';
import { Button, Divider, Dropdown, Flex, OnLinkNavigationProvider, RadioGroup } from 'gestalt';

export default function Example(): Node {
  const [onNavigationMode, setOnNavigationMode] = useState<'default' | 'custom'>('default');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const useOnNavigation = ({ href }) => {
    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert(`Disabled link: ${href}. Opening help.pinterest.com instead.`);
    };

    return onNavigationClick;
  };

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <OnLinkNavigationProvider
        onNavigation={onNavigationMode === 'custom' ? useOnNavigation : undefined}
      >
        <Flex direction="column" gap={2}>
          <Flex direction="column" gap={2}>
            <RadioGroup id="navigation-type" legend="Navigation type">
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'default'}
                id="default3"
                label="Default Link Navigation"
                name="default"
                onChange={() => setOnNavigationMode('default')}
                value="default"
              />
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'custom'}
                id="custom3"
                label="Custom OnLinkNavigationProvider Navigation"
                name="custom"
                onChange={() => setOnNavigationMode('custom')}
                value="custom"
              />
            </RadioGroup>
            <Divider />
          </Flex>

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
                />
              </Dropdown>
            )}
          </Flex>
        </Flex>
      </OnLinkNavigationProvider>
    </Flex>
  );
}
