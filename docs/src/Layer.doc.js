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
  />
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
  />
);

card(
  <Card
    description="
    Because creating a portal in Layer depends on DOM manipulation, if document is not present,
    such as in a server rendering environment, the children will not be rendered.
  "
    name="Server Rendering"
  />
);

card(
  <Example
    description="
    Since Layer is rendered within a portal element being manually added to the DOM, it is supposed to be rendered and dismissed only once. 
    Any re-renders triggered by the parent will effectively remove the portal element from the DOM, hence it won't be recreated and internal elements like Sheet may not reappear.
    The example below demonstrates a technique to avoid the re-rendering of Layer by making sure parent re-renders don't force children re-renders. This is accomplished by memoizing locally-defined functions with React.useCallback() if they're passed down as props, and memoizing the entire component with React.memo().
  "
    name="Avoid Re-rendering"
    defaultCode={`
function Example() {
  // We're using React.memo() here to prevent re-renders. This is similar to
  // shouldComponentUpdate(), but for functional components.
  const ResilientLayer = React.memo((props) => {
    const { onDismiss, shouldShow } = props;

    if (!shouldShow) {
      return null;
    }
    return (
      <Layer>
        <Sheet 
          accessibilityDismissButtonLabel="Close"
          accessibilitySheetLabel="Resilient layer"
          onDismiss={onDismiss}
        >
          <Text>Resilient Layer Content</Text>
        </Sheet>
      </Layer>
    );
  });

  const [showLayer, setShowLayer] = React.useState(false);

  // We're using React.useCallback() here to memoize this function since it 
  // gets passed down as a prop to <ResilientLayer>.
  // It's very important to pass down any function prop using useCallback,
  // otherwise, each parent re-render would recreate these functions, 
  // which would force a children re-render as it receives different props.
  // In our case, our children Layer would re-render and destroy its contents.
  const onDismiss = React.useCallback(() => setShowLayer(false), []);

  return (
    <>
      <Button
        inline
        text="Show Resilient Layer"
        onClick={() => setShowLayer(true)}
      />
      <ResilientLayer onDismiss={onDismiss} shouldShow={showLayer} />
    </>
  );
}
`}
  />
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
  />
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
  />
);

export default cards;
