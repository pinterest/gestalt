// @flow strict
import { type Node } from 'react';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';

export default function DropdownShowCase(): Node {
  return (
    <Page title="Dropdown - Show case">
      <PageHeader badge="pilot" name="Dropdown" type="guidelines" />
      <MainSection name="Examples">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            title="More items on list then viewport supports"
            description="This case shows you a list of items and your viewport has less available height then your dropdown list requests."
            defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const [selectedDropdown, setSelectedDropdown] = React.useState(null);
  const anchorRef = React.useRef(null);

  const filteredVariants = new Array(100).fill({ value: 'test', status: 'active' });

  const openDropdown = () => setOpen(true);
  const closeDropdown = () => setOpen(false);

  // DOM structure based on error: https://pinterest.slack.com/archives/C13KLG5P0/p1658953735281499
  return (
    <React.Fragment>
      <Box width={360}>
        <TapArea onTap={openDropdown} ref={anchorRef}>
          <Box
            borderStyle="lg"
            rounding={4}
            padding={3}
            display="flex"
            alignItems="center"
            justifyContent="between"
            data-test-id="selected-variant"
          >
            <Box width={240}>
              <Text lineClamp={1}>
                <Text weight="bold" inline>
                  Whatever:
                </Text>
              </Text>
            </Box>
            <Flex
              alignItems="center"
              gap={{ row: 3, column: 0, }}
            >
              <Icon
                color="default"
                icon="arrow-down"
                size={12}
                accessibilityLabel="a11y test"
              />
            </Flex>
          </Box>
        </TapArea>
      </Box>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          onDismiss={closeDropdown}
          id="testing component"
          zIndex={new FixedZIndex(999)}
        >
          {filteredVariants.map(({ value: variant, status }) => (
            <Dropdown.Item
              key={variant}
              onSelect={({ item }) => {
                setSelectedDropdown(item);
                closeDropdown();
              }}
              option={{ value: variant, label: variant }}
              selected={selectedDropdown}
            >
              <Flex alignItems="center" justifyContent="start" width={352}>
                <Box width={240} marginEnd={5}>
                  <Text>{variant}</Text>
                </Box>
                {status === 'outOfStock' && <Text>Out of stock</Text>}
              </Flex>
            </Dropdown.Item>
          ))}
        </Dropdown>
      )}
    </React.Fragment>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="Popover example - It must be add on Popover showcase Popover page"
            description="The case bellow show a Popover inner Sheet and the Popover height is higher then available sheet viewport"
            defaultCode={`
function Example() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldShow, setShouldShow] = React.useState(false);
  const anchorRef = React.useRef(null);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  // DOM structure based on this related error: https://pinterest.slack.com/archives/C13KLG5P0/p1661909002686629
  return (
    <React.Fragment>
      <Box padding={8} width="100%">
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
            <IconButton
              accessibilityLabel="Menu open button"
              icon="arrow-down"
              onClick={() => setIsOpen(!isOpen)}
              ref={anchorRef}
              selected={isOpen}
              size="lg"
            />
            {isOpen && (
              <Box zIndex={new FixedZIndex(1000000000)}>
                <Popover
                  color="white"
                  anchor={anchorRef.current}
                  idealDirection="down"
                  onDismiss={() => setIsOpen(!isOpen)}
                  shouldFocus={false}
                  size="md"
                >
                  <Box paddingY={6} width={360} height={1000}>
                    <Box paddingX={4} marginBottom={4}>
                      <Box marginStart={2} marginBottom={2}>
                        <Text>
                          Sort by
                        </Text>
                      </Box>
                    </Box>
                    <Box paddingX={4} marginBottom={4} paddingY={4}>
                      <Box marginStart={2} marginBottom={2}>
                        <Text>
                          Filter by format type
                        </Text>
                      </Box>
                    </Box>
                    <Box paddingX={4} marginBottom={6}>
                      <Box
                        marginStart={2}
                        marginEnd={2}
                        direction="row"
                        display="flex"
                        alignItems="center"
                        justifyContent="between"
                      >
                        <Label htmlFor="existingAdsFilter">
                          <Text size="300">
                            Existing ads only
                          </Text>
                        </Label>
                      </Box>
                    </Box>
                    <Divider />
                    <TapArea fullHeight onTap={() => resetState()}>
                      <Box height="100%" marginTop={5}>
                        <Text align="center" weight="bold">
                          Clear all
                        </Text>
                      </Box>
                    </TapArea>
                  </Box>
                </Popover>
              </Box>
            )}
          </Sheet>
        </Layer>
      )}
    </React.Fragment>
  )
}
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="More items then height of viewport"
            description="This example is common when the dropdown list is higher then viewport available"
            defaultCode={`
function Example() {
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    setElements(new Array(100).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = \`item \${index}\`;
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
    <Box height={500} width="100%">
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
              zIndex={new FixedZIndex(1000)}
            >
              {preRenderItems()}
            </Dropdown>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="Anchors on screen top corners"
            description="This case is when the anchor of dropdown is positioned on top screen corners"
            defaultCode={`
function Example() {
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState('');
  const anchorARef = React.useRef(null);
  const anchorBRef = React.useRef(null);

  React.useEffect(() => {
    setElements(new Array(10).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = \`item \${index}\`;
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
    <Box padding={2} height={500} width="100%">
      <Flex justifyContent="between" alignItems="start" width="100%">
        <IconButton
          accessibilityLabel="Menu open button"
          icon="arrow-down"
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
          >
            {preRenderItems()}
          </Dropdown>
        )}

        <IconButton
          accessibilityLabel="Menu open button"
          icon="arrow-down"
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
          >
            {preRenderItems()}
          </Dropdown>
        )}
      </Flex>
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="Anchors on screen bottom corners"
            description="This case is when the anchor of dropdown is positioned on bottom screen corners"
            defaultCode={`
function Example() {
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState('');
  const anchorARef = React.useRef(null);
  const anchorBRef = React.useRef(null);

  React.useEffect(() => {
    setElements(new Array(10).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = \`item \${index}\`;
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
    <Box padding={2} height={500} width="100%">
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
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="Dropdown rendered inner sheet"
            description="This case shows the Dropdown inner a Sheet component"
            defaultCode={`
function Example() {
  const [shouldShow, setShouldShow] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [elements, setElements] = React.useState([]);
  const anchorRef = React.useRef(null);

  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  React.useEffect(() => {
    setElements(new Array(10).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = \`item \${index}\`;
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
    <React.Fragment>
      <Box padding={8} width="100%">
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
    </React.Fragment>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="Scrollable container"
            description="Dropdown inner scrollable container, should have a 'ScrollBoundaryContainer' around the dropdown implementation. The `maxHeight` used to limit the dropdown list height is based on ScrollBoundaryContainer height."
            defaultCode={`
function ScrollableContainer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [elements, setElements] = React.useState([]);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    setElements(new Array(10).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = \`item \${index}\`;
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
    <Box padding={8} height={500} overflow="scrollY" width="100%">
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
            `}
          />
          <MainSection.Card
            cardSize="lg"
            title="Scrollable container 2"
            description="Dropdown inner scrollable container, should have a 'ScrollBoundaryContainer' around the dropdown implementation. The `maxHeight` used to limit the dropdown list height is based on ScrollBoundaryContainer height."
            defaultCode={`
function ScrollableContainerB() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [elements, setElements] = React.useState([]);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    setElements(new Array(20).fill(undefined));
  }, [setElements]);

  const handleSelect = ({ item }) => {
    setSelectedElement(item);
  };

  const preRenderItems = () =>
    elements.map((item, index) => {
      const text = \`item \${index}\`;
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
    <Box padding={8} height={500} overflow="scrollY" color="successBase" width="100%">
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
            `}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
