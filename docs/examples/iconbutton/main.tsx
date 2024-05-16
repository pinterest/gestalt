import { ReactNode, useRef, useState } from 'react';
import { Dropdown, Flex, IconButton } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    ReadonlyArray<{
      label: string;
      subtext?: string;
      value: string;
    }>
  >([]);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  const onSelect = ({
    item,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
// @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
        ref={anchorRef}
        accessibilityControls="sections-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        accessibilityLabel="Create Pin Menu"
        bgColor="lightGray"
        icon="add"
        iconColor="darkGray"
        onClick={() => setOpen((prevVal) => !prevVal)}
        selected={open}
        size="lg"
        tooltip={{ text: 'Create', idealDirection: 'up' }}
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
