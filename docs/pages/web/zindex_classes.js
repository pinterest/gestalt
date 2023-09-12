// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import foundationalComponentsExample from '../../examples/zindex_classes/foundationalComponentsExample.js';
import layerExample from '../../examples/zindex_classes/layerExample.js';

export default function DocsPage(): Node {
  return (
    <Page title="Z-Index Classes">
      <PageHeader
        name="Z-Index Classes"
        description="FixedZIndex and CompositeZIndex are utility classes that generate z-indices for Gestalt components."
      />

      <AccessibilitySection name="Z-Index Classes" />

      <MainSection name="FixedZIndex">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description={`
FixedZIndex is used for setting fixed z-index values. Use this class when you want to create an initial z-index to stack others on top of. FixedZIndex must be instantiated with a number.
~~~jsx
import { FixedZIndex } from 'gestalt';

const fixedZindex = new FixedZIndex(1);
~~~
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="CompositeZIndex">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description={`
CompositeZIndex is used for dynamically composing z-index values. Use this class to layer components on top of an existing z-index in the stacking context.

CompositeZIndex must be instantiated with an array of FixedZIndex or CompositeZIndex instances. CompositeZIndex returns the highest z-index value in the array +1.

~~~jsx
import { CompositeZIndex, FixedZIndex } from 'gestalt';

const fixedZIndex = new FixedZIndex(1); //z-index value: 1

const compositeZIndex = new CompositeZIndex([fixedZIndex]); //z-index value: 2

const highestCompositeZIndex = new CompositeZIndex([fixedZIndex, compositeZIndex]); //z-index value: 3
~~~
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
Export FixedZIndex and CompositeZIndex rather than the z-index values itself.
~~~jsx
// exporting file
import { FixedZIndex } from 'gestalt';

export const BaseZIndex = = new FixedZIndex(1);

// importing file
import { BaseZIndex } from './path/to/your/zindex/file.js';

const BoxWithZIndex = <Box zIndex={BaseZIndex}/>
~~~
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
Export constant z-index values to create FixedZIndex and CompositeZIndex.
~~~jsx
// exporting file
export const BaseZIndex = 1;

// importing file
import { BaseZIndex } from './path/to/your/zindex/file.js';
import { FixedZIndex } from 'gestalt';

const BoxZIndex = new FixedZIndex(BaseZIndex);

const BoxWithZIndex = <Box zIndex={BoxZIndex}/>
~~~
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
Use CompositeZIndex to compose z-indices.
~~~jsx
// exporting file
import { FixedZIndex } from 'gestalt';

export const BaseZIndex = = new FixedZIndex(1);

// importing file
import { CompositeZIndex } from 'gestalt';

import { BaseZIndex } from './path/to/your/zindex/file.js';

const composedZIndex = new CompositeZIndex([BaseZIndex]);

const BoxWithZIndex = <Box zIndex={composedZIndex}/>
~~~
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
Use FixedZIndex to manually compose z-indices.
~~~jsx
// exporting file
export const BaseZIndex = 1;

// importing file
import { FixedZIndex } from 'gestalt';
import { BaseZIndex } from './path/to/your/zindex/file.js';

const composedZIndex = new FixedZIndex(BaseZIndex + 1);

const BoxWithZIndex = <Box zIndex={composedZIndex}/>
~~~
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
Use the lowest possible z-index values and compose them.
~~~jsx
import { CompositeZIndex, FixedZIndex } from 'gestalt';

const PageHeaderZindex = new FixedZIndex(1);

const ArticleZindex =new FixedZIndex(1);

const ArticleHeaderZindex = new CompositeZIndex([ArticleZindex]);

const SheetZindex = new CompositeZIndex([PageHeaderZindex, ArticleHeaderZindex]);

const modalZindex = new CompositeZIndex([SheetZindex]);

const ModalWithZIndex = <Layer zIndex={modalZindex}><Modal/></Layer>
~~~
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
Use unnecessarily high fixed z-index values.
~~~jsx
import { FixedZIndex } from 'gestalt';

const HeaderZindex = new FixedZIndex(1);

const MenuZindex =new FixedZIndex(1000);

const SheetZindex = new FixedZIndex(9999);

const modalZindex = new FixedZIndex(100000);

const ModalWithZIndex = <Layer zIndex={modalZindex}><Modal/></Layer>
~~~
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
Wrap non-Gestaltifiable HTML tags in Box and pass z-index classes.
~~~jsx
import { FixedZIndex } from 'gestalt';

const fixedZindex = new FixedZIndex(1);

const canvas = (
    <Box zIndex={fixedZindex}>
      <canvas
        id="myCanvas"
        width="200"
        height="100"
        style="border:1px solid #000000;"></canvas>
    </Box>
);
~~~
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
Extract z-index values from either z-index classes to use in non-Gestaltifiable HTML Tags. See [z-index in non-Gestalt components](#z-index-in-non-Gestalt-components) to learn more.
~~~jsx
import { FixedZIndex } from 'gestalt';

const fixedZindex = new FixedZIndex(1);

const canvas = (
  <canvas
    z-index={fixedZindex.index()}
    id="myCanvas"
    width="200"
    height="100"
    style="border:1px solid #000000;"></canvas>
);
~~~
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
Use Layer instead of z-index when a component needs to visually break out of its parent container, for example, in the case of [Modals](/web/modal), [OverlayPanels](/web/overlaypanel) and [Tooltips](/web/tooltip). See [Z-Index in foundational components](#zIndex-in-foundational-components) and [Z-Index in Layer](#zIndex-in-Layer) to learn more.
~~~jsx
const modal = (
  <Layer>
    <Modal>
      <Text>Modal</Text>
    </Modal>
  </Layer>
);
~~~
`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
Use Box with high fixed z-index values to position your components at the top of the stacking context or use them redundantly with [Layer](/web/layer). See [z-Index in foundational components](#zIndex-in-foundational-components) and [ZIndex in Layer](#zIndex-in-Layer) to learn more.
~~~jsx
import { FixedZIndex } from 'gestalt';

const MODAL_ZINDEX = new FixedZIndex(1000000);

const modalA = (
  <Box zIndex={MODAL_ZINDEX}>
    <Modal>
      <Text>Modal A</Text>
    </Modal>
  <Box>
);

const modalB = (
  <Layer>
    <Box zIndex={MODAL_ZINDEX}>
      <Modal>
        <Text>Modal B</Text>
      </Modal>
    <Box zIndex={MODAL_ZINDEX}>
  </Layer>
);


~~~
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="z-index in foundational components"
          description={`
[Box](/web/box), [Sticky](/web/sticky), and [Layer](/web/layer) are foundational components that have \`zIndex\` props. If any other components need to be positioned within their stacking context, wrap with one of these foundational components to set the z-index.

Layer creates a new stacking context. Unless there's a conflict with another z-index, don't pass unnecessary \`zIndex\` to Layer.

The following example sets a z-index in the Layer wrapping [OverlayPanel](/web/overlaypanel) to position OverlayPanel over the page header in the Docs. Set \`PAGE_HEADER_ZINDEX\` below 10 to see the importance of z-index in this example.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="z-index in foundational components"
                code={foundationalComponentsExample}
                previewHeight={400}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="z-index in Layer"
          description={`
[Modal](/web/modal) and [OverlayPanel](/web/overlaypanel) always require a parent [Layer](/web/layer) to position themselves outside the DOM hierarchy.

Components built on top of [Popover](/web/popover), such as [Tooltip](/web/tooltip), [Dropdown](/web/dropdown) and [ComboBox](/web/combobox), have a built-in Layer to be positioned outside the DOM hierarchy.  To set the internal z-index value of Layer, these Popover-based components have \`zIndex\` props as well. This is used when placing the Popover-based components within another component wrapped in Layer that has a z-index set.

However, Modal and OverlayPanel have a built-in [ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer) wrapping their children, so you shouldn’t need to pass z-index values when using Popover-based children.

The following example sets a z-index in the Layer wrapping [Modal](/web/modal) to position Modal over the page header in the Docs. Thanks to ScrollBoundaryContainer, child Tooltips don't require z-index.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="z-index in Layer"
                code={layerExample}
                previewHeight={400}
                layout="column"
              />
            }
          />{' '}
        </MainSection.Subsection>
        <MainSection.Subsection
          title="z-index in non-Gestalt components"
          description={`FixedZIndex and CompositeZIndex work with Gestalt components. To stay consistent across the codebase using Gestalt’s zIndex classes, you can extract z-index values from both FixedZIndex and CompositeZIndex in cases where the component doesn’t accept Gestalt’s z-index classes.

~~~jsx
import { FixedZIndex, CompositeZIndex } from 'gestalt';

const fixedZindex = new FixedZIndex(1);
const fixedZindexValue = fixedZindex.index(); // 1

const compositeZIndex = new CompositeZIndex([fixedZindex]);
const compositeZIndexValue = compositeZIndex.index(); // 2
~~~

However, this is an escape hatch that should only be used when the source code is not accessible, such as working with a third-party library. Otherwise, a better approach is to wrap the component or HTML element that needs a z-index in a Box. See [Best Practices](#Best-practices) for more info.
`}
        />
      </MainSection>

      <QualityChecklist component="Z-Index Classes" />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Layer](/web/layer)**
Layer allows you to render children outside the DOM hierarchy of the parent. This is useful for places you might otherwise need to use z-index to overlay the screen, simplifying the stacking context complexity in the app. See [z-Index in foundational components](#zIndex-in-foundational-components) and [ZIndex in Layer](#zIndex-in-Layer) to learn more.
    `}
        />
      </MainSection>
    </Page>
  );
}
