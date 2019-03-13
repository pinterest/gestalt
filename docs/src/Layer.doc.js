// @flow
import * as React from 'react';
import Card from './components/Card.js';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

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
    Child content will be rendered outside the DOM hierarchy for easy overlaying. Click to see an example.
  "
    name="Overlaying Content"
    defaultCode={`
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this._handleToggle.bind(this);
    this.state = {
      showLayer: false,
    };
  }

  _handleToggle() {
    this.setState(prevState => ({ showLayer: !prevState.showLayer }));
  }

  render() {
    const { showLayer } = this.state;
    return (
      <Box marginLeft={-1} marginRight={-1}>
        <Box padding={1}>
          <Button
            text="Show Layer"
            onClick={this.handleToggle}
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
                      onClick={this.handleToggle}
                    />
                  </Box>
                </Box>
              </Box>
            </Layer>
          )}
        </Box>
      </Box>
    );
  }
}
`}
  />
);

export default cards;
