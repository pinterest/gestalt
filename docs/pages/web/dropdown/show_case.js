// @flow strict
import { type Node } from 'react';
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
          <MainSection.Card
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
          />
          <MainSection.Card
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
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
