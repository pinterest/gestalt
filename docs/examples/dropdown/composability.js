// @flow strict
import { Fragment, type Node, useState, useRef } from 'react';
import {
  IconButton,
  Label,
  Text,
  Switch,
  Dropdown,
  Flex,
  Box,
  FixedZIndex,
  CompositeZIndex,
} from 'gestalt';

export default function CustomIconButtonPopoverExample(): Node {
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);
  const [switched, setSwitched] = useState(true);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  return (
    <Fragment>
      <Flex justifyContent="center" width="100%" height="100%">
        <Box>
          <Box margin={2}>
            <Box paddingX={2}>
              <Label htmlFor="dropdown-example">
                <Text>Toggle Dropdown subcomponents</Text>
              </Label>
            </Box>
            <Switch
              onChange={() => setSwitched((value) => !value)}
              id="dropdown-example"
              switched={switched}
            />
          </Box>
          <IconButton
            accessibilityControls="custom-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="add"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="lg"
          />
        </Box>
      </Flex>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="custom-dropdown-example"
          onDismiss={() => setOpen(false)}
          zIndex={new CompositeZIndex([PAGE_HEADER_ZINDEX])}
        >
          {switched ? (
            <Fragment>
              <Dropdown.Link
                isExternal
                href="#"
                onClick={({ event }) => event.preventDefault()}
                option={{ value: 'item 1', label: 'Custom link 1' }}
              />
              <Dropdown.Link
                isExternal
                href="#"
                onClick={({ event }) => event.preventDefault()}
                option={{ value: 'item 2', label: 'Another custom link' }}
              />
            </Fragment>
          ) : (
            <Fragment>
              {[1, 2, 3, 4, 5, 6].map((x) => (
                <Dropdown.Item
                  key={x}
                  onSelect={() => {}}
                  option={{ value: x.toString(), label: x.toString() }}
                />
              ))}
              {[7, 8, 9, 10, 11, 12].map((x) => (
                <Dropdown.Item
                  key={x}
                  onSelect={() => {}}
                  option={{ value: x.toString(), label: x.toString() }}
                />
              ))}
            </Fragment>
          )}
        </Dropdown>
      )}
    </Fragment>
  );
}
