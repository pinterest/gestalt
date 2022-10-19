// @flow strict
import { type Node, useState, useRef, useEffect } from 'react';
import { Box, Button, Dropdown, ScrollBoundaryContainer } from 'gestalt';

function ScrollableContainer(): Node {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const anchorRef = useRef(null);

  useEffect(() => {
    setElements(new Array(10).fill(undefined));
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
    <Box padding={8} height={500} overflow="scrollY">
      <Box height={1000}>
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
              isWithinFixedContainer
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

export default ScrollableContainer;
