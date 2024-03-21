// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex } from 'gestalt';
import foundationsTiles from '../../docs-components/data/foundations';
import IllustrationCard from '../../docs-components/IllustrationCard';
import IllustrationContainer from '../../docs-components/IllustrationContainer';
import IllustrationSection from '../../docs-components/IllustrationSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';

export default function FoundationsOverview(): ReactNode {
  return (
    <Page hideEditLink hideSideNav title="Foundations overview">
      <Flex direction="column" width="100%">
        <IllustrationContainer justifyContent="start">
          <PageHeader
            description="Use this as a guide for styling and structuring inclusive interfaces while leveraging common interaction patterns for all Pinterest products."
            name="Foundations overview"
            type="guidelines"
          />
        </IllustrationContainer>
        <IllustrationSection grid="auto-fill" min={312} title="">
          {foundationsTiles.map(({ description, path, svg, title }) => (
            <IllustrationCard
              key={title}
              color="teal-spabattical-50"
              description={description}
              headingLevel={2}
              href={path}
              image={svg}
              title={title}
            />
          ))}
        </IllustrationSection>
      </Flex>
    </Page>
  );
}
