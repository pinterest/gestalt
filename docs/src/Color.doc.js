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
    Our color palettes are shared between Brand and Gestalt, and represent our full range of options. For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/).
    `}
  />,
);

card(
  <MainSection
    name="Full Palettes"
    description="In order to ensure accessible contrast for color pairings, we require a dark font color to be used for any colors 400 and below. For 500 and above, we recommend using white."
  >
    <MainSection.Subsection title="Colors">
      <Flex direction="column" gap={12}>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Pushpin" tokenId="pushpin-red" />
          <ColorPalette name="Flaminglow" tokenId="flaminglow-pink" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Skycicle" tokenId="skycicle-blue" />
          <ColorPalette name="Spabattical" tokenId="spabattical-teal" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Matchacado" tokenId="matchacado-green" />
          <ColorPalette name="Mysticool" tokenId="mysticool-purple" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Firetini" tokenId="firetini-orange" />
          <ColorPalette name="Caramellow" tokenId="caramellow-yellow" />
        </Flex>
      </Flex>
    </MainSection.Subsection>
    <MainSection.Subsection title="Neutrals">
      <Flex direction="column" gap={12}>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Mochimalist" tokenId="mochimalist-white" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Roboflow" tokenId="roboflow-gray" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Cosmicore" tokenId="cosmicore-black" />
        </Flex>
      </Flex>
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
