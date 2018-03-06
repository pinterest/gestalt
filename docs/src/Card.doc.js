// @flow
import * as React from 'react';
import { Avatar, Box, Button, Card, Link, Text } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Card"
    description="
The Card component is meant to highlight content in grids. It visually shows that items belong together and highlights the items on hover.
"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'active',
        type: '?boolean',
        defaultValue: false,
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'image',
        type: 'React.Node',
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> })',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> })',
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    description={`
    Using \`Card\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
    name="Example"
    defaultCode={`
class CardExample extends React.Component {
constructor(props) {
  super(props);
  this.state = { hovered: false };
  this.handleMouseEnter = this._handleMouseEnter.bind(this);
  this.handleMouseLeave = this._handleMouseLeave.bind(this);
}
_handleMouseEnter() {
  this.setState(() => ({ hovered: true }));
}
_handleMouseLeave() {
  this.setState(() => ({ hovered: false }));
}
render() {
  return (
    <Box maxWidth={236} padding={2} column={12}>
      <Card
        image={
          <Avatar
            name="Ben Silbermann"
            src="https://image.ibb.co/dzLoRv/Ben_Silberman.jpg"
          />
        }
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <Text align="center" bold size="xl">
          <Link href="https://pinterest.com">
            <Box paddingX={3} paddingY={2}>
                Ben Silbermann
            </Box>
          </Link>
        </Text>
        <Button
          accessibilityLabel="Follow Ben Silbermann - Pinterest CEO"
          color="red"
          text="Follow"
        />
      </Card>
    </Box>
  );
}
}
`}
    scope={{ Avatar, Box, Button, Card, Link, Text }}
  />
);

export default () => <CardPage cards={cards} />;
