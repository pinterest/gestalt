// @flow
import * as React from 'react';
import { Button, Spinner } from 'gestalt';
import Example from './components/Example';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

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
    ]}
    heading={false}
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
    scope={{ Button, Spinner }}
  />
);

export default () => <CardPage cards={cards} />;
