// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ScrollBox"
    fileName="ScrollBox"
    description="ScrollBox is a..."
  />
);

card(
  <Example
    description={`
The following example shows ...
  `}
    id="ScrollBox"
    name="ScrollBox"
    defaultCode={`
function ScrollBoxExample() {
  const [showLayer, setShowLayer] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <Provider id="docsExample">
      <ScrollBox height="200px">
        <Box height="600px">
          <Box ref={anchorRef}>
            <Button
              inline
              text="Toggle Layer in ScrollBox"
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
              >
                <Box
                  padding={3}
                  display="flex"
                  alignItems="center"
                  direction="column"
                  column={12}
                >
                  <Text align="center" weight="bold">
                    Portal is attached to ScrollBox
                  </Text>
                </Box>
              </Flyout>
            </Layer>
          )}
        </Box>
      </ScrollBox>
    </Provider>
  )
}
`}
  />
);

export default cards;
