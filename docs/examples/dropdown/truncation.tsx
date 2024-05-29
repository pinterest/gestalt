import { ComponentProps, Fragment, useRef, useState } from 'react';
import { Box, Button, CompositeZIndex, Dropdown, FixedZIndex, Flex } from 'gestalt';

export default function CustomIconButtonPopoverExample() {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {
    label: string;
    subtext?: string;
    value: string;
  }>(null);
  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const onSelect: ComponentProps<typeof Dropdown.Item>['onSelect'] = ({ item }) =>
    setSelected(item);

  return (
    <Fragment>
      <Flex height="100%" justifyContent="center" width="100%">
        <Box margin={2}>
          <Button
            ref={anchorRef}
            accessibilityControls="truncation-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
            size="lg"
            text="Menü"
          />
        </Box>
      </Flex>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="truncation-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          <Dropdown.Item
            badge={{ text: 'New' }}
            onSelect={onSelect}
            option={{
              value: 'Homefeed anpassen',
              label: 'Homefeed anpassen',
              subtext:
                'Aktualisieren Sie Ihren Homefeed, um Ihre Vorlieben und Ideen besser widerzuspiegeln',
            }}
            
            selected={selected}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            onClick={({ event }) => event.preventDefault()}
            option={{ value: 'Hilfe anfordern', label: 'Hilfe anfordern' }}
          />
          <Dropdown.Link
            href="https://policy.pinterest.com/en/privacy-policy"
            isExternal
            onClick={({ event }) => event.preventDefault()}
            option={{
              value: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
              label: 'Nutzungsbedingungen und Datenschutzrichtlinien anzeigen',
            }}
          />
        </Dropdown>
      )}
    </Fragment>
  );
}
