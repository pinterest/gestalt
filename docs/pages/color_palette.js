// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import ColorPalette from '../components/ColorPalette.js';
import ColorTile from '../components/ColorTile.js';
import Page from '../components/Page.js';

const colors = [
  { name: 'Pushpin', id: 'red', textColor: 'light' },
  { name: 'Flaminglow', id: 'pink', textColor: 'dark' },
  { name: 'Skycicle', id: 'blue', textColor: 'dark' },
  { name: 'Spabattical', id: 'teal', textColor: 'dark' },
  { name: 'Matchacado', id: 'green', textColor: 'dark' },
  { name: 'Mysticool', id: 'purple', textColor: 'light' },
  { name: 'Firetini', id: 'orange', textColor: 'dark' },
  { name: 'Caramellow', id: 'yellow', textColor: 'dark' },
];

const neutrals = [
  { name: 'Mochimalist', id: 'white', textColor: 'dark' },
  { name: 'Roboflow', id: 'gray', textColor: 'dark' },
  { name: 'Cosmicore', id: 'black', textColor: 'light' },
];

export default function ColorPage(): Node {
  return (
    <Page title="Color palette">
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
        The baseline palette is comprised of our hero and neutrals colors, allowing the Pinterest content to shine, while ensuring enough color contrast. In addition, the colors used serve specific purposes in order to provide a better user experience. Check out [Color Usage](/color_usage) for more details about their intended usage.
        `}
      >
        <Flex direction="column">
          <ColorTile fullTokenName="color-red-pushpin-450" description="Pushpin 450" number={450} />
          <ColorTile
            fullTokenName="color-black-cosmicore-900"
            description="Cosmicore 900"
            number={900}
          />
          <ColorTile
            fullTokenName="color-blue-skycicle-500"
            description="Skycicle 500"
            number={500}
          />
          <ColorTile
            fullTokenName="color-gray-roboflow-500"
            description="Roboflow 500"
            number={500}
          />
          <ColorTile
            fullTokenName="color-gray-roboflow-200"
            description="Roboflow 200"
            number={200}
          />
          <ColorTile
            fullTokenName="color-white-mochimalist-0"
            description="Mochimalist 0"
            number={0}
          />
        </Flex>
      </MainSection>
      <MainSection
        name="Extended palette"
        description={`
        The extended color palette displays all the available shades and tints of each color in the palette. The colors are named and numbered for easy reference. The usage of these colors varies depending on the product needs, but they come in handy for illustrations, communicating status, and brand moments.

        We aim to meet [WCAG 2.1 AA accessibility standards](https://www.w3.org/TR/WCAG21/), and in order to ensure accessible contrast for color pairings, we require our \`darkGray\` [Text](/Text) color to be used for any colors 400 and below. For 500 and above, we recommend using \`white\`.
        `}
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
          title="Reserved"
          description="These 450 colors are reserved for Brand usage. They are among the least accessible colors, so are reserved for larger brand moments, and not commonly used for functional color pairing. They should not be used within the product, except Pushpin 450, which is our hero primary color and part of our Baseline color palette."
        >
          <Flex direction="column">
            {colors.map(({ id, name, textColor }) => (
              <ColorTile
                key={name}
                fullTokenName={`color-${id}-${name.toLowerCase()}-450`}
                description={`${name} 450`}
                textColor={textColor}
              />
            ))}
          </Flex>
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
