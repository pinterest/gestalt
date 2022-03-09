// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

export default function ColorUsagePage(): Node {
  return (
    <Page title="Elevation">
      <PageHeader
        name="Elevation"
        description="The elevation allows elements to be lifted from the background and can be defined by applying drop shadows or other visual cues, such as color and borders."
        showSourceLink={false}
      />
      <MainSection
        name="Elevation using shadows"
        description="Shadows reflect a spatial relationship by indicating separation from the background or allowing content to be scrolled under another element. Elevation using shadows includes two levels: floating and raised."
      >
        <MainSection.Subsection
          title="Floating"
          description="The default elevation level.
        Elevates messages temporarily appearing in front of other surfaces, such as modals and banners. "
        >
          <Flex gap={4} direction="column">
            <Box
              width={300}
              height={300}
              rounding={3}
              dangerouslySetInlineStyle={{
                __style: { boxShadow: 'var(--elevation-floating' },
              }}
            />
            <Text>$elevation-floating</Text>
            <Text>10% (#000000) opacity / Blur: 8</Text>
          </Flex>
          <MainSection.Subsection columns={2}>
            <MainSection.Card
              cardSize="md"
              type="do"
              title="When to use"
              description={`
              - Highlighting an item that floats above other content, such as temporary messages or cards
              - IconButton and other elements, serving as an affordance for scrolling behaviors
              `}
            />
            <MainSection.Card
              cardSize="md"
              type="don't"
              title="When not to use"
              description={`
              - Content that doesn't need elevation or have its own setup (e.g. Pins, boards)
              `}
            />
          </MainSection.Subsection>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Raised"
          description="Presents a drop shadow on the edge of a top or bottom component, allowing surfaces to move behind when scrolled. "
        >
          <Flex gap={4} wrap>
            <Flex gap={4} direction="column">
              <Text weight="bold">Raised-top</Text>
              <Box
                width={300}
                height={300}
                rounding={3}
                dangerouslySetInlineStyle={{
                  __style: { boxShadow: 'var(--elevation-raised-top' },
                }}
              />
              <Text>$elevation-raised-top</Text>
              <Text>12% (#000000) opacity / Y: -2 / Blur: 8</Text>
            </Flex>
            <Flex gap={4} direction="column">
              <Text weight="bold">Raised-bottom</Text>
              <Box
                width={300}
                height={300}
                rounding={3}
                dangerouslySetInlineStyle={{
                  __style: { boxShadow: 'var(--elevation-raised-bottom' },
                }}
              />
              <Text>$elevation-raised-bottom</Text>
              <Text> 12% (#000000) opacity / Y: 2 / Blur: 8</Text>
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
        description="Use as needed to accent containers when shadows are not an option."
      >
        <Flex gap={4} direction="column">
          <Box
            width={300}
            height={300}
            rounding={3}
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: 'var(--color-background-elevation-accent' },
            }}
          />
          <Text>$color-background-elevation-accent</Text>
          <Text>Roboflow 100 / Shadows: none</Text>
        </Flex>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
              - As an accent color to highlight containers when shadows don't work (e.g. cards)
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
              - Elevating temporary messages (e.g. modals, banners)
              - Raising elements fixed on the top or bottom of the screen. Use "Raised" elevation instead.
            `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Elevation using borders"
        description="Technically, borders are not considered elevation; however, they can be used as an alternative to display a single contained group when shadows or color don't work. The border treatment helps to determine visible boundaries."
      >
        <Flex gap={4} direction="column">
          <Box
            width={300}
            height={300}
            rounding={3}
            dangerouslySetInlineStyle={{
              __style: { border: '1px solid var(--color-border-container' },
            }}
          />
          <Text>$color-border-container</Text>
          <Text>Border-color: Roboflow 300 / 1px (inside) / Shadows: none</Text>
        </Flex>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
              - Displaying a single contained group when shadows or color don't work, setting visible boundaries.
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
              - Elevating temporary messages (e.g. modals, banners)
              - Raising elements fixed on the top or bottom of the screen. Use "Raised" elevation instead.
            `}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}
