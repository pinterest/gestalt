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
