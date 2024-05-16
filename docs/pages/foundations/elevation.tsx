import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

type ColorCardProps = {
  description: string;
  colorScheme: 'light' | 'dark';
  id: string;
  borderStyle?: ComponentProps<typeof Box>['borderStyle'];
  color?: 'default' | 'elevationAccent' | 'elevationFloating' | 'elevationRaised';
  dangerouslySetInlineStyle?: {
    __style: {
      [key: string]: string | number | undefined;
    };
  };
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
      direction="column"
      gap={{
        row: 0,
        column: 4,
      }}
    >
      <ColorSchemeProvider colorScheme={colorScheme} id={id}>
        <Box color="default" padding={6}>
          <Box
            alignItems="center"
            borderStyle={borderStyle}
            color={color}
            dangerouslySetInlineStyle={dangerouslySetInlineStyle}
            display="flex"
            height={300}
            justifyContent="center"
            rounding={3}
            width={300}
          >
            <Text>{colorScheme === 'light' ? 'Light mode' : 'Dark mode'}</Text>
          </Box>
        </Box>
      </ColorSchemeProvider>
      <Text>{description}</Text>
    </Flex>
  );
}

export default function ColorUsagePage() {
  return (
    <Page title="Elevation">
      <PageHeader
        description="Elevation allows elements to be lifted from the background. It can be defined by applying drop shadows or other visual cues, such as color and borders."
        name="Elevation"
        type="guidelines"
      />
      <MainSection
        description="Reflects a spatial relationship by indicating separation from the background or allowing content to be scrolled under another element. Elevation using shadows includes two levels: floating and raised."
        name="Elevation using shadows"
      >
        <MainSection.Subsection
          description={`Default elevation level that elevates messages temporarily appearing in front of other surfaces, such as modals and banners. Available through the \`borderStyle\` prop in [Box](/web/box#Borders). For dark mode, we use the \`elevationFloating\` background of Box instead of a shadow.`}
          title="Floating"
        >
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 4,
            }}
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
                borderStyle="shadow"
                color="default"
                colorScheme="light"
                description="10% (#000000) opacity / Blur: 8"
                id="elevation-floating-light"
              />
              <ColorCard
                color="elevationFloating"
                colorScheme="dark"
                description="Roboflow 700 / Shadows: none"
                id="elevation-floating-dark"
              />
            </Flex>
          </Flex>
          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              description={`
              - Highlighting an item that floats above other content, such as temporary messages or cards
              - With IconButton and other elements, serving as an affordance for floating actions
              `}
              title="When to use"
              type="do"
            />
            <MainSection.Card
              cardSize="md"
              description={`
              - Elevating content that doesn't need elevation or content that has its own setup already (e.g. Pins, boards)
              `}
              title="When not to use"
              type="don't"
            />
          </MainSection.Subsection>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
          Presents a drop shadow on the edge of a top or bottom component, allowing surfaces to move behind when scrolled. Available through the \`borderStyle\` prop in [Box](/web/box#Borders). In dark mode, the raised border should be paired with the \`elevationRaised\` background color.
          `}
          title="Raised"
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
              <Text inline italic>
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
                borderStyle="raisedTopShadow"
                colorScheme="light"
                description="12% (#000000) opacity / Y: 2 / Blur: 8"
                id="elevation-raised-top-light"
              />

              <ColorCard
                borderStyle="raisedTopShadow"
                color="elevationRaised"
                colorScheme="dark"
                description="Top: Roboflow 600 / Y: 0.5 / Blur: 0"
                id="elevation-raised-top-dark"
              />
            </Flex>
            <Text weight="bold">
              Raised-bottom{' '}
              <Text inline italic>
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
                borderStyle="raisedBottomShadow"
                colorScheme="light"
                description="12% (#000000) opacity / Y: -2 / Blur: 8"
                id="elevation-raised-bottom-light"
              />
              <ColorCard
                borderStyle="raisedBottomShadow"
                color="elevationRaised"
                colorScheme="dark"
                description="Top: Roboflow 600 / Y: -0.5 / Blur: 0"
                id="elevation-raised-bottom-dark"
              />
            </Flex>
          </Flex>

          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              description={`
              - Indicating a sticky UI element where content can scroll underneath (e.g., header, footer, navigation bar)
              `}
              title="When to use"
              type="do"
            />
            <MainSection.Card
              cardSize="md"
              description={`
              - Elevating temporary messages (e.g. modals, banners)
              `}
              title="When not to use"
              type="don't"
            />
          </MainSection.Subsection>
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        description={`Use as needed to accent containers when shadows are not an option. Available with \`color="elevationAccent"\` in [Box](/web/box#Colors).`}
        name="Elevation using color"
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
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
              color="elevationAccent"
              colorScheme="light"
              description="Roboflow 100 / Shadows: none"
              id="elevation-color-light"
            />
            <ColorCard
              color="elevationAccent"
              colorScheme="dark"
              description="Roboflow 800 / Shadows: none"
              id="elevation-color-dark"
            />
          </Flex>
        </Flex>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
              - As needed to highlight larger containers when shadows don't work (e.g. cards)
            `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
              - Elevating temporary messages (e.g. modals, banners)
              - Raising elements fixed on the top or bottom of the screen. Use "Raised" elevation instead
            `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        description={`Technically, borders are not considered elevation; however, they can be used as an alternative to display a single contained group when shadows or color don't work. The border treatment helps to determine visible boundaries. Available through the \`borderStyle\` prop in [Box](/web/box#Borders).`}
        name="Elevation using borders"
      >
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
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
              borderStyle="lg"
              colorScheme="light"
              description="Border-color: Roboflow 300"
              id="elevation-border-light"
            />
            <ColorCard
              borderStyle="lg"
              colorScheme="dark"
              description="Border-color: Roboflow 600"
              id="elevation-border-dark"
            />
          </Flex>
        </Flex>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
              - Delineating a larger container to set visible boundaries when shadows or color don't work. (e.g. card)
            `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
              - Elevating temporary messages (e.g. modals, banners)
              - Raising elements fixed on the top or bottom of the screen. Use "Raised" elevation instead
            `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
