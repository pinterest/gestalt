import { useRef, useState } from 'react';
import { Box, Button, Dropdown, Flex, SelectList } from 'gestalt';

export default function SubtextIconButtonFlyoutExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    label: string;
    subtext?: string;
    value: string;
  } | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  const handleSelect = ({
    item,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => {
    setSelected(item);
  };

  return (
    <Box padding={8} width="100%">
      <Flex alignItems="end" gap={2}>
        <SelectList id="selectlist-dont-mix" label="Metric" onChange={() => {}}>
          {[
            { label: 'Revenue', value: 'v1' },
            { label: 'Checkouts', value: 'v2' },
            { label: 'Purchasers', value: 'v3' },
            { label: 'Page visits', value: 'v4' },
            { label: 'Add to cart', value: 'v5' },
            { label: 'Pin clicks', value: 'v6' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>

        <Flex justifyContent="center">
          <Button
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLAnchorElement | HTMLButtonElement> | undefined'.
            ref={anchorRef}
            accessibilityControls="header-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            selected={open}
            text="Date range"
          />

          {open && (
            <Dropdown
              anchor={anchorRef.current}
              id="selectlistexample9"
              onDismiss={() => {
                setOpen(false);
              }}
            >
              {[
                { value: 'item 1', label: 'Last 7 days' },
                { value: 'item 2', label: 'Last 14 days' },
                { value: 'item 3', label: 'Last 21 days' },
                { value: 'item 4', label: 'Last 30 days' },
                { value: 'item 5', label: 'Last 60 days' },
                { value: 'item 6', label: 'Last 90 days' },
              ].map(({ label, value }) => (
                <Dropdown.Item
                  key={label}
                  onSelect={handleSelect}
                  option={{ label, value }}
                  selected={selected}
                />
              ))}
            </Dropdown>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
