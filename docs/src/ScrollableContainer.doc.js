// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ScrollableContainer"
    fileName="ScrollableContainer"
    description="ScrollableContainer is a pass-through component that allows flyout-based components get correctly positioned inside scrolling containers"
  />,
);

card(
  <Example
    id="ScrollableContainer"
    name="With ScrollableContainer"
    defaultCode={`
function ScrollableContainerExample() {
  const [showLayer, setShowLayer] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box height={150}>
      <ScrollableContainer>
        <Box height={600}>
          <Box display='flex' justifyContent='center'>
            <Button
              ref={anchorRef}
              inline
              text="Toggle Layer in ScrollableContainer"
              onClick={() => setShowLayer(!showLayer)}
            />
          </Box>
          {showLayer && (
            <Layer>
              <Flyout
                anchor={anchorRef.current}
                idealDirection="up"
                onDismiss={() => setShowLayer(false)}
                positionRelativeToAnchor={false}
                size="md"
                showCaret
                color='red'
              >
                <Box
                  padding={3}
                  display="flex"
                  alignItems="center"
                  direction="column"
                  column={12}
                >
                  <Text align="center" weight="bold">
                    Portal is attached to ScrollableContainer
                  </Text>
                </Box>
              </Flyout>
            </Layer>
          )}
        </Box>
      </ScrollableContainer>
    </Box>
  )
}`}
  />,
);

card(
  <Example
    id="ScrollableContainerModal"
    name="With Modal"
    defaultCode={`
function ScrollableContainerExample() {
  const [showModal, setShowModal] = React.useState(false);
  const [showWhiteFlyout, setShowWhiteFlyout] = React.useState(false);
  const [showRedFlyout, setShowRedFlyout] = React.useState(false);
  const [showBlueFlyout, setShowBlueFlyout] = React.useState(false);
  const anchorWhiteRef = React.useRef();
  const anchorRedRef = React.useRef();
  const anchorBlueRef = React.useRef();
  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Button
          inline
          text="Show Modal"
          onClick={() => setShowModal(true)}
        />
      </Box>
      {showModal && (
        <Layer>
          <Modal accessibilityModalLabel='test' heading="Small modal" size='lg' onDismiss={() => setShowModal(false)}>
            <ScrollableContainer height={200}>
              <Box color='red' height={600}>
                <Box display='flex' justifyContent='center'>
                  <Button
                    ref={anchorRedRef}
                    inline
                    text="Show Flyout"
                    onClick={() => setShowRedFlyout(!showRedFlyout)}
                  />
                </Box>
                {showRedFlyout && (
                    <Layer>
                      <Flyout
                        anchor={anchorRedRef.current}
                        idealDirection="up"
                        onDismiss={() => setShowRedFlyout(false)}
                        positionRelativeToAnchor={false}
                        size="md"
                        showCaret
                      >
                        <Box
                          padding={3}
                          display="flex"
                          alignItems="center"
                          direction="column"
                          column={12}
                        >
                          <Text align="center" weight="bold">
                            Portal is attached to ScrollableContainer
                          </Text>
                        </Box>
                      </Flyout>
                    </Layer>
                )}
              </Box>
            </ScrollableContainer>
            <ScrollableContainer height={200}>
              <Box color="blue" height={600}>
                <Box display="flex" justifyContent="start">
                  <Button
                    ref={anchorBlueRef}
                    inline
                    text="Show Flyout"
                    onClick={() => setShowBlueFlyout(!showBlueFlyout)}
                  />
                </Box>
                {showBlueFlyout && (
                  <Layer>
                    <Flyout
                      anchor={anchorBlueRef.current}
                      idealDirection="left"
                      onDismiss={() => setShowBlueFlyout(false)}
                      positionRelativeToAnchor={false}
                      size="md"
                      showCaret
                    >
                      <Box
                        padding={3}
                        display="flex"
                        alignItems="center"
                        direction="column"
                        column={12}
                      >
                        <Text align="center" weight="bold">
                          Portal is attached to ScrollableContainer
                        </Text>
                      </Box>
                    </Flyout>
                  </Layer>
                )}
              </Box>
            </ScrollableContainer>
          </Modal>
        </Layer>
      )}
    </>
  )
}`}
  />,
);

export default cards;
