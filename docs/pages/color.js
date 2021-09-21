// @flow strict
import type { Node } from 'react';
import { Flex } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';
import ColorPalette from '../components/ColorPalette.js';
import ColorTile from '../components/ColorTile.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

const colors = [
  { name: 'Pushpin', id: 'red', textColor: 'white' },
  { name: 'Flaminglow', id: 'pink', textColor: 'darkGray' },
  { name: 'Skycicle', id: 'blue', textColor: 'darkGray' },
  { name: 'Spabattical', id: 'teal', textColor: 'darkGray' },
  { name: 'Matchacado', id: 'green', textColor: 'darkGray' },
  { name: 'Mysticool', id: 'purple', textColor: 'white' },
  { name: 'Firetini', id: 'orange', textColor: 'darkGray' },
  { name: 'Caramellow', id: 'yellow', textColor: 'darkGray' },
];

const neutrals = [
  { name: 'Mochimalist', id: 'white', textColor: 'darkGray' },
  { name: 'Roboflow', id: 'gray', textColor: 'darkGray' },
  { name: 'Cosmicore', id: 'black', textColor: 'white' },
];

card(
  <PageHeader
    name="Color"
    description={`
    Our color palettes are shared between Brand and Gestalt, and represent our full range of options.

    For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/). Please note however that this new color palette is not yet reflected on the Brand website.
    `}
    showSourceLink={false}
  />,
);

card(
  <MainSection
    name="Full Palettes"
    description={`In order to ensure accessible contrast for color pairings, we require our \`darkGray\` [Text](/Text) color to be used for any colors 400 and below. For 500 and above, we recommend using \`white\`.`}
  >
    <MainSection.Subsection title="Colors">
      <Flex gap={12} wrap>
        {colors.map(({ id, name }) => (
          <ColorPalette key={name} name={name} tokenId={id} />
        ))}
      </Flex>
    </MainSection.Subsection>

    <MainSection.Subsection title="Neutrals">
      <Flex direction="column">
        {neutrals.map(({ id, name }) => (
          <ColorPalette key={name} name={name} tokenId={id} />
        ))}
      </Flex>
    </MainSection.Subsection>

    <MainSection.Subsection
      title="Brand"
      description="These 450 colors are reserved for Brand usage. They are among the least accessible colors, so are reserved for larger brand moments, and not commonly used for functional color pairing. They should not be used within the product, except Pushpin 450, which is our hero primary color."
    >
      <Flex direction="column">
        {colors.map(({ id, name, textColor }) => (
          <ColorTile
            key={name}
            name={name}
            number={450}
            tokenId={id}
            textColor={textColor}
            showName
          />
        ))}
      </Flex>
    </MainSection.Subsection>
  </MainSection>,
);

export default function ColorPage(): Node {
  return <CardPage cards={cards} page="Color" />;
}
