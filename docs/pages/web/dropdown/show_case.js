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
            cardSize="md"
            title="More items then height of viewport"
            description="testing"
            defaultCode={`
function PopoverOverflowingViewport() {
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
            `}
          />
          <MainSection.Card
            cardSize="md"
            title="CornerTop"
            description="testing"
            defaultCode={`
function CornerTop(): Node {
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
    <Box padding={2} height={500}>
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
            cardSize="md"
            title="CornerTop"
            description="testing"
            defaultCode={`
function CornerBottom() {
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
            `}
          />
          <MainSection.Card
            cardSize="md"
            title="Inner Sheet"
            description="Dropdown inner sheet tab"
            defaultCode={`
function InnerSheet() {
  const [shouldShow, setShouldShow] = React.useState(true);
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
            `}
          />
          <MainSection.Card
            cardSize="md"
            title="Scrollable container"
            description="Dropdown inner scrollable container, should have a 'ScrollBoundaryContainer' around the dropdown implementation"
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
            `}
          />
          <MainSection.Card
            cardSize="md"
            title="Scrollable container 2"
            description="Dropdown inner scrollable container, should have a 'ScrollBoundaryContainer' around the dropdown implementation"
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
            `}
          />
          <MainSection.Card
            cardSize="md"
            title="Page Header"
            description="Dropdown inner Page Header"
            defaultCode={`
function PageHeaderExample() {
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [elements, setElements] = React.useState([]);

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
            `}
          />
          <MainSection.Card
            cardSize="md"
            title="Fixed button"
            description="Dropdown inner fixed button"
            defaultCode={`
function FixedButton() {
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
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
            `}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
