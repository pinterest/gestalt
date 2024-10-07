import { useRef, useState } from 'react';
import { Box, ButtonToggle, Flex, Label, Layer, Popover, SelectList, Switch, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | 'right' | 'left'>('down');
  const [forceDirection, setForceDirection] = useState(false);

  const anchorRef = useRef<null | HTMLButtonElement>(null);

  return (
    <Flex alignItems="center" direction="column" gap={6} height="100%" justifyContent="center" width="100%">
      <Flex gap={6}>
        <SelectList
          id="idealDir"
          label="idealDirection"
          onChange={({ value }) => {
            const dirValue = value as 'up' | 'down' | 'right' | 'left';
            setDirection(dirValue);
          }}
        >
          {[
            { label: 'Up', value: 'up' },
            { label: 'Down', value: 'down' },
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
        <Flex alignItems="center" direction='column' gap={2}>
          <Label htmlFor="idealDirLabel">
            <Text size='100'>{ forceDirection ? 'forceDirection: true' : 'forceDirection: false'}</Text>
          </Label>

          <Switch
            id="idealDirSwitch"
            onChange={() => setForceDirection((currVal) => !currVal)}
            switched={forceDirection}
          />
        </Flex>
      </Flex>
      <ButtonToggle
        ref={anchorRef}
        onClick={() => setOpen((value) => !value)}
        selected={open}
        size="lg"
        text={open ? 'Showing Popover' : 'Open Popover'}
      />
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            forceDirection={forceDirection}
            idealDirection={direction}
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
          >
            <Box alignItems="center" display="flex" height={100} justifyContent="center">
              <Text align="center">Content</Text>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
