// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import foundationsTiles from '../../docs-components/data/foundations.js';
import IllustrationCard from '../../docs-components/IllustrationCard.js';
import IllustrationContainer from '../../docs-components/IllustrationContainer.js';
import IllustrationSection from '../../docs-components/IllustrationSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';

export default function FoundationsOverview(): Node {
  return (
    <Page title="Foundations overview" hideSideNav hideEditLink>
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            name="Foundations overview"
            description="Here you will find the foundational elements for designing UI components, surfaces and patterns. These include graphic elements like iconography, color and typography to structural. They also cover elevation, layout and accessibility."
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationSection title="" grid="auto-fill" min={312}>
          {foundationsTiles.map(({ description, path, svg, title }) => (
            <IllustrationCard
              color="teal-spabattical-50"
              description={description}
              headingLevel={2}
              href={path}
              image={svg}
              key={title}
              title={title}
            />
          ))}
        </IllustrationSection>
      </Flex>
    </Page>
  );
}
