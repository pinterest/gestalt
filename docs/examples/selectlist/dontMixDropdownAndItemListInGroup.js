// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Button, Dropdown, Flex, SelectList } from 'gestalt';

export default function SubtextIconButtonFlyoutExample(): Node {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{|
    label: string,
    subtext?: string,
    value: string,
  |} | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  const handleSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => {
    setSelected(item);
  };

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={2} alignItems="end">
        <SelectList id="selectlistexample8" label="Metric" onChange={() => {}} size="lg">
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
            accessibilityControls="header-dropdown-example"
            accessibilityHaspopup
            accessibilityExpanded={open}
            iconEnd="arrow-down"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
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
