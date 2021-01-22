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
    id="ScrollableBox"
    name="ScrollableBox"
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

export default cards;
