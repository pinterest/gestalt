// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, Dropdown } from 'gestalt';

export default function CornerBottom(): Node {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isOpen, setIsOpen] = useState('');
  const anchorARef = useRef(null);
  const anchorBRef = useRef(null);

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
    <Box padding={2} height={500}>
      <Flex justifyContent="between" alignItems="end" height="100%">
        <IconButton
          accessibilityLabel="Menu open button"
          icon="arrow-up"
          onClick={() => setIsOpen((prevState) => (prevState === 'refA' ? '' : 'refA'))}
          ref={anchorARef}
          selected={isOpen === 'refA'}
          size="lg"
        />
        {isOpen === 'refA' && (
          <Dropdown
            anchor={anchorARef.current}
            id="demo-dropdown-example"
            onDismiss={() => setIsOpen('')}
            idealDirection="up"
          >
            {preRenderItems()}
          </Dropdown>
        )}

        <IconButton
          accessibilityLabel="Menu open button"
          icon="arrow-up"
          onClick={() => setIsOpen((prevState) => (prevState === 'refB' ? '' : 'refB'))}
          ref={anchorBRef}
          selected={isOpen === 'refB'}
          size="lg"
        />
        {isOpen === 'refB' && (
          <Dropdown
            anchor={anchorBRef.current}
            id="demo-dropdown-example"
            onDismiss={() => setIsOpen('')}
            idealDirection="up"
          >
            {preRenderItems()}
          </Dropdown>
        )}
      </Flex>
    </Box>
  );
}
