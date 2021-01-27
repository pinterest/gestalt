// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ScrollableBox"
    fileName="ScrollableBox"
    description="ScrollableBox is a..."
  />
);

card(
  <Example
    description={`
The following example shows ...
  `}
    id="ScrollContext"
    name="With ScrollContext"
    defaultCode={`
function ScrollableBoxExample() {
  const [showLayer, setShowLayer] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <Provider id="docsExample">
      <ScrollableBox height="200px">
        <Box height="600px">
          <Box display='flex' justifyContent='center'>
            <Button
              ref={anchorRef}
              inline
              text="Toggle Layer in ScrollableBox"
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
                    Portal is attached to ScrollableBox
                  </Text>
                </Box>
              </Flyout>
            </Layer>
          )}
        </Box>
      </ScrollableBox>
    </Provider>
  )
}`}
  />
);

card(
  <Example
    description={`
The following example shows ...
  `}
    id="ScrollContextModal"
    name="With Modal"
    defaultCode={`
function ScrollableBoxExample() {
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
              <ScrollableBox height="200px">
                <Box color='red' height="600px">
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
                              Portal is attached to ScrollableBox
                            </Text>
                          </Box>
                        </Flyout>
                      </Layer>
                  )}
                </Box>
              </ScrollableBox>
              <ScrollableBox height="200px">
                <Box color='blue' height="600px">
                  <Box display='flex' justifyContent='start'>
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
                              Portal is attached to ScrollableBox
                            </Text>
                          </Box>
                        </Flyout>
                      </Layer>
                  )}
                </Box>
              </ScrollableBox>
            </Modal>
          </Layer>
        )}
        <ScrollableBox height="200px">
          <Box color='white' height="600px">
            <Box display='flex' justifyContent='center'>
              <Button
                ref={anchorWhiteRef}
                inline
                text="Show Flyout"
                onClick={() => setShowWhiteFlyout(!showWhiteFlyout)}
              />
            </Box>
            {showWhiteFlyout && (
                <Layer>
                  <Flyout
                    anchor={anchorWhiteRef.current}
                    idealDirection="up"
                    onDismiss={() => setShowWhiteFlyout(false)}
                    positionRelativeToAnchor={false}
                    size="md"
                    showCaret
                    color='white'
                  >
                    <Box
                      padding={3}
                      display="flex"
                      alignItems="center"
                      direction="column"
                      column={12}
                    >
                      <Text align="center" weight="bold">
                        Portal is attached to ScrollableBox
                      </Text>
                    </Box>
                  </Flyout>
                </Layer>
            )}
          </Box>
        </ScrollableBox>
    </>
  )
}`}
  />
);

export default cards;
