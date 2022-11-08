// @flow strict
import { type Node } from 'react';
import { ScrollBoundaryContainer } from 'gestalt';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';

// Examples
import PopoverOverflowingViewport from '../../../examples/dropdown/PopoverOverflowingViewport.js';
import CornerTop from '../../../examples/dropdown/CornerTop.js';
import CornerBottom from '../../../examples/dropdown/CornerBottom.js';
import InnerSheet from '../../../examples/dropdown/InnerSheet.js';
import ScrollableContainer from '../../../examples/dropdown/ScrollableContainer.js';
import PageHeaderExample from '../../../examples/dropdown/PageHeader.js';
import FixedButtonExample from '../../../examples/dropdown/FixedButton.js';
import ScrollableContainerB from '../../../examples/dropdown/ScrollableContainerB.js';

export default function DropdownShowCase(): Node {
  return (
    <Page title="Dropdown - Show case">
      <PageHeader badge="pilot" name="Dropdown" type="guidelines" />
      <MainSection name="Examples">
        <MainSection.Subsection>
          {/* <MainSection.Card
            cardSize="md"
            title="More items then height of viewport"
            description="testing"
            sandpackExample={
              <SandpackExample
                code={PopoverOverflowingViewport}
                name="Testing"
                previewHeight={500}
              />
            }
          /> */}
          <MainSection.Card
            cardSize="md"
            title="Fixed button"
            description="Dropdown inner fixed button"
            previewHeight={800}
            defaultCode={`
function ScrollableContainerB() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [elements, setElements] = React.useState([]);
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
    <Box padding={8} height="100%" overflow="scrollY" color="successBase" width="500px">
      <Box height={800} color="errorBase" overflow="hidden">
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
          </Box>
          </Box>
  );
}

            `}
          />

          {/* <MainSection.Card
            cardSize="md"
            title="CornerTop"
            description="testing"
            sandpackExample={
              <SandpackExample code={CornerTop} name="Testing" previewHeight={500} />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="CornerTop"
            description="testing"
            sandpackExample={
              <SandpackExample code={CornerBottom} name="Testing" previewHeight={500} />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Inner Sheet"
            description="Dropdown inner sheet tab"
            sandpackExample={
              <SandpackExample code={InnerSheet} name="Inner sheet" previewHeight={500} />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Scrollable container"
            description="Dropdown inner scrollable container, should have a 'ScrollBoundaryContainer' around the dropdown implementation"
            sandpackExample={
              <SandpackExample
                code={ScrollableContainer}
                name="ScrollableContainer"
                previewHeight={500}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Scrollable container 2"
            description="Dropdown inner scrollable container, should have a 'ScrollBoundaryContainer' around the dropdown implementation"
            sandpackExample={
              <SandpackExample
                code={ScrollableContainerB}
                name="ScrollableContainer 2"
                previewHeight={500}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Page Header"
            description="Dropdown inner Page Header"
            sandpackExample={
              <SandpackExample code={PageHeaderExample} name="PageHeader" previewHeight={500} />
            }
          />
          <MainSection.Card
            cardSize="md"
            title="Fixed button"
            description="Dropdown inner fixed button"
            sandpackExample={
              <SandpackExample code={FixedButtonExample} name="Fixed Button" previewHeight={500} />
            }
          /> */}
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
