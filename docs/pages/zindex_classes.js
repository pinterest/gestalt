// @flow strict
import type { Node } from 'react';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';

export default function DocsPage(): Node {
  return (
    <Page title="Z-Index Classes">
      <PageHeader
        name="Z-Index Classes"
        description="FixedZIndex and CompositeZIndex are utility classes that generate z-indices for Gestalt components."
      />
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
Use Layer instead of z-index when a component needs to visually break out of its parent container, for example, in the case of [modals](/modal), [sheets](/sheet) and [tooltips](/tooltip). See [z-Index in foundational components](#zIndex-in-foundational-components) and [ZIndex in Layer](#zIndex-in-Layer) to learn more.
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
Use Box with high fixed z-index values to position your components at the top of the stacking context or use them redundantly with [Layer](/layer). See [z-Index in foundational components](#zIndex-in-foundational-components) and [ZIndex in Layer](#zIndex-in-Layer) to learn more.
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
[Box](/box), [Sticky](/sticky), and [Layer](/layer) are foundational components that have \`zIndex\` props. If any other components need to be positioned within their stacking context, wrap with one of these foundational components to set the z-index.

Layer creates a new stacking context. Unless there's a conflict with another z-index, don't pass unnecessary \`zIndex\` to Layer.

The following example sets a z-index in the Layer wrapping [Sheet](/sheet) to position Sheet over the page header in the Docs. Set \`PAGE_HEADER_ZINDEX\` below 10 to see the importance of z-index in this example.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ScrollBoundaryContainerExample() {
  const [showSheet, setShowSheet] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorDropdownRef = React.useRef(null);
  const handleSelect = ({ item }) => setSelected(item);

  /* ======= Z-INDEX  ======= */
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10)
  const SHEET_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX])

  const SearchBoardField = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.focus();
    }, []);

    return (
      <SearchField
        accessibilityLabel="Search boards field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search boards"
        size="lg"
        ref={ref}
      />
    )
  }

  const SelectBoard = () => {
    const [openPopover, setOpenPopover] = React.useState(false);
    const [selectedBoard, setSelectedBoard] = React.useState('Fashion');
    const anchorRef = React.useRef();

    const List = ({ title }) => (
      <Flex direction="column" gap={4}>
        <Text color="darkGray" size="sm">
          { title }
        </Text>
        <Flex direction="column" gap={4}>
          {[
            ['https://i.ibb.co/s3PRJ8v/photo-1496747611176-843222e1e57c.webp', 'Fashion', 'Thubnail image: a white dress with red flowers'],
            ['https://i.ibb.co/swC1qpp/IMG-0494.jpg', 'Food', 'Thubnail image: a paella with shrimp, green peas, red peppers and yellow rice'],
            ['https://i.ibb.co/PFVF3JH/photo-1583847268964-b28dc8f51f92.webp', 'Home', 'Thubnail image: a living room with a white couch, two paints in the wall and wooden furniture'],
          ].map((data, index) => (
              <TapArea
                key={index}
                onTap={() => {
                  setSelectedBoard(data[1]);
                  setOpenPopover(false);
                }}
                rounding={2}
              >
                <Flex gap={2} alignItems="center">
                  <Box height={50} width={50} overflow="hidden" rounding={2}>
                    <Mask rounding={2}>
                      <Image
                        alt={data[2]}
                        color="rgb(231, 186, 176)"
                        naturalHeight={50}
                        naturalWidth={50}
                        src={data[0]}
                      />
                    </Mask>
                  </Box>
                  <Text align="center" color="darkGray" weight="bold">
                    {data[1]}
                  </Text>
                </Flex>
              </TapArea>
          ))}
        </Flex>
      </Flex>
    );

    return (
      <React.Fragment>
          <Flex direction="column" gap={2}>
            <Text size="sm">Board</Text>
            <Button
              iconEnd="arrow-down"
              label="Select Board"
              onClick={() => setOpenPopover(!openPopover)}
              text={selectedBoard}
              ref={anchorRef}
            />
          </Flex>
        {openPopover && (
          <Layer>
            <Popover
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => setOpenPopover(false)}
              positionRelativeToAnchor={false}
              size="xl"
            >
              <Box width={360}>
                <Box flex="grow" marginEnd={4} marginStart={4} marginTop={6} marginBottom={8}>
                  <Flex direction="column" gap={6}>
                    <Text align="center" color="darkGray" weight="bold">
                      Save to board
                    </Text>
                    <SearchBoardField/>
                  </Flex>
                </Box>
                <Box height={300} overflow="scrollY">
                  <Box marginEnd={4} marginStart={4}>
                    <Flex direction="column" gap={8}>
                      <List title="Top choices"/>
                      <List title="All boards"/>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Popover>
          </Layer>
        )}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Button
        text="Edit Pin"
        onClick={() => setShowSheet(true)}
        size="lg"
      />
      {showSheet && (
        <Layer zIndex={SHEET_ZINDEX}>
          <Sheet
            accessibilityDismissButtonLabel="Close edit Pin sheet"
            accessibilitySheetLabel="Edit your Pin details"
            heading="Edit Pin"
            footer={
                <Flex>
                  <Flex.Item
                    flex="grow"
                  >
                    <Button
                      color="white"
                      text="Delete"
                      size="lg"
                      onClick={() => setShowSheet(false)}
                    />
                  </Flex.Item>
                  <Flex gap={2}>
                    <Button
                      text="Cancel"
                      size="lg"
                      onClick={() => setShowSheet(false)}
                    />
                    <Button
                      text="Done"
                      color="red"
                      size="lg"
                      type="submit"
                      onClick={() => setShowSheet(false)}
                    />
                  </Flex>
                </Flex>
            }
            onDismiss={() => setShowSheet(false)}
            size="lg"
          >
            <Box display="flex" height={400} paddingX={8}>
              <Flex gap={8} width="100%">
                <Box width={200} paddingX={2} rounding={4}>
                  <Mask rounding={4}>
                    <Image
                      alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
                      color="rgb(231, 186, 176)"
                      naturalHeight={751}
                      naturalWidth={564}
                      src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                    />
                  </Mask>
                </Box>
                <Flex.Item flex="grow">
                  <Flex direction="column" gap={8}>
                    <SelectBoard/>
                    <TextArea
                      id="note"
                      onChange={() => {}}
                      placeholder="Add note"
                      label="Note"
                      value=""
                    />
                  </Flex>
                </Flex.Item>
              </Flex>
              </Box>
          </Sheet>
        </Layer>
      )}
    </React.Fragment>
  )
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="z-index in Layer"
          description={`
[Modal](/modal) and [Sheet](/sheet) always require a parent [Layer](/layer) to position themselves outside the DOM hierarchy.

Components built on top of [Popover](/popover), such as [Tooltip](/tooltip), [Dropdown](/dropdown) and [ComboBox](/combobox), have a built-in Layer to be positioned outside the DOM hierarchy.  To set the internal z-index value of Layer, these Popover-based components have \`zIndex\` props as well. This is used when placing the Popover-based components within another component wrapped in Layer that has a z-index set.

However, Modal and Sheet have a built-in [ScrollBoundaryContainer](/scrollboundarycontainer) wrapping their children, so you shouldn’t need to pass z-index values when using Popover-based children.

The following example sets a z-index in the Layer wrapping [Modal](/modal) to position Modal over the page header in the Docs. Thanks to ScrollBoundaryContainer, child Tooltips don't require z-index.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ScrollBoundaryContainerExample() {
  const [showModal, setShowModal] = React.useState(false);
  const [alignText, setAlignText] = React.useState('left')

  /* ======= Z-INDEX  ======= */
  const PAGE_HEADER_ZINDEX = new FixedZIndex(10)
  const MODAL_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX])

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Button
          accessibilityLabel="Edit this Pin"
          bgColor="white"
          onClick={() => setShowModal(true)}
          text="Open edit modal"
          size="lg"
        />
      </Box>
      {showModal && (
        <Layer zIndex={MODAL_ZINDEX}>
          <Modal
            accessibilityModalLabel="Edit Pin"
            heading="Edit"
            size="lg"
            onDismiss={() => setShowModal(false)}
            footer={
              <Box
                flex="grow"
                paddingX={3}
                paddingY={3}
              >
                <Box
                  justifyContent="end"
                  marginStart={-1}
                  marginEnd={-1}
                  marginTop={-1}
                  marginBottom={-1}
                  display="flex"
                  wrap
                >
                  <Box
                    paddingX={1}
                    paddingY={1}
                  >
                    <Button
                      text="Cancel"
                      size="lg"
                      onClick={() => setShowModal(false)}
                    />
                  </Box>
                  <Box
                    paddingX={1}
                    paddingY={1}
                  >
                    <Button
                      text="Save"
                      color="red"
                      size="lg"
                      type="submit"
                      onClick={() => setShowModal(false)}
                    />
                  </Box>
                </Box>
              </Box>
            }
          >
              <Box
                column={12}
                display="flex"
                justifyContent="center"
              >
                <Box column={6} paddingX={4}>
                  <Image
                    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
                    color="rgb(231, 186, 176)"
                    naturalHeight={751}
                    naturalWidth={564}
                    src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                  >
                    <Box padding={3}>
                      <Heading
                        align={alignText}
                        color="white"
                        size="lg"
                      >
                        Tropic greens: The taste of Petrol and Porcelain
                      </Heading>
                    </Box>
                  </Image>
                </Box>
                <Flex direction="column" gap={4}>
                  <Heading size="sm" weight="bold">Text Overlay</Heading>
                  <Text size="lg">Add text directly onto your Pin</Text>
                  <Text size="lg" weight="bold">Alignment</Text>
                  <Flex>
                    <Tooltip text="Align left">
                      <IconButton
                        accessibilityLabel="Align left"
                        bgColor="white"
                        icon="text-align-left"
                        iconColor="darkGray"
                        onClick={() => setAlignText('left')}
                        size="lg"
                        selected={alignText === 'left'}
                      />
                    </Tooltip>
                    <Tooltip text="Align center">
                      <IconButton
                        accessibilityLabel="Align center"
                        bgColor="white"
                        icon="text-align-center"
                        iconColor="darkGray"
                        onClick={() => setAlignText('center')}
                        size="lg"
                        selected={alignText === 'center'}
                      />
                    </Tooltip>
                    <Tooltip text="Align right">
                      <IconButton
                        accessibilityLabel="Align right"
                        bgColor="white"
                        icon="text-align-right"
                        iconColor="darkGray"
                        onClick={() => setAlignText('right')}
                        size="lg"
                        selected={alignText === 'right'}
                      />
                    </Tooltip>
                  </Flex>
                </Flex>
            </Box>
          </Modal>
        </Layer>
      )}
    </>
  )
}`}
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
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Layer](/layer)**
Layer allows you to render children outside the DOM hierarchy of the parent. This is useful for places you might otherwise need to use z-index to overlay the screen, simplifying the stacking context complexity in the app. See [z-Index in foundational components](#zIndex-in-foundational-components) and [ZIndex in Layer](#zIndex-in-Layer) to learn more.
    `}
        />
      </MainSection>
    </Page>
  );
}
