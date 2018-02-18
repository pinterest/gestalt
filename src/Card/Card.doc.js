// @flow
import * as React from 'react';

import Avatar from '../Avatar/Avatar';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Card from './Card';
import Link from '../Link/Link';
import Text from '../Text/Text';
import { ns, card, md, PropTable, Example } from '../../.corkboard/src/cards';

ns(
  'Card',
  `
The Card component allows for a special animation on hover. It visually shows that items belong together.
`
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'active',
        type: '?boolean',
        defaultValue: false,
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<> })',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<> })',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  md`
    Using \`Card\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `,
  <Example
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
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          <Text>
            <Link href="https://pinterest.com">
              <Mask shape="circle" wash={this.state.hovered}>
                <Avatar
                  name="Ben Silbermann"
                  src="https://image.ibb.co/dzLoRv/Ben_Silberman.jpg"
                />
              </Mask>
              <Box paddingX={3} paddingY={2}>
                <Text align="center" bold size="xl">
                  {'Ben Silbermann'}
                </Text>
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
  />,
  { stacked: true }
);
