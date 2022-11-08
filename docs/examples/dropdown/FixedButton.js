// @flow strict
import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Dropdown } from 'gestalt';

export default function FixedButton() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    setElements(new Array(10).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = `item ${index}`;
      return (
        <Dropdown.Item
          key={text}
          onSelect={handleSelect}
          option={{ value: text, label: text }}
          selected={selectedElement}
        />
      );
    });

  return (
    <Box position="fixed" padding={8} bottom right>
      <IconButton
        accessibilityLabel="Fixed button"
        icon="arrow-up"
        onClick={() => setIsOpen(!isOpen)}
        ref={anchorRef}
        selected={isOpen}
        size="lg"
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
  );
}
