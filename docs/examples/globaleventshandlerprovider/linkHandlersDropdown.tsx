import { type ComponentProps, useCallback, useMemo, useRef, useState } from 'react';
import {
  Button,
  Divider,
  Dropdown,
  Flex,
  GlobalEventsHandlerProvider,
  type Link,
  RadioGroup,
} from 'gestalt';

export default function Example() {
  const [onNavigationMode, setOnNavigationMode] = useState<'default' | 'custom'>('default');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement>(null);

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
                id="default3"
                label="Default Link Navigation"
                name="default"
                onChange={() => setOnNavigationMode('default')}
                value="default"
              />
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'custom'}
                id="custom3"
                label="Custom GlobalEventsHandlerProvider Navigation"
                name="custom"
                onChange={() => setOnNavigationMode('custom')}
                value="custom"
              />
            </RadioGroup>
            <Divider />
          </Flex>

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
      </GlobalEventsHandlerProvider>
    </Flex>
  );
}
