// @flow strict
import { type Node, useState, useEffect } from 'react';
import { Box, Button, Dropdown, PageHeader } from 'gestalt';

export default function PageHeaderExample(): Node {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

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
          key={index}
          onSelect={handleSelect}
          option={{ value: text, label: text }}
          selected={selectedElement}
        />
      );
    });

  return (
    <Box height={500} color="lightWash">
      <PageHeader
        title="Dropdown Showcase"
        primaryAction={{
          component: <Button text="Menu open button" size="lg" />,
          dropdownItems: preRenderItems(),
        }}
        dropdownAccessibilityLabel="More options"
      />
    </Box>
  );
}
