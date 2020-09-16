// @flow strict
import React, { type Node } from 'react';
import { Box, Icon, Row, Stack, Text } from 'gestalt';
import Example from './components/Example.js';
import Card from './components/Card.js';
import PageHeader from './components/PageHeader.js';
import Markdown from './components/Markdown.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="FixedZIndex and CompositeZIndex"
    fileName="zIndex"
    description="FixedZIndex and CompositeZIndex are 2 classes that generate z-index for the Box and Sticky components."
  />
);

card(
  <Card name="FixedZIndex">
    <Stack gap={4}>
      <Text>
        FixedZIndex is used for setting fixed z-index values. FixedZIndex must
        be instantiated with a number.
      </Text>
      <Box padding={2} color="lightGray" rounding={2}>
        <Markdown
          text="
~~~jsx
import { FixedZIndex } from 'gestalt';
const fixedZindex = new FixedZIndex(1);
~~~
  "
        />
      </Box>
    </Stack>
  </Card>
);

card(
  <Card name="CompositeZIndex">
    <Stack gap={4}>
      <Text>
        CompositeZIndex is used for dynamically composing z-index values.
        CompositeZIndex must be instantiated with an array of FixedZIndex or
        CompositeZIndex instances.
      </Text>
      <Box padding={2} color="lightGray" rounding={2}>
        <Markdown
          text="
~~~jsx
import { CompositeZIndex, FixedZIndex } from 'gestalt';
const fixedZIndex = new FixedZIndex(1);
const compositeZIndex = new CompositeZIndex([fixedZIndex]);
const highestCompositeZIndex = new CompositeZIndex([fixedZIndex, compositeZIndex]);
~~~
  "
        />
      </Box>
    </Stack>
  </Card>
);

card(
  <Example
    description={`
The following example shows an overlay and how 2 Avatar components use the zIndex prop in Box to position themselves under and above the overlay.
  `}
    id="zindex"
    name="ZIndex"
    defaultCode={`
function ZIndexBoxExample() {
  const underOverlayZIndex = new FixedZIndex(1);
  const overlayZIndex  = new CompositeZIndex([underOverlayZIndex]);
  const aboveOverlayZIndex = new CompositeZIndex([overlayZIndex]);

  return (
      <Box width={125} height={250} position="relative">
        <Box
          color="transparentDarkGray"
          height="100%"
          position="absolute"
          width="100%"
          zIndex={overlayZIndex}
        />
        <Stack gap={2}>
          <Box position="absolute" zIndex={underOverlayZIndex} >
            <Avatar
              size="xl"
              src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
              name="Keerthi"
            />
          </Box>
          <Box bottom position="absolute" zIndex={aboveOverlayZIndex}>
            <Avatar
              size="xl"
              src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
              name="Keerthi"
            />
          </Box>
        </Stack>
      </Box>
  )
}
`}
  />
);

card(
  <Card name="Note">
    <Stack gap={4}>
      <Text>
        FixedZIndex and CompositeZIndex work with Box and Sticky components. To
        stay consistent across your codebase using zIndex classes, you can
        extract zIndex values from both zIndex classes in cases where the zIndex
        receptor does not accept zIndex classes.
      </Text>
      <Box padding={2} color="lightGray" rounding={2}>
        <Markdown
          text="
~~~jsx
import { FixedZIndex, CompositeZIndex } from 'gestalt';
~~~
  "
        />
        <Markdown
          text="
~~~jsx
const fixedZindex = new FixedZIndex(1);
const compositeZIndex = new CompositeZIndex([fixedZindex]);
~~~
  "
        />
        <Markdown
          text="
~~~jsx
const fixedZindexValue = fixedZindex.index(); // 1
const compositeZIndexValue = compositeZIndex.index(); // 2
~~~
  "
        />
      </Box>
      <Text>
        However, this is an escape hatch that should only be used in cases like
        needing to work with a third party library. For any other case, a better
        approach is to wrap the component that needs a zIndex in a Box.
      </Text>
      <Box padding={2} color="lightGray" rounding={2}>
        <Markdown
          text="
~~~jsx
import { FixedZIndex } from 'gestalt';
const fixedZindex = new FixedZIndex(1);
~~~
  "
        />
        <Row gap={2}>
          <Icon icon="cancel" accessibilityLabel="Cancel" />
          <Markdown
            text="
~~~jsx
const customButton = <CustomButton zIndex={fixedZindex.index()}/>;
~~~
  "
          />
        </Row>
        <Row gap={2}>
          <Icon icon="check" accessibilityLabel="Cancel" />
          <Markdown
            text="
~~~jsx
const customButton = <Box zIndex={fixedZindex}> <CustomButton/> </Box>;
~~~
  "
          />
        </Row>
      </Box>
    </Stack>
  </Card>
);

export default cards;
