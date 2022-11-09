// @flow strict
import { type Node, Fragment, useState, useRef, useEffect } from 'react';
import { Box, Button, Dropdown, CompositeZIndex, FixedZIndex, Layer, Sheet } from 'gestalt';

export default function InnerSheet(): Node {
  const [shouldShow, setShouldShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const anchorRef = useRef(null);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

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
    <Fragment>
      <Box padding={8}>
        <Button text="View example Sheet" onClick={() => setShouldShow(true)} />
      </Box>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <Sheet
            accessibilityDismissButtonLabel="Close sheet"
            accessibilitySheetLabel="Example dropdown inner sheet"
            heading="Dropdown inner sheet"
            onDismiss={() => setShouldShow(false)}
            size="md"
          >
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
          </Sheet>
        </Layer>
      )}
    </Fragment>
  );
}
