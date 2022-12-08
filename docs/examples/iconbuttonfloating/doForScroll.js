// @flow strict
import { useState, useRef, type Node } from 'react';
import { IconButtonFloating, Card, Dropdown, Box, Flex, Image, Text } from 'gestalt';

export default function DoForScroll(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <Box margin={2}>
      <Flex justifyContent="center" width="100%">
        <Card>
          <Box borderStyle="sm" width={300} color="default" rounding={4} padding={4}>
            <Flex gap={3} alignContent="center" justifyContent="between" direction="column">
              <Text align="start" size="500">
                Newsroom
              </Text>
              <Box height={170} width="100%">
                <Image
                  alt=""
                  role="presentation"
                  color="#000"
                  fit="cover"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/FY2MKr5/stock6.jpg"
                />
              </Box>
              <Text align="start" size="300">
                Today&apos;s Top Holiday Picks
              </Text>
            </Flex>
          </Box>
        </Card>
      </Flex>
      <Box margin={4} position="fixed" bottom right ref={anchorRef} role="contentinfo">
        <IconButtonFloating
          accessibilityControls="sections-dropdown-example"
          accessibilityExpanded={open}
          accessibilityPopupRole="menu"
          accessibilityLabel="Help & Resources Menu"
          icon="question-mark"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
        />
      </Box>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
          idealDirection="up"
        >
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            onClick={() => {
              /* log click here */
            }}
            option={{ value: 'Get help', label: 'Visit the Help Center' }}
          />
          <Dropdown.Link
            href="https://help.pinterest.com/en?source=gear_menu_web"
            isExternal
            onClick={() => {
              /* log click here */
            }}
            option={{ value: 'Get help', label: 'Create widget' }}
          />
        </Dropdown>
      )}
    </Box>
  );
}
