// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';

type ColorCardProps = {
  description: string,
  colorScheme: 'light' | 'dark',
  id: string,
  borderStyle?: $ElementType<React$ElementConfig<typeof Box>, 'borderStyle'>,
  color?: 'default' | 'elevationAccent' | 'elevationFloating' | 'elevationRaised',
  dangerouslySetInlineStyle?: {
    __style: { [key: string]: string | number | void },
  },
};
function ColorCard({
  description,
  colorScheme,
  id,
  borderStyle,
  color,
  dangerouslySetInlineStyle,
}: ColorCardProps) {
  return (
    <Flex
      gap={{
        row: 0,
        column: 4,
      }}
      direction="column"
    >
      <ColorSchemeProvider colorScheme={colorScheme} id={id}>
        <Box padding={6} color="default">
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            width={300}
            height={300}
            rounding={3}
            color={color}
            borderStyle={borderStyle}
            dangerouslySetInlineStyle={dangerouslySetInlineStyle}
          >
            <Text>{colorScheme === 'light' ? 'Light mode' : 'Dark mode'}</Text>
          </Box>
        </Box>
      </ColorSchemeProvider>
      <Text>{description}</Text>
    </Flex>
  );
}

export default function ColorUsagePage(): Node {
  return (
    <Page title="Elevation">
      <PageHeader
        name="Elevation"
        description="Elevation allows elements to be lifted from the background. It can be defined by applying drop shadows or other visual cues, such as color and borders."
        type="guidelines"
      />
      <MainSection
        name="Elevation using shadows"
        description="Reflects a spatial relationship by indicating separation from the background or allowing content to be scrolled under another element. Elevation using shadows includes two levels: floating and raised."
      >
        <MainSection.Subsection
          title="Floating"
          description={`Default elevation level that elevates messages temporarily appearing in front of other surfaces, such as modals and banners. Available through the \`borderStyle\` prop in [Box](/web/box#Borders). For dark mode, we use the \`elevationFloating\` background of Box instead of a shadow.`}
        >
          <Flex
            gap={{
              row: 0,
              column: 4,
            }}
            direction="column"
          >
            <Text italic>$elevation-floating</Text>
            <Flex
              gap={{
                row: 4,
                column: 8,
              }}
              wrap
            >
              <ColorCard
                colorScheme="light"
                id="elevation-floating-light"
                description="10% (#000000) opacity / Blur: 8"
                borderStyle="shadow"
                color="default"
              />
              <ColorCard
                colorScheme="dark"
                id="elevation-floating-dark"
                description="Roboflow 700 / Shadows: none"
                color="elevationFloating"
              />
            </Flex>
          </Flex>
          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              type="do"
              title="When to use"
              description={`
              - Highlighting an item that floats above other content, such as temporary messages or cards
              - With IconButton and other elements, serving as an affordance for floating actions
              `}
            />
            <MainSection.Card
              cardSize="md"
              type="don't"
              title="When not to use"
              description={`
              - Elevating content that doesn't need elevation or content that has its own setup already (e.g. Pins, boards)
              `}
            />
          </MainSection.Subsection>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Raised"
          description={`
          Presents a drop shadow on the edge of a top or bottom component, allowing surfaces to move behind when scrolled. Available through the \`borderStyle\` prop in [Box](/web/box#Borders). In dark mode, the raised border should be paired with the \`elevationRaised\` background color.
          `}
        >
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 8,
            }}
          >
            <Text weight="bold">
              Raised-top{' '}
              <Text italic inline>
                $elevation-raised-top
              </Text>
            </Text>
            <Flex
              gap={{
                row: 4,
                column: 8,
              }}
              wrap
            >
              <ColorCard
                colorScheme="light"
                id="elevation-raised-top-light"
                borderStyle="raisedTopShadow"
                description="12% (#000000) opacity / Y: 2 / Blur: 8"
              />

              <ColorCard
                colorScheme="dark"
                id="elevation-raised-top-dark"
                color="elevationRaised"
                borderStyle="raisedTopShadow"
                description="Top: Roboflow 600 / Y: 0.5 / Blur: 0"
              />
            </Flex>
            <Text weight="bold">
              Raised-bottom{' '}
              <Text italic inline>
                $elevation-raised-bottom
              </Text>
            </Text>
            <Flex
              gap={{
                row: 4,
                column: 8,
              }}
              wrap
            >
              <ColorCard
                colorScheme="light"
                id="elevation-raised-bottom-light"
                borderStyle="raisedBottomShadow"
                description="12% (#000000) opacity / Y: -2 / Blur: 8"
              />
              <ColorCard
                colorScheme="dark"
                id="elevation-raised-bottom-dark"
                color="elevationRaised"
                borderStyle="raisedBottomShadow"
                description="Top: Roboflow 600 / Y: -0.5 / Blur: 0"
              />
            </Flex>
          </Flex>

          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              type="do"
              title="When to use"
              description={`
              - Indicating a sticky UI element where content can scroll underneath (e.g., header, footer, navigation bar)
              `}
            />
            <MainSection.Card
              cardSize="md"
              type="don't"
              title="When not to use"
              description={`
              - Elevating temporary messages (e.g. modals, banners)
              `}
            />
          </MainSection.Subsection>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Elevation using color"
        description={`Use as needed to accent containers when shadows are not an option. Available with \`color="elevationAccent"\` in [Box](/web/box#Colors).`}
      >
        <Flex
          gap={{
            row: 0,
            column: 4,
          }}
          direction="column"
        >
          <Text weight="bold">
            <Text italic>$color-background-elevation-accent</Text>
          </Text>
          <Flex
            gap={{
              row: 4,
              column: 8,
            }}
            wrap
          >
            <ColorCard
              colorScheme="light"
              id="elevation-color-light"
              color="elevationAccent"
              description="Roboflow 100 / Shadows: none"
            />
            <ColorCard
              colorScheme="dark"
              id="elevation-color-dark"
              color="elevationAccent"
              description="Roboflow 800 / Shadows: none"
            />
          </Flex>
        </Flex>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
              - As needed to highlight larger containers when shadows don't work (e.g. cards)
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
              - Elevating temporary messages (e.g. modals, banners)
              - Raising elements fixed on the top or bottom of the screen. Use "Raised" elevation instead
            `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Elevation using borders"
        description={`Technically, borders are not considered elevation; however, they can be used as an alternative to display a single contained group when shadows or color don't work. The border treatment helps to determine visible boundaries. Available through the \`borderStyle\` prop in [Box](/web/box#Borders).`}
      >
        <Flex
          gap={{
            row: 0,
            column: 4,
          }}
          direction="column"
        >
          <Text weight="bold">
            <Text italic>$color-border-container</Text>
          </Text>
          <Flex
            gap={{
              row: 4,
              column: 8,
            }}
            wrap
          >
            <ColorCard
              colorScheme="light"
              id="elevation-border-light"
              borderStyle="lg"
              description="Border-color: Roboflow 300"
            />
            <ColorCard
              colorScheme="dark"
              id="elevation-border-dark"
              borderStyle="lg"
              description="Border-color: Roboflow 600"
            />
          </Flex>
        </Flex>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
              - Delineating a larger container to set visible boundaries when shadows or color don't work. (e.g. card)
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
              - Elevating temporary messages (e.g. modals, banners)
              - Raising elements fixed on the top or bottom of the screen. Use "Raised" elevation instead
            `}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
