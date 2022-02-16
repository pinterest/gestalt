// @flow strict
import type { Node } from 'react';
import { Flex } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import ColorPalette from '../components/ColorPalette.js';
import ColorTile from '../components/ColorTile.js';
import Page from '../components/Page.js';

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

export default function ColorPage(): Node {
  return (
    <Page title="Color Palette">
      <PageHeader
        name="Color palette"
        description={`
        Our color palettes are shared between Brand and Gestalt, and represent our full range of options. The colors are divided into baseline, extended, and reserved colors.

        For further Brand guidance, please reference the [Brand guidelines website](https://brand.pinterest.com/).
        `}
        showSourceLink={false}
      />
      <MainSection
        name="Baseline colors"
        description={`
        Our baseline palette helps to create consistency across products.
        The baseline palette is comprised of our hero and neutrals colors, allowing the Pinterest content to shine, while ensuring enough color contrast. In addition, these colors should be purpose-driven to provide a better user experience. Check out [Color Usage](/color_usage) for guidance.
        `}
      >
        <Flex direction="column">
          <ColorTile fullTokenName="color-red-pushpin-450" name="Pushpin" number={450} />
          <ColorTile fullTokenName="color-black-cosmicore-900" name="Cosmicore" number={900} />
          <ColorTile fullTokenName="color-blue-skycicle-500" name="Skycicle" number={500} />
          <ColorTile fullTokenName="color-gray-roboflow-500" name="Roboflow" number={500} />
          <ColorTile fullTokenName="color-gray-roboflow-200" name="Roboflow" number={200} />
          <ColorTile fullTokenName="color-white-mochimalist-0" name="Mochimalist" number={0} />
        </Flex>
      </MainSection>
      <MainSection
        name="Extended colors"
        description={`
        The extended color palette displays all the available shades and tints of each color in the palette. The colors are named and numbered for easy reference. The usage of these colors varies depending on the product needs, but they come in handy for illustrations, communicating status, and brand moments.

        We aim to meet [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/), and in order to ensure accessible contrast for color pairings, we require our \`darkGray\` [Text](/Text) color to be used for any colors 400 and below. For 500 and above, we recommend using \`white\`.
        `}
      >
        <MainSection.Subsection title="Colors">
          <Flex gap={12} wrap>
            {colors.map(({ id, name }) => (
              <ColorPalette showName={false} key={name} name={name} tokenId={id} />
            ))}
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection title="Neutrals">
          <Flex direction="column">
            {neutrals.map(({ id, name }) => (
              <ColorPalette showName={false} key={name} name={name} tokenId={id} />
            ))}
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Brand"
          description="These 450 colors are reserved for Brand usage. They are among the least accessible colors, so are reserved for larger brand moments, and not commonly used for functional color pairing. They should not be used within the product, except Pushpin 450, which is our hero primary color and part of our Baseline color palette."
        >
          <Flex direction="column">
            {colors.map(({ id, name, textColor }) => (
              <ColorTile
                key={name}
                fullTokenName={`color-${id}-${name.toLowerCase()}-450`}
                name={name}
                number={450}
                textColor={textColor}
              />
            ))}
          </Flex>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
