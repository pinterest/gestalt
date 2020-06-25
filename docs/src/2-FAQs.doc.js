// @flow strict
import * as React from 'react';
import { Heading, Text } from 'gestalt';

const cards = [];
const card = c => cards.push(c);

card(<Heading>FAQs</Heading>);
card(<Text>COMING SOON! </Text>);

export default cards;

const navRoute = { section: 'getting-started', group: 'none' };
export { navRoute };
