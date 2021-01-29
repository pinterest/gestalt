// @flow strict
import React, { type Node } from 'react';
import Card from './components/Card.js';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Layer"
    description="Layers allow you to render children outside the DOM hierarchy of the parent. It's a wrapper around React createPortal that lets you use it as a component. This is particularly useful for places you might have needed to use z-index to overlay the screen before."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
        required: true,
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        description: `An object representing the zIndex value of the Layer.`,
      },
    ]}
  />,
);

card(
  <Card
    description="
    Because creating a portal in Layer depends on DOM manipulation, if document is not present,
    such as in a server rendering environment, the children will not be rendered.
  "
    name="Server Rendering"
  />,
);

card(
  <Example
    description="
    Child content will be rendered outside the DOM hierarchy for easy overlaying. Click to see an example.
  "
    name="Overlaying Content"
    defaultCode={`
function Example() {

  const [showLayer, setShowLayer] = React.useState(false);

  return (
    <>
      <Button
        inline
        text="Show Layer"
        onClick={() => setShowLayer(!showLayer)}
      />
      {showLayer && (
        <Layer>
          <Box color="darkWash" position="fixed" top left right bottom display="flex" alignItems="center" justifyContent="center">
            <Box color="white" padding={3} display="flex" alignItems="center">
              <Text>Layer Content</Text>
              <Box marginStart={2}>
                <IconButton
                  accessibilityLabel="Close"
                  icon="cancel"
                  onClick={() => setShowLayer(!showLayer)}
                />
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}
`}
  />,
);

card(
  <Example
    description="
The example below shows using a \`FixedZIndex\` for the header zIndex and a \`CompositeZIndex\` to stack the Layer on top of it.
    "
    name="zIndex"
    defaultCode={`
function zIndexExample() {
  const [showLayer, setShowLayer] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(100);
  // Results in a zIndex of 101
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <>
      <Button
        inline
        text="Show Layer"
        onClick={() => setShowLayer(!showLayer)}
      />
      {showLayer && (
        <Layer zIndex={zIndex}>
          <Box color="darkWash" position="fixed" top left right bottom display="flex" alignItems="center" justifyContent="center">
            <Box color="white" padding={3} display="flex" alignItems="center">
              <Text>Layer Content</Text>
              <Box marginStart={2}>
                <IconButton
                  accessibilityLabel="Close"
                  icon="cancel"
                  onClick={() => setShowLayer(!showLayer)}
                />
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}
`}
  />,
);

export default cards;
