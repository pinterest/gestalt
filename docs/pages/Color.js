// @flow strict
import type { Node } from 'react';
import { Flex } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';
import ColorPalette from '../components/ColorPalette.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Color"
    description={`
    Our color palettes are shared between Brand and Gestalt, and represent our full range of options. For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/). Please note however that this new color palette is not yet reflected on the Brand website.
    `}
  />,
);

card(
  <MainSection
    name="Full Palettes"
    description={`In order to ensure accessible contrast for color pairings, we require our \`darkGray\` [Text](/Text) color to be used for any colors 400 and below. For 500 and above, we recommend using \`white\`.`}
  >
    <MainSection.Subsection title="Colors">
      <Flex direction="column" gap={12}>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Pushpin" tokenId="red" />
          <ColorPalette name="Flaminglow" tokenId="pink" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Skycicle" tokenId="blue" />
          <ColorPalette name="Spabattical" tokenId="teal" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Matchacado" tokenId="green" />
          <ColorPalette name="Mysticool" tokenId="purple" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Firetini" tokenId="orange" />
          <ColorPalette name="Caramellow" tokenId="yellow" />
        </Flex>
      </Flex>
    </MainSection.Subsection>
    <MainSection.Subsection title="Neutrals">
      <Flex direction="column" gap={12}>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Mochimalist" tokenId="white" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Roboflow" tokenId="gray" />
        </Flex>
        <Flex direction="row" gap={12} wrap>
          <ColorPalette name="Cosmicore" tokenId="black" />
        </Flex>
      </Flex>
    </MainSection.Subsection>
  </MainSection>,
);

export default function BadgePage(): Node {
  return <CardPage cards={cards} page="Badge" />;
}
