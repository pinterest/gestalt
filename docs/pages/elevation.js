// @flow strict
import { type Node } from 'react';
import MainSection from '../components/MainSection.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

export default function ColorUsagePage(): Node {
  return (
    <Page title="Elevation">
      <PageHeader
        name="Elevation"
        description="The elevation allows elements to be lifted from the background and can be defined by applying drop shadows, or other visual cues, such as color, and borders."
        showSourceLink={false}
      />
      <MainSection
        name="Elevation using shadows"
        description="Reflects a spatial relationship, indicating separation from the background, or allowing content to be scrolled under a bar. The elevation using shadows includes two levels: Floating and Raised."
      >
        <MainSection.Subsection
          title="Floating"
          description="The default elevation level.
        Elevates messages temporarily appearing in front of other surfaces, such as modals and banners. "
        >
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
              - Content that doesn't need elevation or have its own setup(e.g. Pins, boards)
              `}
            />
          </MainSection.Subsection>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Raised"
          description="Presents a drop shadow on the edge of a top or bottom component, allowing surfaces to move behind when scrolled. "
        />
      </MainSection>
      <MainSection
        name="Elevation using color"
        description="Use as needed to accent containers when shadows are not an option."
      />
      <MainSection
        name="Elevation using borders"
        description="Technically, borders are not considered elevation; however, they can be used as an alternative to display a single contained group when shadows or color don't work. The border treatment helps to determine visible boundaries."
      />
    </Page>
  );
}
