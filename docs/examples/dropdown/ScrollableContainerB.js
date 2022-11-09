// @flow strict
import { type Node, useState, useRef, useEffect } from 'react';
import { Box, Button, Dropdown, ScrollBoundaryContainer } from 'gestalt';

export default function ScrollableContainerB(): Node {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const anchorRef = useRef(null);

  useEffect(() => {
    setElements(new Array(20).fill(undefined));
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
    <Box padding={8} height={500} overflow="scrollY" color="successBase">
      <Box height={300} color="errorBase" overflow="hidden">
        <ScrollBoundaryContainer>
          <Button
            text="Menu open button"
            onClick={() => setIsOpen(!isOpen)}
            ref={anchorRef}
            selected={isOpen}
            size="lg"
          />
          {isOpen && (
            <Dropdown
              anchor={anchorRef.current}
              id="demo-dropdown-example"
              onDismiss={() => setIsOpen(!isOpen)}
              idealDirection="up"
            >
              {preRenderItems()}
            </Dropdown>
          )}
        </ScrollBoundaryContainer>
      </Box>
    </Box>
  );
}
