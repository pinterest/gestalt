// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Flex, Box, Button, Dropdown } from 'gestalt';

function PopoverOverflowingViewport(): Node {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    setElements(new Array(100).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    console.log('Selected item: ', item);
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = `item ${index}`;
      return (
        <Dropdown.Item
          key={index}
          onSelect={handleSelect}
          option={{ value: text, label: text }}
          selected={selectedElement}
        />
      );
    });

  return (
    <Box height={500}>
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Box>
          <Button
            accessibilityControls="demo-dropdown-example"
            accessibilityExpanded={isOpen}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onClick={() => setIsOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={isOpen}
            size="lg"
            text="Menu"
          />
          {isOpen && (
            <Dropdown
              anchor={anchorRef.current}
              id="demo-dropdown-example"
              onDismiss={() => setIsOpen(false)}
            >
              {preRenderItems()}
            </Dropdown>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default PopoverOverflowingViewport;
