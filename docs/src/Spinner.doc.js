// @flow
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(<PageHeader name="Spinner" />);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'show',
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
      {
        name: 'delay',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description:
          'Whether or not to render with a 300ms delay. The delay is for perceived performance so you should rarely need to remove it.',
      },
      {
        name: 'size',
        type: `"sm" | "md"`,
        description: `sm: 32px, md: 40px`,
        defaultValue: 'md',
      },
    ]}
  />
);

card(
  <Example
    description={`
    Spinners indicate when a user has to wait for something else to occur. They delay showing for 300ms to improve perceived performance.

    The label on a spinner is for accessibility. You should pick labels that relate to the specific part of the product it's being used in ("Loading homefeed" for instance).
  `}
    name="Example"
    defaultCode={`
class SpinnerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.setState(prevState => ({
      ...prevState,
      show: !prevState.show
    }));
  }
  render() {
    return (
      <Box>
        <Box paddingY={2}>
          <Button
            inline
            text={!this.state.show ? "Show spinner" : "Hide spinner"}
            onClick={this.handleClick}
            size="md"
          />
        </Box>
        <Spinner show={this.state.show} accessibilityLabel="Example spinner" />
        <Text>Data</Text>
      </Box>
    );
  }
}
`}
  />
);

export default cards;
