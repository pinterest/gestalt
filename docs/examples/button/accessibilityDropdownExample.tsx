import { useRef, useState } from 'react';
import { Box, Button, Dropdown } from 'gestalt';

export default function ActionDropdownExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | {
    label: string;
    subtext?: string;
    value: string;
  }>(null);
  const anchorRef = useRef<null | HTMLButtonElement>(null);

  const onSelect = ({
    item,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => setSelected(item);

  return (
    <Box display="flex" justifyContent="center" padding={8} width="100%">
      <Button
        ref={anchorRef}
        accessibilityControls="action-variant-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        selected={open}
        size="lg"
        text={selected ? selected.label : 'Display'}
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="action-variant-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Cozy', label: 'Cozy' }}
            
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Comfy', label: 'Comfy' }}
            
            selected={selected}
          />
        </Dropdown>
      )}
    </Box>
  );
}
