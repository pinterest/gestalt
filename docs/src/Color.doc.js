// @flow strict
import type { Node } from 'react';
import { Flex } from 'gestalt';
import MainSection from './components/MainSection.js';
import PageHeader from './components/PageHeader.js';
import ColorPalette from './components/ColorPalette.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Color"
    description={`
    Brand Color Palette
    `}
  />,
);

card(
  <MainSection name="Full Brand Palette">
    <MainSection.Subsection>
      <Flex direction="column" gap={6}>
        <Flex direction="row" gap={6} wrap>
          <ColorPalette name="Pushpin" tokenId="pushpin-red" />
          <ColorPalette name="Flaminglow" tokenId="flaminglow-pink" />
        </Flex>
        <Flex direction="row" gap={6}>
          <ColorPalette name="Skycicle" tokenId="skycicle-blue" />
        </Flex>
      </Flex>
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
